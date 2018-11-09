import org.kohsuke.github.GitHub

node('vetsgov-general-purpose') {

  properties([[
    $class: 'BuildDiscarderProperty',
    strategy: [
      $class: 'LogRotator',
      daysToKeepStr: '60'
    ]]
  ]);

  isMaster = env.BRANCH_NAME == 'master'
  orgName = 'department-of-veterans-affairs'
  appCodeRepo = 'vets-website'
  imageTag = null
  dockerImage = null

  checkoutAppCode(orgName, appCodeRepo) {
    final scmOptions = [
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

  stage('Validate Links') {
    dir(contentRepo) {
      checkout scm
    }

    dir(appCodeRepo) {
      this.checkoutAppCode()
      imageTag = java.net.URLDecoder.decode(env.BUILD_TAG).replaceAll("[^A-Za-z0-9\\-\\_]", "-")
      dockerImage = docker.build("vets-website:${imageTag}")
    }

  }

  stage('Rebuild Website') {
    if (!isMaster) return

    // Dev/Staging should contain the latest code, so we can just issue a rebuild
    // to the vets-website pipeline and know that'll handle the rest.

    build job: 'testing/vets-website/master', wait: false
  }
}
