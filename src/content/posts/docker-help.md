---
title: Docker常用指令大全
author: 梅莉
published: 2025-06-30 12:03:00
description: 整理Docker常用命令，涵盖服务管理、镜像操作、容器生命周期及日志查看等，长期更新
pinned: false
tags: [docker]
category: 技术
draft: false
image: ./images/docker-help.avif
---
整理一些常用的docker命令，同时也是方便笔者自己在工作中查阅，长期更新

> [!TIP] 由于篇幅过长，可使用`Ctrl+F` 根据关键词搜索

### docker服务类命令

```bash
#查看docker服务运行状态
systemctl status docker   
#启动docker服务
systemctl start docker    
#停止docker服务
systemctl stop docker     
#重启docker服务
systemctl restart docker  
#设置docker服务开机自启动
systemctl enable docker   
#查看docker版本信息
docker version            
#查看docker详细信息
docker info               
#查看所有容器占用资源情况
docker stats              
```

### docker镜像类命令

```bash
#根据名称拉取镜像（此方法会默认拉取最新版本）
docker pull [image_name]               
#根据名称+标签拉取镜像（标签一般为版本号，如：docker pull nginx:1.24）
docker pull [image_name]:[tag]         
#搜索指定镜像
docker search [image_name]             
#查看已拉取的所有镜像信息
docker images                          
#移除指定镜像
docker rmi -f [image_id]               
#移除多个指定镜像
docker rmi -f [image_id] [image_id]   
#移除所有镜像
docker rmi -f $(docker images -aq)    
```

### docker容器类命令

```bash
#查看运行中的容器
docker ps                            
#查看所有容器         
docker ps -a                                  
#进入一个运行中的指定ID容器
docker exec -it [container_id] /bin/bash      
#【仅限在容器内部使用】停止容器并退出
exit                                          
#【仅限在容器内部使用】不停止容器并退出
ctrl+P+Q                                      
#根据指定ID镜像启动一个新的容器(params可以忽略也可以加入多个参数，具体如下)
docker run [params] [image_id]:[version]      
           #为容器命名
           --name [container_name]            
           #启用容器守护
           -d                                 
           #创建宿主机与容器内部的端口映射
           -p [host_port]:[container_port]  
           #将宿主机指定目录挂载到容器内部的指定目录，即持久化目录映射 
           -v [host_path]:[container_path]  
#启动指定ID容器
docker start [container_id]                   
#停止指定ID容器
docker stop [container_id]                    
#强制停止指定ID容器
docker kill [container_id]                    
#重启指定ID容器
docker restart [container_id]                 
#移除指定ID容器
docker rm -f [container_id]                   
#移除所有容器
docker rm -f $(docker ps -aq)                 
#查看指定容器的日志信息(params可以忽略也可以加入多个参数，具体如下)
docker logs [params] [container_id]           
            #显示日志时间戳
            -t                                
            #实时更新日志信息（使用该参数会一直打印日志）
            -f                               
            #指定显示最后多少条日志
            --tail [number]                   
#查看容器内部的进程占用情况
docker top [container_id]                                 
#将容器内指定目录下的内容拷贝到宿主机指定目录下
docker cp [contianer_id]:[contianer_path] [host_path]   
#将宿主机指定目录下的内容拷贝到容器内指定目录下
docker cp [host_path] [contianer_id]:[contianer_path]   
#将容器转换为自定义名称与自定义标签的镜像，标签一般为版本号（params可以忽略也可以加入多个参数，具体如下）
docker commit [params] [container_id] [image_name]:[tag]  
              #为镜像添加描述信息              
              -m [description]
              #为镜像添加作者信息
              -a [author_name]
#将指定镜像导出为镜像压缩包
docker save -o [tar_name].tar [image_name]
#导入镜像压缩包
docker load -i [tar_name].tar
```