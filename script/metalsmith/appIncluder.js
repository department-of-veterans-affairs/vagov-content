const request = require('request');

const APP_ASSET_BASE = 'https://www.vets.gov';

module.exports = (files, metalsmith, done) => {
  request('https://www.vets.gov/generated/file-manifest.json', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // TODO: error checking, etc
      const manifest = JSON.parse(body);

      Object.keys(files).forEach((file) => {
        const data = files[file];

        if (data.entryname !== undefined) {
          data.entryjs = APP_ASSET_BASE + manifest[`${data.entryname}.js`];
          data.entrycss = APP_ASSET_BASE + manifest[`${data.entryname}.css`];
        }

        files[file] = data;  // eslint-disable-line no-param-reassign
      });

      done();
    } else {
      // TODO: I don't know the return signature, so this might not be passing
      // an error back... This should just fail the build.
      done(error);
    }
  });
};
