pipeline{
    agent {
        node{
            label 'agent1'
        }
    }
    stages{
        stage('requirements'){
            steps{
                sh 'gem install bundler'
            }
        }
        stage('build'){
            steps{
                sh 'bundle install'
            }
        }
        stage('test'){
            steps{
                sh 'rails spec'
            }
        }
    }
}