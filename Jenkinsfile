pipeline {
    agent {
        node {
            label 'agent1'
        }
    }
    environment {
        OPENSSL_DIR = "/usr/local/opt/openssl@3"  // Adjust based on your OpenSSL version
        PATH = "/usr/local/bin:$PATH"
    }
    stages {
        stage('requirements') {
            steps {
                sh 'gem install bundler'
            }
        }
        stage('build') {
            steps {
                sh 'bundle install'
            }
        }
        stage('test') {
            steps {
                sh ''' 
                    export LDFLAGS="-L/usr/local/opt/zstd/lib"
                    export CPPFLAGS="-I/usr/local/opt/zstd/include"
                    bundle install --path vendor/bundle
                    gem install mysql2 -v '0.5.6' -- --with-mysql-config=$(brew --prefix mysql)/bin/mysql_config
                    bundle exec rspec
                '''
            }
        }
    }
}