import org.kohsuke.github.GitHub

isMaster = env.BRANCH_NAME == 'fix-content-deploy'
orgName = 'department-of-veterans-affairs'
appCodeRepo = 'vets-website'
contentRepo = 'vagov-content'
productionEnv = 'vagovdev'
productionBuildJob = 'deploys/vets-website-vagovdev'

def getTagOfAppCodeLatestRelease = {
  def github = GitHub.connect()
  def repo = github.getRepository(appCodeRepo)
  def releases = repo.listReleases()
  def latestRelease = releases.asList().get(0)
  def latestReleaseTagName = latestRelease.getTagName()

  return latestReleaseTagName
}

def checkoutAppCode = {
  def scmOptions = [
    $class: 'GitSCM',
    branches: [[name: '*/master']],
    doGenerateSubmoduleConfigurations: false,
    extensions: [
      [$class: 'CloneOption', noTags: false, reference: '', shallow: true]
    ],
    submoduleCfg: [],
    userRemoteConfigs: [
      [url: "git@github.com:${orgName}/${appCodeRepo}.git"]
    ]
  ]
  checkout changelog: false, poll: false, scm: scmOptions
}

node('vetsgov-general-purpose') {
  properties([[
    $class: 'BuildDiscarderProperty',
    strategy: [
      $class: 'LogRotator',
      daysToKeepStr: '60'
    ]]
  ]);

  def awsCredentials = [[
    $class: 'UsernamePasswordMultiBinding',
    credentialsId: 'vetsgov-website-builds-s3-upload',
    usernameVariable: 'AWS_ACCESS_KEY',
    passwordVariable: 'AWS_SECRET_KEY'
  ]]

  def releaseTag, releaseCommit, dockerImage, contentCommit

  stage('Rebuild Dev/Staging') {
    if (!isMaster) return

    // Dev/Staging should contain the latest code, so we can just issue a rebuild
    // to the vets-website pipeline and know that'll handle the rest.

    // build job: 'testing/vets-website/master', wait: false
  }

  stage('Rebuild Production') {
    // if (!isMaster) return

    // Production is a special case, because it's not redeployed every commit, but
    // every release instead. So, we need to rebuild Prod using the archive of the
    // latest release.

    dir(contentRepo) {

      // Checkout the content and grab a reference to the current commmit.

      checkout scm
      contentCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
    }

    dir(appCodeRepo) {

      // Checkout the app-code, then reset it to the latest commit.
      // Grab a reference to the tag, commit SHA, and the dockerImage.

      checkoutAppCode()

      releaseTag = 'vets-website/v0.1.383' //getTagOfAppCodeLatestRelease()
      sh "git checkout ${releaseTag}"

      def imageTag = java.net.URLDecoder.decode(releaseTag).replaceAll("[^A-Za-z0-9\\-\\_]", "-")

      releaseCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
      dockerImage = docker.build("${appCodeRepo}:${imageTag}")
    }

    // Setup the docker-mount config

    def currentDir = pwd()
    def dockerArgs = "-v ${currentDir}/${appCodeRepo}:/application -v ${currentDir}/${contentRepo}:/${contentRepo}"

    dockerImage.inside(dockerArgs) {

      // Build the site using the "---content-deployment" flag
      // The build script will use this flag to pull the compiled app-code from the www.va.gov S3 bucket.

      def installDependencies = "cd /application && yarn install --production=false"
      def build = "npm --prefix /application --no-color run build -- --buildtype=${productionEnv} --content-deployment --content-directory=../${contentRepo}"
      def preArchive = "cd /application && node script/pre-archive/index.js --buildtype=${productionEnv}"

      sh installDependencies
      sh build
      sh preArchive

      withCredentials(awsCredentials) {

        // Upload to S3 using the commit SHA from the app-code, suffixed by the content commit SHA

        // def tarballName = "${releaseCommit}__content-${contentCommit}"
        def convertToTarball = "tar -C /application/build/${productionEnv} -cf /application/build/${productionEnv}.tar.bz2 ."
        def uploadTarball = "\
          s3-cli put --acl-public --region us-gov-west-1 /application/build/${productionEnv}.tar.bz2 \
          s3://vetsgov-website-builds-s3-upload/${releaseCommit}/${productionEnv}.tar.bz2"

        sh convertToTarball
        sh uploadTarball
      }
    }
  }

  stage('Deploy Production') {
    // if (!isMaster) return

    build job: productionBuildJob, parameters: [
      booleanParam(name: 'notify_slack', value: true),
      stringParam(name: 'ref', value: releaseCommit),
    ], wait: true
  }
}
