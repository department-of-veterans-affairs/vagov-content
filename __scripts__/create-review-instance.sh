export CHECK_BROKEN_LINKS="no"

# Get the absolute path of the content directory
vagov_content_dir=${PWD}

git clone --branch interim-cms --depth=1 https://github.com/department-of-veterans-affairs/vets-website ../vagov-apps
cd ../vagov-apps
yarn install --production=false

# Execute the build script
npm run build -- --entry static-pages,style --brand-consolidation-enabled --content-directory=${vagov_content_dir}

ls

cd build

echo build contents

ls

# Move the directory out of /tmp so the files persist
mv build ${vagov_content_dir}/build

# asd
