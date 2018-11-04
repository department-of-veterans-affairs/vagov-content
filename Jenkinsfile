import org.kohsuke.github.GitHub

def isMaster = env.BRANCH_NAME == 'fix-content-deploy'

def isLatestBuild = {
  isMaster && !env.CHANGE_TARGET && !currentBuild.nextBuild
}

def getLatestAppCodeCommit = {
  def github = GitHub.connect()
  def repo = github.getRepository('department-of-veterans-affairs/vets-website')
  def ref = repo.getRef('refs/heads/master').getObject()
  def ghObject = ref.getObject();
  def latestCommitSha = ghObject.getSha()
  return latestCommitSha
}

node('vetsgov-general-purpose') {
  properties([[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', daysToKeepStr: '60']]]);

  stage('Deploy VAGOVDEV') {
    // if (!isLatestBuild()) {
    //   return
    // }

    // build job: 'testing/vets-website/master', wait: false

    // runDeploy('deploys/vets-website-vagovdev', commit)

    // Rebuild the latest commit with the new app-content

    def latestAppCodeCommit = getLatestAppCodeCommit()

    sh "echo ${latestAppCodeCommit}"

    // build job: jobName, parameters: [
    //     booleanParam(name: 'notify_slack', value: true),
    //     stringParam(name: 'ref', value: ref),
    //   ], wait: false
  }
}
