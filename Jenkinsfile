final isMaster = env.BRANCH_NAME == 'fix-content-deploy'

def getAppCodeRepo = {
  def github = GitHub.connect()
  def repo = github.getRepository('department-of-veterans-affairs/vets-website')
  def ref = repo.getRef('heads/master').getObject()
  def latestCommitSha = ref.getSha()
  return [
    latest: latestCommitSha
  ]
}

node('vetsgov-general-purpose') {
  properties([[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', daysToKeepStr: '60']]]);

  stage('Refresh Dev/Staging') {
    if (!isMaster) return

    // Dev/Staging should contain the latest code, so we can just issue a rebuild
    // to the vets-website pipeline and know that'll handle the rest.

    build job: 'testing/vets-website/master', wait: false
  }

  stage('Refresh Production') {
    if (!isMaster) return

    // Production is a special case, because it's not redeployed every commit, but
    // every release instead. So, we need to rebuild Prod using the archive of the
    // latest release.

    echo 'Deploying Production....'

  }
}
