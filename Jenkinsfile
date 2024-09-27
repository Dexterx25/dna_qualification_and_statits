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
                // Ejecutar pruebas unitarias y capturar la salida
                    def coverageOutput = sh(script: 'npm run test:cov:jenkins', returnStdout: true).trim()
                    echo "Salida de la cobertura: ${coverageOutput}"

                    // Extraer el porcentaje de cobertura usando una expresión regular
                    def matcher = coverageOutput =~ /(\d+)%/
                    if (matcher) {
                        // Obtener el primer grupo de captura (el porcentaje)
                        def coverage = matcher[0][1].toInteger()
                        echo "Cobertura de código: ${coverage}%"
                        
                        // Verificar la cobertura
                        if (coverage < COVERAGE_THRESHOLD) {
                            error("Cobertura de pruebas unitarias es menor a ${COVERAGE_THRESHOLD}%")
                        }
                    } else {
                        error("No se pudo encontrar el porcentaje de cobertura en la salida: ${coverageOutput}")
                    }
            }
        }
    }
}
