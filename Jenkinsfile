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
    extensions: [
      [$class: 'CloneOption', noTags: false, reference: '', shallow: true]
    ],
    submoduleCfg: [],
    userRemoteConfigs: [
      [url: "git@github.com:${GITHUB_ORG}/${APP_CODE_REPO}.git"]
    ]
  ]
  checkout changelog: false, poll: false, scm: scmOptions
}

def commentBrokenLinks = {
  // Pull down console log replacing URL with IP since we can't hit internal DNS
  sh "curl -O \$(echo ${env.BUILD_URL} | sed 's/jenkins.vetsgov-internal/172.31.1.100/')consoleText"

  // Find all lines with broken links in production build
  def broken_links = sh (
    script: 'grep -o \'\\[vagovprod\\].*>>> href: ".*",\' consoleText',
    returnStdout: true
  ).trim()

  def github = GitHub.connect()
  def repo = github.getRepository("${GITHUB_ORG}/${CONTENT_REPO}")
  def pr = repo.queryPullRequests().head("${GITHUB_ORG}:${env.BRANCH_NAME}").list().asList().get(0)

  // Post our comment with broken links formatted as a Markdown table
  pr.comment("This pull request contains broken links :warning:\n\n|File| Link URL to be fixed|\n|--|--|\n" +
             broken_links.replaceAll(/\[production\] |>>> href: |,/,"|") +
             "\n\n _Note: Long file names or URLs may be cut-off_")
}

node('vetsgov-general-purpose') {

  def imageTag
  def dockerImage
  def output

  properties([[
    $class: 'BuildDiscarderProperty',
    strategy: [
      $class: 'LogRotator',
      daysToKeepStr: '60'
    ]]
  ]);

  stage('Validate Links') {
    dir(CONTENT_REPO) {
      checkout scm
    }

    dir(APP_CODE_REPO) {
      checkoutAppCode()
      imageTag = java.net.URLDecoder.decode(env.BUILD_TAG).replaceAll("[^A-Za-z0-9\\-\\_]", "-")
      dockerImage = docker.build("vets-website:${imageTag}")
    }

    def currentDir = pwd()
    def dockerArgs = "-v ${currentDir}/${APP_CODE_REPO}:/application -v ${currentDir}/${CONTENT_REPO}:/${CONTENT_REPO}"

    try {
      dockerImage.inside(dockerArgs) {
        def installDependencies = "cd /application && yarn install --production=false"
        def build = "npm --prefix /application --no-color run build -- --buildtype=vagovprod --entry static-pages >> build-output.txt"

        sh installDependencies
        sh build
        output = sh(returnStdout: true, script: 'head build-output.txt').trim()
      }
    } catch (error) {

      echo output
    }
  }

  stage('Rebuild Website') {
    if (!IS_MASTER) return

    // Dev/Staging should contain the latest code, so we can just issue a rebuild
    // to the vets-website pipeline and know that'll handle the rest.

    build job: 'testing/vets-website/master', wait: false
  }
}
