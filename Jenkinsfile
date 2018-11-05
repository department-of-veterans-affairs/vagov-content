import org.kohsuke.github.GitHub

isMaster = env.BRANCH_NAME == 'fix-content-deploy'
orgName = 'department-of-veterans-affairs'
appCodeRepo = 'vets-website'
contentRepo = 'vagov-content'
productionEnv = 'vagovdev'
productionBuildJob = 'deploys/vets-website-vagovdev'
latestReleaseTag = null

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

def executeBuild(dockerImage) {
  def installDependencies = "cd /application && yarn install --production=false"
  def build = "cd /application && npm --no-color run build -- --buildtype=${productionEnv}"
  def preArchive = "cd /application && node script/pre-archive/index.js --buildtype=${productionEnv}"
  sh installDependencies
  sh build
  sh preArchive
}

def archiveBuild = {
  def awsCredentials = [[
    $class: 'UsernamePasswordMultiBinding',
    credentialsId: 'vetsgov-website-builds-s3-upload',
    usernameVariable: 'AWS_ACCESS_KEY',
    passwordVariable: 'AWS_SECRET_KEY'
  ]]

  def convertToTarball = "tar -C /application/build/${productionEnv} -cf /application/build/${productionEnv}.tar.bz2 ."
  def uploadTarball = "s3-cli put --acl-public --region us-gov-west-1 /application/build/${productionEnv}.tar.bz2 s3://vetsgov-website-builds-s3-upload/${ref}/${productionEnv}.tar.bz2"

  withCredentials(awsCredentials) {
    sh(script: convertToTarball)
    sh(script: uploadTarball)
  }
}

node('vetsgov-general-purpose') {
  properties([[
    $class: 'BuildDiscarderProperty',
    strategy: [
      $class: 'LogRotator',
      daysToKeepStr: '60'
    ]]
  ]);

  stage('Rebuild Dev/Staging') {
    if (!isMaster) return

    // Dev/Staging should contain the latest code, so we can just issue a rebuild
    // to the vets-website pipeline and know that'll handle the rest.

    // build job: 'testing/vets-website/master', wait: false
  }

  stage('Refresh Production') {
    // if (!isMaster) return

    // Production is a special case, because it's not redeployed every commit, but
    // every release instead. So, we need to rebuild Prod using the archive of the
    // latest release.

    def imageTag = java.net.URLDecoder.decode(latestReleaseTag).replaceAll("[^A-Za-z0-9\\-\\_]", "-")
    def dockerImage = docker.build("${appCodeRepo}:${imageTag}")
    def dockerArgs = "-v ${pwd()}/${appCodeRepo}:/application -v ${pwd()}/${contentRepo}:/${contentRepo}"

    latestReleaseTag = getTagOfAppCodeLatestRelease()

    dir(contentRepo) {
      checkout scm
    }

    dir(appCodeRepo) {
      checkoutAppCode()
      sh "git checkout ${latestReleaseTag}"
    }

    dockerImage.inside(dockerArgs) {
      executeBuild(dockerImage)
      // archiveBuild()
    }
  }
}
