pipeline{
    agent "agent1"
    stages{
        stage('requirements'){
            steps{
                sh 'gem install bundler'
            }
        }
        stage('build'){
            steps{
                sh 'bunlde install'
            }
        }
        stage('test'){
            steps{
                sh 'rails rspec'
            }
        }
    }
}