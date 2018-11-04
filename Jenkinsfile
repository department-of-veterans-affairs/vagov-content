import org.kohsuke.github.GitHub

final isMaster = env.BRANCH_NAME == 'master'

node('vetsgov-general-purpose') {
  properties([[
    $class: 'BuildDiscarderProperty',
    strategy: [
      $class: 'LogRotator',
      daysToKeepStr: '60'
    ]]
  ]);

  stage('Rebuild Website') {
    if (!isMaster) return

    // Dev/Staging should contain the latest code, so we can just issue a rebuild
    // to the vets-website pipeline and know that'll handle the rest.

    build job: 'testing/vets-website/master', wait: false
  }
}
