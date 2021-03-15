export SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
export SENTRY_URL=$SENTRY_URL
export SENTRY_ORG=$SENTRY_ORG
export SENTRY_PROJECT=$SENTRY_PROJECT

RELEASES_NAME=`node scripts/version.js`
UPLOAD_DIST='./dist'

echo sourcemaps 版本：$RELEASES_NAME
sentry-cli releases new $RELEASES_NAME
sentry-cli releases files $RELEASES_NAME upload-sourcemaps $UPLOAD_DIST
rm -rf ./dist/*.js.map
rm -rf ./dist/*.css.map
echo "Finalized release for $RELEASES_NAME"

