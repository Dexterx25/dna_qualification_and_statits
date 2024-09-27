pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                // git credentialsId: 'githubDex', url: 'https://github.com/Dexterx25/dna_qualification_and_statits.git'
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
    }
}
