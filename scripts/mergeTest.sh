#!/bin/sh
#  get last log line
logLine=$(git log --oneline -1)

#  test if this is a merge commit
if echo ${logLine} | grep -E "[0-9a-fA-F]{7} Merge branch '.*' into 'develop'"; then
  echo "bumping version due to ticket merge into develop"

#  Bump patch version and push package.json change
  npm install
  rm -rf package-lock.json
  npm run build-readme
  git add docs/markdown
  npm version patch -f -m "Updating package version to %s."
  git push origin

  BASE_URL=$(echo $CI_PROJECT_URL |  cut -d'/' -f1-3)
#  cancel current job, version increment will rebuild
  curl -s -X POST -H "PRIVATE-TOKEN: ${PRIVATE_TOKEN}" "${BASE_URL}/api/v3/projects/${CI_PROJECT_ID}/builds/${CI_BUILD_ID}/cancel"
#  sleep just to give time for the cancel to kick in so we don't move to the next script
  sleep 1m
fi