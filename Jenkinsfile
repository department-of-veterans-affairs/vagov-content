import org.kohsuke.github.GitHub

def devBranch = 'master'
def stagingBranch = 'master'
def prodBranch = 'master'

env.CONCURRENCY = 10

def isDeployable = {
  (env.BRANCH_NAME == devBranch ||
   env.BRANCH_NAME == stagingBranch) &&
    !env.CHANGE_TARGET &&
    !currentBuild.nextBuild // if there's a later build on this job (branch), don't deploy
}

def notify = { ->
  if (env.BRANCH_NAME == devBranch ||
      env.BRANCH_NAME == stagingBranch ||
      env.BRANCH_NAME == prodBranch) {
    message = "vets-website ${env.BRANCH_NAME} branch CI failed. |${env.RUN_DISPLAY_URL}".stripMargin()
    slackSend message: message,
    color: 'danger',
    failOnError: true
  }
}

def get_master_sha = {
		def github = GitHub.connect()
		def repo = github.getRepository('department-of-veterans-affairs/vets-website')
		def master_branch = repo.getBranch("master")
		return master_branch.getSHA1()
}

node('vetsgov-general-purpose') {
  properties([[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', daysToKeepStr: '60']]]);

  stage('Deploy dev or staging') {
    try {
      if (!isDeployable()) {
        return
      }
			script {
					commit = get_master_sha()
      }
      if (env.BRANCH_NAME == devBranch) {
        build job: 'deploys/vets-website-dev', parameters: [
          booleanParam(name: 'notify_slack', value: true),
          stringParam(name: 'ref', value: commit),
        ], wait: false
        build job: 'deploys/vets-website-vagovdev', parameters: [
          booleanParam(name: 'notify_slack', value: true),
          stringParam(name: 'ref', value: commit),
        ], wait: false
      }
      if (env.BRANCH_NAME == stagingBranch) {
        build job: 'deploys/vets-website-staging', parameters: [
          booleanParam(name: 'notify_slack', value: true),
          stringParam(name: 'ref', value: commit),
        ], wait: false
        build job: 'deploys/vets-website-vagovstaging', parameters: [
          booleanParam(name: 'notify_slack', value: true),
          stringParam(name: 'ref', value: commit),
        ], wait: false
      }
    } catch (error) {
      notify()
      throw error
    }
  }
}
