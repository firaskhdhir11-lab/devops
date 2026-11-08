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

        stage('64 - Gitleaks Secret Scan') {
            steps {
                sh 'gitleaks detect --source . --redact --verbose'
            }
        }

        stage('67 - OWASP Dependency-Check') {
            steps {
                withCredentials([string(credentialsId: 'NVD_API_KEY', variable: 'NVD_API_KEY')]) {
                    sh '''
                        mkdir -p "$WORKSPACE/dependency-check-report"
                        docker run --rm \
                          --user "$(id -u):$(id -g)" \
                          -v "$WORKSPACE:/src" \
                          -v "$JENKINS_HOME/.dependency-check-data:/usr/share/dependency-check/data" \
                          -v "$WORKSPACE/dependency-check-report:/report" \
                          owasp/dependency-check:latest \
                          --scan /src/package.json \
                          --scan /src/package-lock.json \
                          --scan /src/api/package.json \
                          --scan /src/api/package-lock.json \
                          --format HTML \
                          --out /report \
                          --nvdApiKey "$NVD_API_KEY"
                    '''
                    archiveArtifacts artifacts: 'dependency-check-report/dependency-check-report.html', fingerprint: true
                }
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

        stage('62 - Build Docker Images') {
            steps {
                sh 'docker build -t devsecops-portfolio:latest .'
                sh 'docker build -t devsecops-api:latest ./api'
            }
        }

        stage('63 - Tag Docker Images with Git SHA') {
            steps {
                script {
                    env.GIT_SHA = sh(
                        script: 'git rev-parse --short=7 HEAD',
                        returnStdout: true
                    ).trim()
                }

                sh 'docker tag devsecops-portfolio:latest devsecops-portfolio:${GIT_SHA}'
                sh 'docker tag devsecops-api:latest devsecops-api:${GIT_SHA}'

                echo "Docker images tagged with Git SHA: ${GIT_SHA}"
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Tests, Next.js build and Docker image tagging completed.'
        }
        failure {
            echo 'FAILURE: Check the Jenkins console output.'
        }
    }
}
