import org.kohsuke.github.GitHub

IS_MASTER = env.BRANCH_NAME == 'master'
GITHUB_ORG = 'department-of-veterans-affairs'
APP_CODE_REPO = 'vets-website'
CONTENT_REPO = 'vagov-content'

def checkoutAppCode = {
  final scmOptions = [
    $class: 'GitSCM',
    branches: [[name: '*/master']],
    doGenerateSubmoduleConfigurations: false,
    submoduleCfg: [],
    userRemoteConfigs: [
      [url: "git@github.com:${GITHUB_ORG}/${APP_CODE_REPO}.git"]
    ]
  ]
  checkout changelog: false, poll: false, scm: scmOptions
}

def getPullRequest(numberOnly = false) {
  def github = GitHub.connect()
  def repo = github.getRepository("${GITHUB_ORG}/${CONTENT_REPO}")
  def pr = repo.queryPullRequests().head("${GITHUB_ORG}:${env.BRANCH_NAME}").list().asList().get(0)

  if (numberOnly) return pr.getNumber()

  return pr;
}

def commentOnGitHub(comment) {
  def pr = getPullRequest()
  pr.comment(comment)
}

def commentBrokenLinks(buildOutput) {
  def brokenLinksStart = buildOutput.indexOf('Error:')
  def brokenLinkEnd = buildOutput.indexOf('npm ERR! code ELIFECYCLE') - 1
  def comment = ':warning: This content failed to build with the following output:'

  comment += "\n```\n${buildOutput[brokenLinksStart..brokenLinkEnd]}\n```\n"
  commentOnGitHub(comment);
}

node('vetsgov-general-purpose') {

  def imageTag
  def dockerImage

  properties([[
    $class: 'BuildDiscarderProperty',
    strategy: [
      $class: 'LogRotator',
      daysToKeepStr: '60'
    ]]
  ]);

  stage('Check for Urgent Changes') {
    dir(CONTENT_REPO) {
      checkout scm
      if (IS_MASTER) return

      sh "git config --add remote.origin.fetch +refs/heads/master:refs/remotes/origin/master"
      sh "git fetch --no-tags"

      def changedFiles = sh(returnStdout: true, script: "git diff --name-only origin/master..origin/${env.BRANCH_NAME}")
      def homepageChanged = changedFiles.indexOf('fragments/home/banner.yml') > -1 || changedFiles.indexOf('fragments/home/news.yml') > -1

      if (homepageChanged) {
        def numberOnly = true
        def prNumber = getPullRequest(numberOnly)
        def message = """\
@channel \
Pull request opened containing changes to the VA.gov homepage! \
These changes usually contain content that is high priority, such as for a weather alert or government shutdown. \
Please review, merge, and if necessary, deploy this change as soon as possible. \
https://www.github.com/${GITHUB_ORG}/${CONTENT_REPO}/pull/${prNumber}
"""

        // slackSend(message: message, channel: 'oncall', color: '#DDDD00', failOnError: false)
      }
    }
  }

  stage('Validate Links') {
    dir(APP_CODE_REPO) {
      checkoutAppCode()
      imageTag = java.net.URLDecoder.decode(env.BUILD_TAG).replaceAll("[^A-Za-z0-9\\-\\_]", "-")
      dockerImage = docker.build("vets-website:${imageTag}")
    }

    def currentDir = pwd()
    def dockerArgs = "-v ${currentDir}/${APP_CODE_REPO}:/application -v ${currentDir}/${CONTENT_REPO}:/${CONTENT_REPO}"
    def drupalAddress = "http://internal-prod-vagovcms-3001-2053888503.us-gov-west-1.elb.amazonaws.com"

    withCredentials([usernamePassword(credentialsId:  "drupal-prod", usernameVariable: 'DRUPAL_USERNAME', passwordVariable: 'DRUPAL_PASSWORD')]) {
      dockerImage.inside(dockerArgs) {
        def installDependencies = "cd /application && yarn install --production=false"
        def build = "npm --prefix /application --no-color run build -- --buildtype=vagovprod --drupal-address=${drupalAddress} --entry static-pages --pull-drupal 2>&1 | tee output.log"

        sh installDependencies
        sh build
      }
    }

    def output = sh(returnStdout: true, script: "cat output.log").trim()
    def hasError = output.indexOf('npm ERR!') > -1
    if (hasError) {
      commentBrokenLinks(output)
      error(output)
    }
  }

  stage('Rebuild Website') {
    if (!IS_MASTER) return

    // Dev/Staging should contain the latest code, so we can just issue a rebuild
    // to the vets-website pipeline and know that'll handle the rest.

    build job: 'testing/vets-website/master', wait: false
  }
}
