import org.kohsuke.github.GitHub

def envNames = ['development', 'staging', 'production']

def notify = { ->
  if (env.BRANCH_NAME == 'master') {
    message = "vagov-content master branch CI failed. |${env.RUN_DISPLAY_URL}".stripMargin()
    slackSend message: message,
    color: 'danger',
    failOnError: true
  }
}

node('vetsgov-general-purpose') {
  properties([[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', daysToKeepStr: '60']]]);
  def dockerImage, args, ref, imageTag

  // Checkout source, create output directories, build container

  stage('Setup') {
    try {
      checkout scm

      ref = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()

      sh "mkdir -p build"
      sh "mkdir -p logs/selenium"
      sh "mkdir -p coverage"

      imageTag = java.net.URLDecoder.decode(env.BUILD_TAG).replaceAll("[^A-Za-z0-9\\-\\_]", "-")

      dockerImage = docker.build("vagov-content:${imageTag}")
      args = "-v ${pwd()}:/application"
      retry(5) {
        dockerImage.inside(args) {
          sh "cd /application && yarn install --production=false"
        }
      }
    } catch (error) {
      notify()
      throw error
    }
  }

  // Perform a build for each build type

  stage('Build') {
    try {
      def builds = [:]

      for (int i=0; i<envNames.size(); i++) {
        def envName = envNames.get(i)

        builds[envName] = {
          dockerImage.inside(args) {
            sh "cd /application && npm --no-color run build -- --buildtype=${envName}"
          }
        }
      }

      parallel builds
    } catch (error) {
      notify()
      throw error
    }
  }
}
