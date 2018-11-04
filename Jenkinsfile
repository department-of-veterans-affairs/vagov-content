import org.kohsuke.github.GitHub

def isMaster = env.BRANCH_NAME == 'fix-content-deploy'

def isLatestBuild = {
  isMaster && !env.CHANGE_TARGET && !currentBuild.nextBuild
}

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

  stage('Deploy vagovdev') {
    // if (!isLatestBuild()) {
    //   return
    // }

    // build job: 'testing/vets-website/master', wait: false

    // runDeploy('deploys/vets-website-vagovdev', commit)

    // Rebuild the latest commit with the new app-content
    // If there isn't a tar ball for that commit, just exit

    def appCode = getAppCodeRepo()

    sh "echo ${appCode.latest}"

    // build job: jobName, parameters: [
    //     booleanParam(name: 'notify_slack', value: true),
    //     stringParam(name: 'ref', value: ref),
    //   ], wait: false
  }
}
