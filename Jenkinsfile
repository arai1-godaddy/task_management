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
                sh ''' 
                    bundle install --path vendor/bundle
                    gem install mysql2 -v '0.5.6' -- --with-openssl-dir=$(brew --prefix openssl@1.1) --with-ldflags=-L$(brew --prefix zstd)/lib
                    bundle exec rspec
                '''
            }
        }
    }
}