import org.kohsuke.github.GitHub

final isMaster = env.BRANCH_NAME == 'fix-content-deploy'
final appCodeRepo = 'department-of-veterans-affairs/vets-website'

def getAppCodeLatestReleaseSHA = {

  // Returns the commit SHA of the latest app-code release.

  def github = GitHub.connect()
  def repo = github.getRepository(appCodeRepo)
  def ref = repo.getRef('heads/master').getObject()
  def commitSha = ref.getSha()
  return commitSha
}

def checkoutAppCode = {
  def scmOptions = [
    $class: 'GitSCM',
    branches: [[name: '*/master']],
    doGenerateSubmoduleConfigurations: false,
    extensions: [
      [$class: 'CloneOption', noTags: true, reference: '', shallow: true],
      [$class: 'RelativeTargetDirectory', relativeTargetDir: './']
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
    if (!isMaster) return

    // Production is a special case, because it's not redeployed every commit, but
    // every release instead. So, we need to rebuild Prod using the archive of the
    // latest release.

    def commitSha = getAppCodeLatestReleaseSHA()

    dir('vagov-content') {
      checkout scm
    }

    echo "Cloning ${appCodeRepo}"

    dir('vagov-apps') {
      checkoutAppCode()
    }

    echo 'done!'
  }
}
