git clone --branch interim-cms --depth=1 https://github.com/department-of-veterans-affairs/vets-website ../vagov-apps
cd ../vagov-apps
yarn install --production=false
vagov_content_dir=${PWD##*/}
npm run build -- --entry static-pages,style --brand-consolidation-enabled --content-directory=${vagov_content_dir}
