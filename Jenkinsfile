pipeline {
    environment {
        COVERAGE_THRESHOLD = 95
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
                    // Ejecutar pruebas unitarias y generar el reporte de cobertura
                    sh 'npm run test:cov'

                    // Leer el archivo coverage-summary.json para obtener el porcentaje de cobertura
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
    }
}
