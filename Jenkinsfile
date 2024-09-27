pipeline {
       environment {
        COVERAGE_THRESHOLD = 80
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
            """
        }
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                // git credentialsId: 'githubDex', url: 'https://github.com/Dexterx25/dna_qualification_and_statits.git'
                ////
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
                // Ejecutar pruebas unitarias
                sh 'npm run test:cov'
                // Verificar cobertura de código
                script {
                    def coverage = sh(script: 'npm run test:cov', returnStdout: true).trim()
                    if (coverage < COVERAGE_THRESHOLD) {
                        error("Cobertura de pruebas unitarias es menor a ${COVERAGE_THRESHOLD}%")
                    }
                }
            }
        }
    }
}
