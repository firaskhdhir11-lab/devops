
pipeline {
    agent any

    environment {
        NEXT_TELEMETRY_DISABLED = '1'
    }

    stages {
        stage('22 - Checkout GitHub') {
            steps {
                checkout scm
                echo 'GitHub repository checked out successfully.'
            }
        }

        stage('23 - Install Dependencies') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
            }
        }

        stage('24 - Build Next.js') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Next.js application built successfully.'
        }
        failure {
            echo 'FAILURE: Check the Jenkins console output.'
        }
    }
}

