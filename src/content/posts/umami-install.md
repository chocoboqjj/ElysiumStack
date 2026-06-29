---
title: 基于Postgresql使用Umami搭建访客监测站
author: 梅莉
published: 2025-06-13 17:50:00
description: 使用Docker部署PostgreSQL与Umami，搭建轻量级网站访客分析工具并配置JS注入与分享链接
pinned: false
tags: [umami,postgresql,docker]
category: 技术
draft: false
image: ./images/umami-install.avif
---
Umami 是一款轻量级的开源网站分析工具，能够非常方便的分析出网站的访客来源以及访客最常访问的资源等数据并以可视化图表的形式展示出来，本站已私有化部署了Umami来分析访客来源以及访问资源数据，具体可查看下方地址体验。

[https://umami.elysium-stack.cn/share/gOS01HeeWBxf0yRj/www.elysium-stack.cn](https://umami.elysium-stack.cn/share/gOS01HeeWBxf0yRj/www.elysium-stack.cn)

如果需要了解更多关于Umami的内容，也可以访问[https://umami.is/](https://umami.is/)查看

#### 第一步：编写postgres的docker-compose.yml配置

```yaml
services:
  db:
    # postgres最新镜像
    image: postgres:latest
    hostname: postgres
    container_name: postgres
    restart: always
    environment:
      # 初始数据库（可自行修改）
      POSTGRES_DB: postgres
      # 数据库连接用户（可自行修改）
      POSTGRES_USER: postgres
      # 数据库连接密码（可自行修改）
      POSTGRES_PASSWORD: postgres
    ports:
      # 容器内外映射端口号
      - "5432:5432"
    volumes:
      # 容器内外持久化目录
      - /data/postgresql/data:/var/lib/postgresql/data
```

#### 第二步：创建并启动postgres容器

```bash
# 会自动拉取postgres:latest镜像
docker-compose -f docker-compose.yml up -d
```

#### 第三步：编写umami的docker-compose.yml配置

```yaml
services:
    umami:
        # umami pg版本最新镜像
        image: umamisoftware/umami:postgresql-latest
        container_name: umami
        environment:
            # 示例：- DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/postgres
            - DATABASE_URL=postgresql://<数据库连接用户>:<数据库连接密码>@<数据库访问ip>:<端口号>/<默认数据库>
        ports:
            - 3000:3000
        restart: always
```

#### 第四步：创建并启动umami容器

```bash
# 会自动拉取umamisoftware/umami:postgresql-latest镜像
docker-compose -f docker-compose.yml up -d
```

#### 第五步：访问umami管理页，获取分享链接以及js注入代码

浏览器输入部署终端的`ip+端口号`，如：`127.0.0.1:3000`

![umami登录页](./images/umami-install-1.avif)

默认用户名为`admin`，密码为`umami`，登录成功后进入管理页面

![umami管理页](./images/umami-install-2.avif)

点击导航栏`Settings`

![umami设置页](./images/umami-install-3.avif)

点击`Add website`输入需要观测的域名（不是ip地址）

![umami添加站点页](./images/umami-install-4.avif)

添加完成后点击`Edit`，然后点击`Tracking code`获取JS注入代码，复制它

![umami获取js注入代码页](./images/umami-install-5.avif)

将这段代码注入到你的站点全局`head`标签中

![umami注入js代码页](./images/umami-install-6.avif)

所有配置工作完成，接下来回到管理页面点击`Share URL`，启动`Enable share URL`，同时获取URL地址

![umami分享链接页](./images/umami-install-7.avif)

#### 第六步：访问Umami Share URL

[grid]
![umami访客概览](./images/umami-install-8.avif)
![umami访客分析](./images/umami-install-9.avif)
![umami实时数据](./images/umami-install-10.avif)
[/grid]

至此Umami的搭建大功告成，需要观测其它站点同样也只需添加配置，然后JS注入即可