#!/bin/sh
cd /Users/zxycat2/代码/VSC/blog-demo-1/logs
cp ./access.log $(date +%Y-%m-%d).access.log
echo '' > access.log