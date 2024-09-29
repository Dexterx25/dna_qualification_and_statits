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
        IMAGE_TAG = "${BRANCH_NAME_DEV}-${env.BUILD_ID}"
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
                image: docker:latest
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
        stage('Push Docker Image to ECR') {
            steps {
                script {
                    docker.withRegistry("https://${ECR_REPO}", 'id-credential-docker-aws') {
                        def app = docker.build("${ECR_REPO}:${IMAGE_TAG}")
                        app.push("${IMAGE_TAG}")
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
    }
}
