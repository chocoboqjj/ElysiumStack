---
title: docker/docker-compose安装教程
author: 梅莉
published: 2025-02-18 15:19:00
description: Linux环境下离线安装Docker与Docker-Compose的完整步骤，含服务配置与自启动设置
pinned: false
tags: [docker,docker-compose]
category: 技术
draft: false
image: ./images/docker-install.avif
---
最近经常遇到需要自己部署私有化服务，而多数情况下我都是使用docker容器去部署服务，那么docker的安装便成了部署的前置条件，受制于实际部署过程中有无网络等其它环境因素的影响，离线部署相对来说麻烦一点，下面详细说一下离线部署docker以及docker-compose的方式。

> [!NOTE] 本文主要围绕linux操作系统说明docker/docker-compose的安装步骤，windows有桌面程序（[**_docker desktop_**](https://www.docker.com/#run)）可以直接使用，另外不同版本之间的命令可能会有差异，建议自行查阅官方文档获取准确的信息。

## docker安装

### 离线安装

#### 第一步：下载docker离线部署包

打开[**_下载地址_**](https://download.docker.com/linux/static/stable/x86_64/)随后按需下载对应版本的tgz压缩包即可

#### 第二步：上传docker部署包并解压

把下载好的tgz文件上传到你的服务器上，任意文件夹均可，例如 **_/home/docker-20.10.20.tgz_**

进入docker包所在的目录下（此处为**_/home_**目录）

```bash
cd /home 
```

解压缩tgz文件得到docker文件夹

```bash
tar -zxvf docker-20.10.20.tgz
```

#### 第三步：移动docker文件夹至/usr/bin目录下

```bash
mv docker/* /usr/bin/
```

#### 第四步：创建docker.service配置文件

```bash
vim /etc/systemd/system/docker.service
```

建议这个配置文件放在**_/etc/systemd/system/_**

然后将docker.service配置文件中的内容修改为如下

```bash
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target firewalld.service
Wants=network-online.target
[Service]
Type=notify
ExecStart=/usr/bin/dockerd
ExecReload=/bin/kill -s HUP $MAINPID
LimitNOFILE=infinity
LimitNPROC=infinity
TimeoutStartSec=0
Delegate=yes
KillMode=process
Restart=on-failure
StartLimitBurst=3
StartLimitInterval=60s
[Install]
WantedBy=multi-user.target
```

接着保存即可

#### 第五步：修改docker执行权限

```bash
chmod +x /etc/systemd/system/docker.service
```

然后重启daemon使其生效

```bash
systemctl daemon-reload
```

#### 第六步：设置自启动

```bash
systemctl enable docker.service
```

#### 第七步：启动docker

```bash
systemctl start docker
```

#### 第八步：验证docker安装

```bash
docker -v
```

显示docker版本信息即安装完成

## docker-compose安装

### 离线安装

#### 第一步：从github上下载docker-compose

打开[**_https://github.com/docker/compose/releases_**](https://github.com/docker/compose/releases)根据需要下载对应的docker-compose文件，我这里下载的docker-compose-linux-x86\_64，不同的服务器内核会有区别

#### 第二步：上传docker-compose文件

随便找个地方放，我放在**_/home_**下

#### 第三步：移动docker-compose至/usr/local/bin目录下

```bash
mv docker-compose-linux-x86_64 /usr/local/bin/docker-compose
```

#### 第四步：修改docker-conpose执行权限

```bash
chmod +x /usr/local/bin/docker-compose
```

#### 第五步：验证docker-compose安装

```bash
docker-compose -v
```

显示docker-compose版本信息即安装完成