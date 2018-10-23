git clone --single-branch interim-cms --depth 1 https://github.com/department-of-veterans-affairs/vets-website ../vagov-apps
cd ../vagov-apps && npm install
npm run heroku-postbuild
