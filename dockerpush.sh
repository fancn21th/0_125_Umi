# local image name
LOCAL_BUILD_NAME_DOCKER=nantong/nginx
# Remote Image Name
REPO_NAME_DOCKER=registry.cn-hangzhou.aliyuncs.com/sino-nantong/web-nginx
# Delete Local Images
docker rmi -f $LOCAL_BUILD_NAME_DOCKER:latest
# Build Local Image
docker build -t $LOCAL_BUILD_NAME_DOCKER .
# Retrieve Image ID
docker images > images.txt
ID_IMG_DOCKER=`cat images.txt | grep $LOCAL_BUILD_NAME_DOCKER | awk '{print $3}'`
echo "----- Retrieve Image ID:$ID_IMG_DOCKER --------"
# Fetch the Remote Image Tags
docker login --username=nantong2020 --password=nantong123 registry.cn-hangzhou.aliyuncs.com
VERSION_IMG_DOCKER=`cat images.txt | grep $REPO_NAME_DOCKER | awk '{print $2}'`
# Try to get the most latest tags
echo $VERSION_IMG_DOCKER > temp.txt
VERSION_IMG_DOCKER=$(awk 'BEGIN{n=1;max=0;nu=0}{for(n=1;n<=NF;n++){a[$n]=$n;if(a[$n]>=max)max=a[$n]}{print max}{max=0}}' temp.txt)
# Plus 0.1
NEW_VERSION=$(echo "$VERSION_IMG_DOCKER+0.1"|bc)
echo "--------New Version: $NEW_VERSION --------"
docker tag $ID_IMG_DOCKER $REPO_NAME_DOCKER:$NEW_VERSION
docker push $REPO_NAME_DOCKER:$NEW_VERSION