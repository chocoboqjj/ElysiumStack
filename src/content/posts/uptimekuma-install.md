---
title: 四个步骤使用UptimeKuma搭建状态监测站
author: 梅莉
published: 2025-08-24 23:36:00
description: 使用Docker四步部署UptimeKuma自托管监控工具，实现域名与中间件服务状态监测及SSL到期提醒
pinned: false
tags: [uptime-kuma,docker]
category: 技术
draft: false
image: ./images/uptimekuma-install.avif
---
## 简介

UptimeKuma是一个开源的自托管监控工具，详情可见Github

[https://github.com/louislam/uptime-kuma](https://github.com/louislam/uptime-kuma)

它可以帮助我们定时监控目标域名或中间件服务的运行状态，同时提供SSL证书到期提示的能力。本站的ElysiumKuma监测站便是基于UptimeKuma容器来进行部署的

[https://kuma.elysium-stack.cn/manage-status-page](https://kuma.elysium-stack.cn/manage-status-page)

UptimeKuma的部署方式也非常简单，只需进行一些细节的配置便可进行使用，那么和往常一样，笔者还是以docker容器化部署来详细说明过程中的要点。本文全程会使用docker，如果不会部署docker，可以参考我的这篇文章

[https://www.elysium-stack.cn/archives/docker-install](https://www.elysium-stack.cn/archives/docker-install)

## 第一步：拉取uptime-kuma镜像

```
 docker pull louislam/uptime-kuma:1
```

> 由于dockerhub在国内访问受限，如果拉取失败请更换镜像源/添加镜像加速。

## 第二步：创建运行kuma容器

一行命令搞定

```
docker run -d --restart=always -p 3003:3001 -v /data/uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma
```

> [!WARNING] 这里有两个需要注意的地方：
> 
> 1.  `-p 3003:3001` kuma容器内的运行端口是`3001`，由于笔者的服务器中`3001`端口被Meting占用，因此映射到了`3003`，请根据自己的服务器的实际情况调整。
>     
> 2.  `-v /data/uptime-kuma:/app/data` kuma在容器内部的安装目录在`/app/data`下，而`/data/uptime-kuma`是笔者自定义的本地挂载目录，可以改成本地其他目录，请根据实际需要调整。
>     

## 第三步：访问kuma控制台

浏览器访问`ip+映射端口号`，例如笔者的就是`http://x.x.x.x:3003`

![UptimeKuma控制台](./images/uptimekuma-install-1.avif)

首次访问需要配置管理员账号，按步骤操作，随后使用管理员账号登录即可。

## 第四步：添加监控项及状态页面

点击添加监控项，在右侧的页面中配置需要监控的内容

![添加监控项](./images/uptimekuma-install-2.avif)

可以监控的类型有很多，大家可以自行研究

![监控类型列表](./images/uptimekuma-install-3.avif)

添加完成后，可以在左侧的列表中看到已经配置的监控内容

![已配置的监控列表](./images/uptimekuma-install-4.avif)

接着点击状态页面，创建一个状态页

![创建状态页面](./images/uptimekuma-install-5.avif)

需要注意的是`路径`是访问状态页面的地址拼接，之后在你需要进行页面跳转的地方会用到，不要和其它页面路由冲突

![状态页面路径配置](./images/uptimekuma-install-6.avif)

添加完`状态页面`后，点击新增的记录，随后点击`添加监控项`配置需要展示的监控项，也可以`添加分组`便于分类。例如笔者先添加了`主站`组和`友情链接`组，根据分组点击把监控项拖进对应的分组，最后点击`保存`

![添加监控项到分组](./images/uptimekuma-install-7.avif)

至此，一个属于你自己的kuma监测站就完成了，复制页面地址，将其配置在你需要进行跳转的位置即可~

![UptimeKuma监测站完成效果](./images/uptimekuma-install-8.avif)
