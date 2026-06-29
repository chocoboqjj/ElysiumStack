---
title: Kafka安装部署及配置教程
author: 梅莉
published: 2025-03-07 15:14:00
description: 使用Docker部署Kafka消息中间件，含镜像拉取、持久化目录映射及IP访问配置
pinned: false
tags: [kafka,docker]
category: 技术
draft: false
image: ./images/kafka-install.avif
---
今天来说一下关于Kafka（卡夫卡）的部署方法，以下是市面上的主流消息中间件（如果打不开请使用科学手段）

**RabbitMQ** [https://www.rabbitmq.com/](https://www.rabbitmq.com/)

**Kafka** [https://kafka.apache.org/](https://kafka.apache.org/)

**RocketMQ** [https://rocketmq.apache.org/](https://rocketmq.apache.org/)

**ActiveMQ** [https://activemq.apache.org/](https://activemq.apache.org/)

其中，后三者为Apache基金会产品，这里不展开说明Apache基金会是什么以及四种消息中间件的优劣势，笔者最近正好在使用Kafka，那么下面直接进入正题。

#### 第一步：获取Kafka Docker镜像

使用pull拉取最新Kafka镜像

```bash
docker pull apache/kafka
```

#### 第二步：启动临时容器并创建本地持久化目录

Kafka默认端口使用9092，首先先随便启一个容器，这样做只是为了方便创建容器内外目录的映射关系

```bash
docker run -d --name kafka -p 9092:9092 apache/kafka
```

使用cp命令拷贝容器内目录到本地，笔者此处将容器内目录拷贝至本地/data/kafka下，因此先创建本地目录

```bash
mkdir -p /data/kafka
``` 

然后拷贝容器内的目录至本地，注意冒号前的kafka是容器的名字，也可以使用容器id

```bash
docker cp kafka:/etc/kafka /data/kafka
```

拷贝完成后这个容器就没用了，干掉它，要先停止容器才能移除容器

```bash
# 停止容器
docker stop kafka
# 移除容器
docker rm kafka
```

#### 第三步：创建Kafka容器并映射到本地持久化目录

很简单，直接一行命令

```bash
docker run -d --name kafka -p 9092:9092 -v /data/kafka/:/etc/kafka/  apache/kafka
```

这样kafka服务就创建完成并且在9092端口上运行起来了，但是还没完，还需要开放ip访问，默认只允许使用localhost访问

#### 第四步：配置访问ip地址

在本地持久化目录下找到server.properties配置文件

![配置kafka访问ip](./images/kafka-install-1.avif)

把这里的ip地址改成服务器的IP地址，笔者使用的内网ip，根据实际开发需要修改，

> [!CAUTION] 如果是正式部署上线的项目，请不要使用服务器的公网ip

![配置kafka访问ip](./images/kafka-install-2.avif)

最后重启一下容器，大功告成

```bash
docker restart kafka
```

完成以上步骤，一个简单的kafka服务就部署完成了