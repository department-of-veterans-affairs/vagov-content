import org.kohsuke.github.GitHub

final isMaster = env.BRANCH_NAME == 'fix-content-deploy'
final appCodeRepo = 'department-of-veterans-affairs/vets-website'
final productionEnv = 'vagovdev'
final productionBuildJob = 'deploys/vets-website-vagovdev'

def getAppCodeLatestReleaseSHA = {
  def github = GitHub.connect()
  def repo = github.getRepository(appCodeRepo)
  def releases = repo.listReleases()
  def latestRelease = releases.asList().get(0)
  def tarball = latestRelease.getTarballUrl()


  // def ref = repo.getRef('heads/master').getObject()
  // def commitSha = ref.getSha()

  // @todo Return SHA of release, not just latest master.

  return tarball
}

def checkoutAppCode = {
  def scmOptions = [
    $class: 'GitSCM',
    branches: [[name: '*/master']],
    doGenerateSubmoduleConfigurations: false,
    extensions: [
      [$class: 'CloneOption', noTags: true, reference: '', shallow: true]
    ],
    submoduleCfg: [],
    userRemoteConfigs: [
      [url: "git@github.com:${appCodeRepo}.git"]
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

    dir('vagov-content') {
      checkout scm
    }

    dir('vagov-apps') {
      checkoutAppCode()
      script {
        def tarball = getAppCodeLatestReleaseSHA()
        echo "${tarball}"
        // sh(script: "yarn install --production=false")
      }
    }

  }
}
