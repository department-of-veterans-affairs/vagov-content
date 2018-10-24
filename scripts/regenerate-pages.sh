cd ../vagov-content

echo pulling latest...
git fetch vets-website

echo grabbing the commit history
git merge --strategy-option=theirs vets-website/master -m "Merging w/latest vets-website..."

echo removing stale files
git rm -r .
git clean -d -f

echo checking out latest
git checkout vets-website/master va-gov/pages

echo moving pages to root
git mv -f va-gov/pages/* pages

echo restoring build files
git checkout origin/master scripts
git checkout origin/master app.json
git checkout origin/master Jenkinsfile
git checkout origin/master package.json
git checkout origin/master Procfile

echo removing va-gov directory
git rm -r va-gov

echo committing..
git add .
git commit -m "Regenerating branch from vets-website va-gov/pages"
