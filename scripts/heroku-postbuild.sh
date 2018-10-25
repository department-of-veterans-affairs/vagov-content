export CHECK_BROKEN_LINKS="no"

vagov_content_dir=${PWD}
vagov_apps_dir=${vagov_content_dir}/../vagov-apps

echo vagov-content located at ${vagov_content_dir}
echo Installing vagov-apps into ${vagov_apps_dir}

# Install into a subdirectory, so that we're safe from tmp storage.
git clone --depth=1 https://github.com/department-of-veterans-affairs/vets-website ${vagov_apps_dir}

# cd into the newly-cloned repo
cd ${vagov_apps_dir}

# # Install all dependencies, including devDependencies
yarn install --production=false

# # Execute the build script
npm run build -- --entry static-pages --brand-consolidation-enabled --content-directory=${vagov_content_dir}/pages

# Move into vagov_content so that the build folder is easily references by the Procfile
mv ${vagov_apps_dir}/build ${vagov_content_dir}/build

