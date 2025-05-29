FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Set environment variables for Git repository URL and commit SHA
# These variables can be passed at build time using --build-arg
# docker build . -t nuttea/node-example --build-arg DD_GIT_REPOSITORY_URL=$(git config --get remote.origin.url) --build-arg DD_GIT_COMMIT_SHA=$(git rev-parse HEAD)
ARG DD_GIT_REPOSITORY_URL
ARG DD_GIT_COMMIT_SHA
ENV DD_GIT_REPOSITORY_URL=${DD_GIT_REPOSITORY_URL} 
ENV DD_GIT_COMMIT_SHA=${DD_GIT_COMMIT_SHA}

ADD index.js ./

ADD package.json ./

RUN npm install

CMD ["npm", "start"]