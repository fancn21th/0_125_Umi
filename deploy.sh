#！ /bin/bash

currentPath=$(pwd)
echo "当前文件夹路径: $currentPath"


# 拉去git上最新数据
echo "start pull updates from remote"
git pull

echo "Start Building......"
npm run build

sftp root@10.3.69.40 <<EOT
put -r $currentPath/dist /home/nantonghtml/
quit
EOT
