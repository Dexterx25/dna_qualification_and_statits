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
        ECR_REPO = '345594604328.dkr.ecr.us-east-2.amazonaws.com/cdk-hnb659fds-container-assets-345594604328-us-east-2'
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
              - name: containerd
                image: containerd/containerd
                command:
                - cat
                tty: true
                volumeMounts:
                - name: containerd-socket
                  mountPath: /run/containerd/containerd.sock
              volumes:
              - name: containerd-socket
                hostPath:
                  path: /run/containerd/containerd.sock
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

        stage('Build and Push Docker Image to ECR') {
            steps {
                container('containerd') {
                    script {
                        // Login to AWS ECR
                        sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}"

                        // Build the Docker image using docker
                        sh """
                        docker build -t ${ECR_REPO}/${IMAGE_NAME}:latest .
                        docker push ${ECR_REPO}/${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }
        
        stage('Push to Dev Branch') {
            steps {
                script {
                    // Ensure we are on the right branch
                    sh 'git checkout ${BRANCH_NAME_DEV}'

                    // Commit changes (if necessary) and push to dev branch
                    try {
                        sh 'git add .'
                        sh 'git commit -m "Auto: Build passed all checks, pushing to dev branch"'
                        sh 'git push origin ${BRANCH_NAME_DEV}'
                    } catch (Exception e) {
                        echo "No changes to commit."
                    }
                }
            }
        }

        stage('Deploy to Dev Environment') {
            steps {
                container('kubectl') { // Assuming you have kubectl installed in a container
                    script {
                        // Apply the Kubernetes deployment
                        sh """
                        kubectl set image deployment/your-app-deployment \
                        your-app-container=${ECR_REPO}/${IMAGE_NAME}:latest \
                        --namespace dev_dna
                        """

                        // Optionally verify deployment status
                        sh "kubectl rollout status deployment/your-app-deployment --namespace dev_dna"
                    }
                }
            }
        }

    }
}
