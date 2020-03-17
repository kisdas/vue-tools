#! /bin/sh
caniuse=`ls -al | grep .git`
if [[ ! $caniuse ]]
then
    echo "请确定你的代码在项目根目录下执行哦"
    exit 1
fi

$caniuse