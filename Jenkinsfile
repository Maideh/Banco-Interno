pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'banco-interno-image'
        DOCKER_TAG = 'latest'
        SONAR_TOKEN = credentials('sonarqube-token')
        GITHUB_TOKEN = credentials('github-token')
        KUBE_TOKEN = credentials('kubernetes-token')
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
                    withCredentials([string(credentialsId: 'kubernetes-token', variable: 'KUBE_TOKEN')]) {
                        sh """
                        kubectl config set-credentials admin --token=${KUBE_TOKEN}
                        kubectl config set-context microk8s --cluster=microk8s-cluster --user=admin
                        kubectl config use-context microk8s
                        """
                        sh 'kubectl apply -f deploy.yaml --validate=false'
                        sh 'kubectl apply -f deploy-svc.yaml --validate=false'
                        sh 'kubectl apply -f stateful.yaml --validate=false'
                    }
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
