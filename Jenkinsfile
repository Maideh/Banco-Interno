pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'banco-interno-image'
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Checkout do Código') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'main']], userRemoteConfigs: [[url: 'https://github.com/Maideh/Banco-Interno', credentialsId: 'github-token']]])
            }
        }

        stage('Análise de Segurança') {
            steps {
                script {
                    // Ferramentas de segurança como SAST:SonarQube(local) e SCA:SNYK(interface web)
                    sh 'docker run --rm -v
                     $(pwd):/app sast-tool /app'
                    sh 'docker run --rm -v $(pwd):/app sca-tool /app'
                }
            }
        }

        stage('Build Docker') {
            steps {
                script {
                    // Construir a imagem Docker
                    sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
                }
            }
        }

        stage('Push para Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh 'docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}'
                        sh 'docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}'
                    }
                }
            }
        }

        stage('Deploy no Kubernetes') {
            steps {
                script {
                    // Deploy para Kubernetes usando os arquivos YAML
                    sh 'kubectl apply -f k8s/deploy.yaml'
                    sh 'kubectl apply -f k8s/deploy-svc.yaml'
                    sh 'kubectl apply -f k8s/stateful.yaml'
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
            cleanWs()  // Limpeza do workspace após a execução
        }
    }
}
