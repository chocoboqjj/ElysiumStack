---
title: Meting快速私有化部署及SSL配置教程
author: 梅莉
published: 2025-06-18 17:09:00
description: 使用Docker私有化部署Meting-API并配置Nginx反向代理与SSL证书实现HTTPS域名访问
pinned: false
tags: [meting,docker]
category: 技术
draft: false
image: ./images/meting-install.avif
---
Meting是一个非常好用的开源音乐Api框架，笔者在重建本站后将音乐模块由原先的Aplayer框架改为了使用Meting框架，但在整个使用过程中发现公共的MetingApi接口经常会由于网络原因导致加载不出音乐模块，因此笔者选择将Meting进行私有化部署，以提高音乐模块的稳定性。接下来笔者会详细说明部署流程以及SSL相关的配置，最终使用域名来访问Meting接口。

## 事前准备工作

-   linux服务器一台
    
-   Nginx环境
    
-   Docker环境及docker-compose插件
    
-   （可选）SSL证书
    
-   ~~不怕踩坑的良好心态~~
    

## 第一步：编写docker-compose.yml配置文件

```yaml
services:
  meting:
    image: intemd/meting-api:latest
    hostname: meting-api
    container_name: meting-api
    restart: always
    ports:
      - "3000:3000"
```

## 第二步：执行配置文件并创建容器

```bash
docker-compose -f docker-compose.yml up -d
```

完整这一步之后，就可以通过3000端口访问meting的测试页面了，例：`127.0.0.1:3000`

## 第三步【可选】：配置HTTPS域名访问

> [!NOTE] 如果你已经配置好了SSL证书可以直接进入第四步

打开Nginx的配置文件，添加SSL证书配置

```nginx
# 配置 域名访问
server {
    listen 443 ssl;
    # 【需要修改】
    server_name www.xxxxxx.cn;

    # SSL 配置
    # 【需要修改】
    ssl_certificate /ssl/xxxxxx.crt;
    # 【需要修改】
    ssl_certificate_key /ssl/xxxxxx.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    # 设置客户端请求体的最大大小
    client_max_body_size 100m;

    # 拒绝基于 IP 的直接访问
    # 【需要修改】
    if ($host != "www.xxxxxx.cn") {
        # 直接关闭连接
        return 444;  
    }

    # 默认代理到 实际内网ip地址及端口，也就是前端访问页面的入口
    location / {
        # 【需要修改】
        proxy_pass http://127.0.0.1:8080/;
        proxy_set_header HOST $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 错误页面配置
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

然后重启nginx生效

## 第四步【可选】：添加meting接口反向代理

```nginx
location /meting/ {
  # 【需要修改】
  #  meting的访问地址,这里的端口一定要和meting部署的外部端口保持一致
  proxy_pass http://127.0.0.1:3000/; # 设置的端口
  proxy_set_header X-Forwarded-Host $scheme://$host:$server_port/meting;
}
```

> [!WARNING] 这里有个坑，如果你希望使用一个独立的域名来访问Meting接口，那么必须要给代理加上一个路由，例如：`/meting`，直接代理到`/`虽然也可以访问，但是访问协议会变成`HTTP`，而不是`HTTPS`，从而导致`.lrc`歌词文件或`.mp3`音频文件获取失败。

至此，Meting的部署与SSL配置就完成了，接下来就可以通过Meting提供的接口来播放自己喜欢的歌曲啦

Meting接口帮助文档参考：[https://github.com/metowolf/Meting](https://github.com/metowolf/Meting)