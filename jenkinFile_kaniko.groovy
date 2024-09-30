pipeline {
    environment {
        COVERAGE_THRESHOLD = 90
        SONARQUBE_SERVER = 'sonar-server'
        SCANNER_HOME = tool 'sonar-scanner-qube'
        SONAR_URL = 'http://a959089c3765e4bb2a919f19710f2764-688819079.us-east-2.elb.amazonaws.com:9000'
        SONAR_PROJECT = 'dna'
        AWS_REGION = 'us-east-2'
        IMAGE_NAME = 'dna'
        BRANCH_NAME_DEV = 'dev'
        BRANCH_NAME_QA = 'qa'
        BRANCH_NAME_PROD = 'main'
        ECR_REPO_URI = '345594604328.dkr.ecr.us-east-2.amazonaws.com/cdk-hnb659fds-container-assets-345594604328-us-east-2'
        IMAGE_TAG = "${BRANCH_NAME_DEV}-${env.BUILD_ID}" // o usa otro tag que prefieras
    }
agent {
     kubernetes {
         label 'nodejs'
         defaultContainer 'node'
         yaml """
         apiVersion: v1
         kind: Pod
         spec:
           containers:
           - name: node
             image: node:20-alpine
             command:
             - cat
             tty: true
           - name: sonar-scanner
             image: sonarsource/sonar-scanner-cli
             command:
             - cat
             tty: true
           - name: kaniko
             image: gcr.io/kaniko-project/executor:latest
             command:
             - cat
             tty: true
         """
     }
 }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        sh 'npm install'
                    } else {
                        echo 'No package.json found, skipping build.'
                    }
                }
            }
        }
        stage('Unit Tests') {
            steps {
                script {
                    sh 'npm run test:cov'

                    def coverageData = readJSON file: 'coverage/coverage-summary.json'
                    def coverage = coverageData.total.lines.pct
                    def covBase = COVERAGE_THRESHOLD as Double
                    echo "Cobertura de código: ${coverage}%"
                    if (coverage < covBase) {
                        error("Cobertura de pruebas unitarias es menor a ${COVERAGE_THRESHOLD}%")
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = "${SCANNER_HOME}"
                    container('sonar-scanner') {
                        withSonarQubeEnv(SONARQUBE_SERVER) {
                            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT} -Dsonar.sources=src -Dsonar.host.url=${SONAR_URL}"
                        }
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    timeout(time: 30, unit: 'MINUTES') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "SonarQube analysis failed: ${qg.status}"
                        }
                    }
                }
            }
        }

        stage('login aws ECR') {
            steps {
                container('kaniko') {
                    withCredentials([usernamePassword(credentialsId: 'id-credential-docker-aws', 
                                                      usernameVariable: 'AWS_ACCESS_KEY_ID', 
                                                      passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                        sh 'apk add --no-cache aws-cli'
                        sh """
                            aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}
                            aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}
                            aws configure set region ${AWS_REGION}
                        """
                        sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO_URI}"
                    }
                }
            }
        }

        stage('Build and Push Kaniko Image to ECR') {
            steps {
                container('kaniko') {
                    sh """
                     /kaniko/executor --context `pwd` --dockerfile Dockerfile --verbosity debug --destination ${ECR_REPO_URI}:${IMAGE_TAG}
                    """
                }
            }
        }
        stage('Deploy to dev') {
            steps {
                sh """
                    aws eks --region <REGION> update-kubeconfig --name <EKS_CLUSTER_NAME>
                    kubectl set image deployment/myapp-deployment myapp=${ECR_REPO_URI}:${env.BUILD_ID} --namespace=dev --record
                """
            }
        }
        stage('Push to Dev Branch') {
            steps {
                script {
                    sh 'git checkout dev'

                    sh 'git add .'
                    sh 'git commit -m "Auto: Build passed all checks, pushing to dev branch"'
                    sh 'git push origin dev'
                }
            }
        }
        stage('Manual Approval for QA') {
            steps {
                // Aprobación manual para pasar a QA
                input message: '¿Aprobar despliegue a QA?', ok: 'Aprobar'
            }
        }
        stage('Deploy to QA') {
            steps {
                // Desplegar a QA
                sh """
                    aws eks --region <REGION> update-kubeconfig --name <EKS_CLUSTER_NAME>
                    kubectl set image deployment/myapp-deployment myapp=${ECR_REPO_URI}:${env.BUILD_ID} --namespace=qa --record
                """
            }
        }
        stage('Push to QA Branch') {
            steps {
                script {
                    sh 'git checkout qa'

                    sh 'git add .'
                    sh 'git commit -m "Auto: Build passed all checks, pushing to qa branch"'
                    sh 'git push origin qa'
                }
            }
        }
        stage('Manual Approval for Prod') {
            steps {
                // Aprobación manual para pasar a Prod
                input message: '¿Aprobar despliegue a Prod?', ok: 'Aprobar'
            }
        }
        stage('Deploy to Prod') {
            steps {
                // Desplegar a Prod
                sh """
                    aws eks --region <REGION> update-kubeconfig --name <EKS_CLUSTER_NAME>
                    kubectl set image deployment/myapp-deployment myapp=${ECR_REPO_URI}:${env.BUILD_ID} --namespace=prod --record
                """
            }
        }
        stage('Push to PROD Branch') {
            steps {
                script {
                    sh 'git checkout main'

                    sh 'git add .'
                    sh 'git commit -m "Auto: Build passed all checks, pushing to main branch"'
                    sh 'git push origin main'
                }
            }
        }
    }
}
