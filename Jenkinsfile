pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'myapp-image'
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Checkout do Código') {
            steps {
                checkout scm  // Puxa o código do repositório
            }
        }

        stage('SAST e SCA') {
            steps {
                script {
                    // SonarQube e Snyk
                    sh 'sonar-scanner'
                    sh 'snyk test'
                }
            }
        }

        stage('Build Docker') {
            steps {
                script {
                    // Construir a imagem Docker usando o Dockerfile no repositório
                    sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
                }
            }
        }

        stage('Testes') {
            steps {
                script {
                    // Executar testes dentro do container
                    sh 'docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} npm test'
                }
            }
        }

        stage('Push para Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh 'docker push ${DOCKER_IMAGE}:${DOCKER_TAG}'
                    }
                }
            }
        }

        stage('Deploy no Kubernetes') {
            steps {
                script {
                    // Deploy no Kubernetes
                    sh "kubectl set image deployment/myapp-deployment myapp=${DOCKER_IMAGE}:${DOCKER_TAG} --namespace=default"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline concluída com sucesso!'
        }
        failure {
            echo 'Pipeline falhou.'
        }
        always {
            cleanWs()
        }
    }
}
