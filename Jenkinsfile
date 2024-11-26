pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'banco-interno-image'
        DOCKER_TAG = 'latest'
        SONAR_TOKEN = credentials('sonarqube-token')
        GITHUB_TOKEN = credentials('github-token')
    }

    stages {
        stage('Checkout do Código') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'main']], 
                    userRemoteConfigs: [[url: 'https://github.com/Maideh/Banco-Interno', 
                    credentialsId: 'github-token']]])
            }
        }

        stage('Análise de Segurança com SonarQube') {
            steps {
                snykSecurity(
                    snykInstallation: 'snyk_access', 
                    snykTokenId: 'snyk-api-token-id',  
                    additionalArguments: '--all-projects --detection-depth=2'  
                )
            }
        }

        stage('Build Docker') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
                }
            }
        }

        stage('Push para Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} bamai/${DOCKER_IMAGE}:${DOCKER_TAG}"
                        sh 'docker push bamai/${DOCKER_IMAGE}:${DOCKER_TAG}'
                    }
                }
            }
        }

        stage('Deploy no Kubernetes') {
            steps {
                script {
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
            cleanWs()
        }
    }
}