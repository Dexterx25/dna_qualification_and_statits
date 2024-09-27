pipeline {
    environment {
        COVERAGE_THRESHOLD = 90
        SONARQUBE_SERVER = 'sonarServer'
        SCANNER_HOME = tool 'sonarScanner'
        SONAR_URL = 'http://a02453268702b401a9c518863c6dc480-1587072234.us-east-2.elb.amazonaws.com:9000'
        SONAR_PROJECT = 'dna'
        AWS_REGION = 'us-east-2'
        IMAGE_NAME = 'dna'
        BRANCH_NAME_DEV = 'dev'
        BRANCH_NAME_QA = 'qa'
        BRANCH_NAME_PROD = 'main'
        ECR_REPO = '160885288068.dkr.ecr.us-east-2.amazonaws.com/repotest'
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
              - name: docker
                image: docker:20.10
                command:
                - cat
                tty: true
                securityContext:
                  privileged: true
                volumeMounts:
                - name: docker-socket
                  mountPath: /var/run/docker.sock
              volumes:
              - name: docker-socket
                hostPath:
                  path: /var/run/docker.sock
            """
        }
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                container('docker') {
                    sh 'docker build -t my-app .'
                }
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

        stage('Docker Build and Push to ECR') {
            steps {
                container('docker') {
                    script {
                        // Login to AWS ECR
                        sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}"

                        // Build Docker image
                        sh "docker build -t ${IMAGE_NAME}:latest ."

                        // Tag Docker image for ECR
                        sh "docker tag ${IMAGE_NAME}:latest ${ECR_REPO}/${IMAGE_NAME}:latest"

                        // Push Docker image to ECR
                        sh "docker push ${ECR_REPO}/${IMAGE_NAME}:latest"
                    }
                }
            }
        }
        stage('Push to Dev Branch') {
            steps {
                script {
                    // Ensure we are on the right branch
                    sh 'git checkout dev'

                    // Commit changes (if necessary) and push to dev branch
                    sh 'git add .'
                    sh 'git commit -m "Auto: Build passed all checks, pushing to dev branch"'
                    sh 'git push origin dev'
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
