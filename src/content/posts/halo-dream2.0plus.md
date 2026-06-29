---
title: Dream2.0Plus主题访客信息侧边栏美化
author: 梅莉
published: 2025-08-26 16:12:00
description: 基于Nice猫API实现Halo Dream2.0Plus主题访客信息侧边栏，含IP定位、距离计算及完整源码
pinned: false
tags: [halo,dream2.0plus,博客]
category: 技术
draft: false
image: ./images/halo-dream2.0plus.avif
---
前段时间有小伙伴问这个是怎么实现的，单独开一篇来说一下

![访客信息侧边栏效果](./images/halo-dream2.0plus-1.avif)

首先说明一下Dream2.0Plus的主题文档中提供了访客侧边栏的源码方案~~（笔者也是自己写完了才发现原来主题作者其实有提供）~~

[https://www.hcjike.com/docs/halo-theme-dream2.0/theme/sidebar-assembly](https://www.hcjike.com/docs/halo-theme-dream2.0/theme/sidebar-assembly)

> 如果想直接采用主题作者方案的小伙伴，直接套用上述链接内的代码按照常规的自定义侧边栏配置即可，也可自行编写HTML嵌入

~~为了对得起自己造的轮子，~~下面笔者详细说明一下制作过程。

## 定位API服务

市面上有太多免费的API接口服务了，笔者测试了很多不同服务商的，当然也包括腾讯、高德、百度这些大厂，总结来说大厂的东西确实更好用，但作为个人开发者每天有限额，比如腾讯的地图服务大概是每天6000次的调用量，当然这个量级对于一个博客站来说已经完全够用了，但是配置过于复杂。经过三番比较，笔者最终选择了**Nice猫**，只能说这大概是笔者见过的最稳定最好用的API聚合站之一。

[https://api.nsmao.net/](https://api.nsmao.net/)

## 注册并获取API Key

打开**Nice猫**，注册并登录，随后在密钥管理中找`您的API KEY 密钥`同时根据需要配置`安全校验方式` ，建议配置。

![Nice猫API密钥管理](./images/halo-dream2.0plus-2.avif)

## 本站访客信息侧边栏源码

废话不多说，直接看代码

```html
<style>
    /* 通用居中 */
    .align-center {
        text-align: center;
    }

    /* 高亮文字颜色 */
    .font-color {
        color: deepskyblue;
    }

    /* IP 遮罩：默认模糊，鼠标悬停后清晰 */
    .ip-mask {
        cursor: pointer;
        user-select: none;
        transition: all .3s ease;
        filter: blur(4px);
    }

    .ip-mask:hover {
        filter: none;
    }
</style>
<!-- 欢迎信息容器 -->
<div id="welcomeMessage" class="align-center">
    <p>🌍 小伙伴你好呀！ 🌍</p>
    <p>正在寻找你的足迹...</p>
</div>

<!-- 开往/空间穿梭按钮 -->
<div class="align-center">
    <p>🚇 继续探索未知 👇️👇️ 发现更多精彩 🚇</p>
    <a href="https://www.travellings.cn/go.html" target="_blank" rel="noopener" title="开往-友链接力">
        <img src="https://www.travellings.cn/assets/logo.gif" alt="开往-友链接力" width="120" />
    </a>
    <a href="https://blogs.quest" target="_blank" title="空间穿梭-随机访问 BlogsClub 成员博客">
        <img src="https://www.blogsclub.org/images/shuttle_4.png" alt="空间穿梭" />
    </a>
</div>

<script>
    /***********************
     * 工具函数
     ***********************/

    /** 根据当前小时获取问候语与建议 */
    function getGreetingAndAdvice() {
        const hour = new Date().getHours();

        if (hour < 6) {
            return {
                greeting: "🌛 深夜好呀 👋",
                advice: "🌙这么晚还不睡嘛，不要熬夜，早点休息啦！🌙"
            };
        } else if (hour < 11) {
            return {
                greeting: "🌞 早上好呀 👋",
                advice: "💪新的一天！ 充满活力！💪"
            };
        } else if (hour < 13) {
            return {
                greeting: "🍽️ 中午好呀 👋",
                advice: "🍔别忘了享受一顿美味的午餐！🍔"
            };
        } else if (hour < 18) {
            return {
                greeting: "☕ 下午好呀 👋",
                advice: "🍵休息一下，喝杯咖啡吧！🍵"
            };
        } else if (hour < 22) {
            return {
                greeting: "🌜 晚上好呀 👋",
                advice: "🌃放松心情，享受夜晚的宁静！🌃"
            };
        } else {
            return {
                greeting: "🌛 深夜好呀 👋",
                advice: "🌙这么晚还不睡嘛，不要熬夜，早点休息啦！🌙"
            };
        }
    }

    /** 角度转弧度 */
    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    /** 根据经纬度计算与“本站”之间的距离（km） */
    function calculateDistance(lat, lng) {
        // 地球半径 km
        const R = 6371;
        // 自定义纬度
        const customLat = 0.0;
        // 自定义经度
        const customLng = 0.0;

        const dLat = toRadians(lat - customLat);
        const dLon = toRadians(lng - customLng);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(customLat)) *
            Math.cos(toRadians(lat)) *
            Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (R * c).toFixed(2);
    }

    /***********************
     * 网络请求
     ***********************/

    /** 获取当前访问者的 IP 与地理位置信息 */
    async function fetchLocation() {
        // 拼接上你的key
        const url = "https://api.nsmao.net/api/ip/query?key=";
        try {
            const res = await fetch(url);
            const { code, data } = await res.json();
            if (code === 200) {
                return {
                    ip: data.ip,
                    country: data.country,
                    province: data.prov,
                    city: data.city,
                    district: data.district,
                    adcode: data.adcode,
                    length: calculateDistance(data.lat, data.lng)
                };
            }
        } catch (e) {
            console.error("获取地理位置失败：", e);
        }
        return null;
    }

    /***********************
     * 渲染逻辑
     ***********************/

    /** 将获取到的信息渲染到欢迎区域 */
    function renderWelcomeMessage(location) {
        const { greeting, advice } = getGreetingAndAdvice();
        document.getElementById("welcomeMessage").innerHTML = `
                <p class="align-center"><strong>${greeting}</strong></p>
                <p>
                    欢迎来自
                    <strong class="font-color">${location.province}</strong>
                    <strong class="font-color">${location.city}</strong>
                    <strong class="font-color">${location.district}</strong>
                    的小伙伴！
                </p>
                <p class="align-center">${advice}</p>
                <p class="align-center">
                    🌍 您当前的 IP 是
                    <strong><span class="ip-mask font-color">${location.ip}</span></strong> 🌍
                </p>
                <p class="align-center">
                    📍 距离 <strong class="font-color">本站</strong> 约
                    <strong class="font-color">${location.length}</strong> 公里哦！📍
                </p>
                <hr />
            `;
    }

    /** 初始化：获取地理位置并渲染 */
    async function init() {
        const location = await fetchLocation();
        if (location) {
            renderWelcomeMessage(location);
        } else {
            document.getElementById("welcomeMessage").innerHTML =
                `<p>🌍 这位小伙伴，你似乎迷失了~🌍</p>
                     <p>获取位置信息失败，请稍后再试~😅<p>`;
        }
    }

    /***********************
     * 入口
     ***********************/

    // 兼容各种加载状态
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
</script>
```

以上有几个需要进行配置的地方：

-   `customLat`（纬度）和`customLng`（经度）分别代表自定义的经纬度，默认是`0.0`，你可以设置成任何位置，同时也可以一并修改描述信息`<strong class="font-color">本站</strong>`，将`本站`改为你的目标地点名称。
    
-   `const url = "https://api.nsmao.net/api/ip/query?key=";`这里的key需要自行拼接上刚才在**Nice猫**生成的key
    

经纬度的获取也非常方便，直接使用百度坐标拾取器就行

[https://lbs.baidu.com/maptool/getpoint](https://lbs.baidu.com/maptool/getpoint)

最后，把代码复制进`自定义模块`侧边栏的`侧边栏内容`里就大功告成了。

![自定义模块侧边栏配置](./images/halo-dream2.0plus-3.avif)
