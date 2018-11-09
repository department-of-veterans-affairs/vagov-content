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

def commentBrokenLinks(buildOutput) {
  // Find all lines with broken links in production build
  // def broken_links = sh (
  //   script: 'grep -o \'\\[vagovprod\\].*>>> href: ".*",\' consoleText',
  //   returnStdout: true
  // ).trim()

  // echo buildOutput

  def brokenLinksStart = buildOutput.indexOf('Error:')
  def comment = buildOutput[brokenLinksStart..-1]

  // echo "Here we go!!"
  echo comment

  // def github = GitHub.connect()
  // def repo = github.getRepository("${GITHUB_ORG}/${CONTENT_REPO}")
  // def pr = repo.queryPullRequests().head("${GITHUB_ORG}:${env.BRANCH_NAME}").list().asList().get(0)

  // // Post our comment with broken links formatted as a Markdown table
  // pr.comment("This pull request contains broken links :warning:\n\n|File| Link URL to be fixed|\n|--|--|\n" +
  //            broken_links.replaceAll(/\[production\] |>>> href: |,/,"|") +
  //            "\n\n _Note: Long file names or URLs may be cut-off_")
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

    writeFile file: "test.txt", text: "test"

    dockerImage.inside(dockerArgs) {
      def installDependencies = "cd /application && yarn install --production=false"
      def build = "npm --prefix /application --no-color run build -- --buildtype=vagovprod --entry static-pages 2>&1 | tee test.txt"

      sh installDependencies
      sh build
    }

    def output = sh(returnStdout: true, script: "cat test.txt").trim()
    def hasError = output.indexOf('npm ERR!')
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
