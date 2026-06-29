---
title: 国产化数据库人大金仓（KingBase）部署教程
author: 梅莉
published: 2025-02-18 23:45:00
description: 使用Docker部署国产化数据库人大金仓，涵盖镜像加载、持久化配置及数据库连接验证
pinned: false
tags: [kingbase,人大金仓,docker]
category: 技术
draft: false
image: ./images/kingbase-install.avif
---
> [!NOTE] 最近同事求助，加上笔者自己也没有做过相关的记录，在此讲解一下国产化数据库（KingBase）的部署教程，~~KingBase本质是什么用过PostgreSql的懂的都懂~~

Kingbase有多种部署方式，笔者这里推荐使用docker容器部署，维护方便，但是需要写一些配置文件，笔者将会以Linux环境下的部署为例，请确认你的Linux环境已经安装好docker服务以及docker-compose工具，如果没有安装，可以参考我之前的文章

[https://www.elysium-stack.cn/archives/docker-install](https://www.elysium-stack.cn/archives/docker-install)

那么下面正式开始。

#### 第一步：获取人大金仓docker镜像

如果你有现成的镜像压缩包，比如`kingbase\_v008r006c008b0014\_single\_x86.tar`，那么可以跳过此步骤。

如果没有，打开

[https://www.kingbase.com.cn/download.html](https://www.kingbase.com.cn/download.html)

找到**“_KingbaseES数据库Docker镜像_”**，右侧选择需要使用版本，然后在下方选择对应CPU的镜像包进行下载，一般选择X64\_Linux，如果你使用的是国产化CPU，也可以选择对应的CPU版本进行下载。`（过程中可能会需要填写一些信息，看着填写即可）`

[grid]
![KingBaseES数据库Docker镜像](./images/kingbase-install-2.avif)
![下载验证](./images/kingbase-install-3.avif)
[/grid]


接着你会得到一个tar格式的镜像压缩包。

#### 第二步：上传镜像压缩包至服务器

可以随意找个文件夹塞进去，比如笔者喜欢放在`/home`下，然后cd进入该目录

```bash
cd /home
```

#### 第三步：使用docker读取镜像压缩包

```bash
docker load -i kingbase_v008r006c008b0014_single_x86.tar
```

把压缩包的名字改成你实际压缩包的名字，读取完成后，可以使用images指令，查看当前已加载镜像。
```bash
docker images
```

#### 第四步：创建数据持久化目录

这个目录的作用是持久化数据库的数据，避免容器重启后数据丢失，笔者喜欢在根目录下创建一个`data`文件夹
```bash
cd / 
mkdir data
cd /data 
mkdir kingbase
cd /data/kingbase
mkdir data
cd /data/kingbase/data
```

稍后将会把容器内的数据库目录挂载到本地`/data/kingbase/data`目录下

#### 第五步：编写docker-compose.yml文件

老规矩，回到笔者最爱的`home`，创建`docker-compose.yml`文件
```bash
cd /home 
vim docker-compose.yml
```

在`docker-compose.yml`中编写如下内容
```bash
services:
    kingbase:
        # 这里可以自行修改你的容器名称（需自行修改）
        container_name: kingbase
        # 这里是镜像名称，如果你不知道镜像名称可以使用docker images查看（需自行修改）
        image: kingbase_v008r006c008b0014_single_x86:v1
        privileged: true
        restart: always
        environment:
            TZ: "Asia/Shanghai"
            # 访问数据库的用户名（需自行修改）
            DB_USER: xxxx
            # 访问数据库的密码（需自行修改）
            DB_PASSWORD: xxxx
        ports:
            # 容器内部与外部的端口映射（默认不要动，kingbase默认使用54321端口）
            - "54321:54321"
        volumes:
            # 持久化目录映射，如果你刚才创建/data/kingbase/data/，那么你可以直接使用下面这个映射配置
            - /data/kingbase/data/:/home/kingbase/userdata/data/
```

保存`docker-compose.yml`文件

#### 第六步：创建并运行容器

使用docker-compose工具开始创建容器，首先确保处在`docker-compose.yml`同级目录中
```bash
cd /home
```

然后执行如下命令
```bash
docker-compose -f docker-compose.yml up -d
```

等待容器创建完毕

#### 第七步：查看容器运行状态

使用如下命令查看容器的运行状态
```bash
docker ps -a
```

不出意外，你应该会看到

![容器运行状态](./images/kingbase-install-1.avif)

`STATUS`表示`Up xx xx`，即表示容器正在运行，部署完成。

下面是一些常用的容器管理指令
```bash
# 启动容器
docker start 容器名称或容器id 
# 停止容器
docker stop 容器名称或容器id
# 重启容器
docker restart 容器名称或容器id
# 删除容器
docker rm 容器名称或容器id
```

#### 第八步：访问数据库

接下来你就可以使用各类DB工具进行访问了，需要注意的是，人大金仓默认初始数据库是`kingbase`，用户名和密码是刚才`docker-compose.yml`配置中的用户名和密码，端口号使用`54321`