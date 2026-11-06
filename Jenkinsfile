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

        stage('61 - Frontend Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('61 - Install API Dependencies') {
            steps {
                dir('api') {
                    sh 'npm ci'
                }
            }
        }

        stage('61 - API Tests') {
            steps {
                dir('api') {
                    sh 'npm test'
                }
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
            echo 'SUCCESS: Frontend tests, API tests and Next.js build completed.'
        }
        failure {
            echo 'FAILURE: Check the Jenkins console output.'
        }
    }
}
