---
title: Elysium-Meting-Api公益服务
author: 梅莉
published: 2025-10-11 18:15:00
description: 基于Meting-API自建的公开音乐API服务，支持网易云、QQ音乐等多平台搜索与播放链接获取
pinned: false
tags: [meting,API]
category: 技术
draft: false
image: ./images/meting-install.avif
---
## 前言

笔者最近在整理源站自用的一些API服务，想把部分API服务提供出来帮助一些博主降低部分功能的部署难度和复杂度，当然笔者依然还是提倡自行学习进行私有化部署，**ElysiumMeting** 是笔者基于Meting-API自建的音乐API服务，现已完全公开且**仅供学习交流使用，请勿用于任何商业用途**。

> [!CAUTION] 仅供学习交流使用，请勿用于任何商业用途

## 相关资源

::github{repo="metowolf/Meting-API"}

## 使用方法

### 基础请求格式

`https://meting.elysium-stack.cn/api?参数1=XXX&参数2=XXX&参数3=XXX`

### 参数说明（必填）

-   `server` - 音乐平台
    
    -   `netease`（网易云，已支持VIP解析）
        
    -   `tencent`（QQ音乐）
        
    -   `kugou`（酷狗）
        
    -   `xiami`（虾米）
        
    -   `baidu`（百度）
        
    -   `kuwo`（酷我）
        
-   `type` - 操作类型
    
    -   `search`（搜索歌曲）
        
    -   `song`（获取歌曲详情）
        
    -   `album`（获取专辑）
        
    -   `artist`（获取歌手）
        
    -   `playlist`（获取歌单）
        
    -   `lrc`（获取歌词）
        
    -   `url`（获取播放链接）
        
    -   `pic`（获取封面图片）
        
-   `id` - 资源ID
    

### 请求示例

-   **搜索歌曲**
    

`https://meting.elysium-stack.cn/api?server=netease&type=search&id=周杰伦`

-   **获取歌曲详情**
    

`https://meting.elysium-stack.cn/api?server=netease&type=song&id=歌曲ID`

-   **获取歌词**
    

`https://meting.elysium-stack.cn/api?server=netease&type=lrc&id=歌曲ID`