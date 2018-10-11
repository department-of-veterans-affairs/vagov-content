# based on https://github.com/nodejs/docker-node/blob/master/4.7/slim/Dockerfile

FROM node:8

# Match the jenkins uid/gid on the host (504)
RUN groupadd --gid 504 jenkins \
  && useradd --uid 504 --gid jenkins --shell /bin/bash --create-home jenkins

ENV YARN_VERSION 1.5.1
ENV NODE_ENV production

RUN apt-get update && apt-get install -y netcat \
  && npm install -g yarn@$YARN_VERSION \
  && npm install -g nsp \
  && npm install -g s3-cli \
  && npm install -g codeclimate-test-reporter \
  && chmod +x /usr/local/lib/node_modules/yarn/bin/yarn.js

RUN git clone --depth 1 -b master https://github.com/department-of-veterans-affairs/vets-website /application

# Install the latest version of vets-website
RUN cd /application \
  && LATEST_VERSION=$(git describe --tags) \
  && git checkout ${LATEST_VERSION}

WORKDIR /application

USER jenkins
