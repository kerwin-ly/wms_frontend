REPO=kerwinleeyi/wms_html
DEV_TAG="dev"
TIME_NOW=`date '+%Y%m%d.%H%M%S'`
TAG=$DEV_TAG.$TIME_NOW
yarn build

docker build --no-cache -t $REPO:$TAG -f docker/build/Local.Dockerfile .
docker push $REPO:$TAG
