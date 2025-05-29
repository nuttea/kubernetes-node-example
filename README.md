# Node.js application example

Build with Repo URL and Git Commit SHA

```bash
docker build . \
-t nuttea/node-example \
--build-arg DD_GIT_REPOSITORY_URL=$(git config --get remote.origin.url) \
--build-arg DD_GIT_COMMIT_SHA=$(git rev-parse HEAD) \
--platform linux/amd64

docker push nuttea/node-example
```