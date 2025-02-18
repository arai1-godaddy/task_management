pipeline {
    agent {
        node {
            label 'agent1'
        }
    }
    environment {
        BUNDLE_PATH = "vendor/bundle"
    }
    stages {
        stage('requirements') {
            steps {
                sh 'gem install bundler'
            }
        }
        stage('build') {
            steps {
                sh '''
                    bundle config set path $BUNDLE_PATH
                    bundle install
                '''
            }
        }
        stage('test') {
            steps {
                sh '''
                    sudo apt-get update -y || sudo yum update -y
                    sudo apt-get install -y libmysqlclient-dev || sudo yum install -y mysql-devel
                    bundle exec rspec
                '''
            }
        }
    }
}