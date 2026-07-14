import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		"title": "Snowykami OS",
		"siteurl": "https://sfkm.me",
		"imgurl": "https://q.qlogo.cn/g?b=qq&nk=2751454815&s=640",
		"desc": "Snowykami 的个人博客",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "EDream的小破站",
		"siteurl": "https://blog.edmc.cn",
		"imgurl": "https://blog.edmc.cn/upload/fillet-ElectricityDream.png",
		"desc": "人生没有绝对精彩，雨后或许没有彩虹，但后退一步确是失败。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "Dangks' Blog",
		"siteurl": "https://dangks.cn",
		"imgurl": "https://dangks.cn/upload/dangks_icon_135x135.ico",
		"desc": "记录・学习・分享・生活",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "Qute",
		"siteurl": "https://blog.wfso.cn",
		"imgurl": "https://pic.ziyuan.wang/2023/06/17/7b1cd22ea9386.webp",
		"desc": "一个分享技术和生活的博客",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "默小班",
		"siteurl": "https://www.memxb.top",
		"imgurl": "https://wmimg.com/i/780/2025/07/68677fe53c2d1.png",
		"desc": "一个初中生的小站点。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "张洪Heo",
		"siteurl": "https://blog.zhheo.com",
		"imgurl": "https://img.zhheo.com/i/67d8fa75943e4.webp",
		"desc": "分享设计与科技生活",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "尘の个人博客",
		"siteurl": "https://blog.mcxiaochen.top",
		"imgurl": "https://blog.mcxiaochen.top/favicon.ico",
		"desc": "一个高中生 UP 搭的博客  QwQ",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "喵喵喵……",
		"siteurl": "https://nicocat.cc",
		"imgurl": "https://avatars.githubusercontent.com/u/114812330",
		"desc": "此心安处是吾乡",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "THW's Blog",
		"siteurl": "https://blog.tianhw.top",
		"imgurl": "https://image.tianhw.top/avatar.webp",
		"desc": "Live a good life meet slowly",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "成烁BLOG",
		"siteurl": "https://blog.chengshuo.top",
		"imgurl": "https://blog.chengshuo.top/assets/images/tx.jpg",
		"desc": "致一锦程  探索不停",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "Honesty",
		"siteurl": "https://blog.hehouhui.cn",
		"imgurl": "https://www.hehouhui.cn/images/avatar.jpeg",
		"desc": "花有重开日，人无再少年",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "宏尘极客",
		"siteurl": "https://www.hcjike.com",
		"imgurl": "https://www.hcjike.com/favicon.ico",
		"desc": "专注于技术知识和NAS笔记等内容分享",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "彬红茶日记",
		"siteurl": "https://note.redcha.cn",
		"imgurl": "https://note.redcha.cn/upload/favicon-256x256.png",
		"desc": "个人生活笔记📒",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "蘇SU",
		"siteurl": "https://suus.me",
		"imgurl": "",
		"desc": "在数字的海洋中，寻找属于自己的星辰。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "哈喽！林墨白",
		"siteurl": "https://blog.lmb.blue",
		"imgurl": "https://files.blog.lmb.blue/assets/img/logo/pink-black.png",
		"desc": "沉墨满纸，一笑若白。",
		"tags": [
			"Blog"
		],
		"weight": 11,
		"enabled": true
	},
	{
		"title": "寒士杰克",
		"siteurl": "https://www.hansjack.com",
		"imgurl": "https://www.hansjack.com/favicon.ico",
		"desc": "喜欢捣鼓，不断进步！",
		"tags": [
			"Blog"
		],
		"weight": 11,
		"enabled": true
	},
	{
		"title": "异数",
		"siteurl": "https://www.yishu.pro",
		"imgurl": "https://www.yishu.pro/img/logo.jpg",
		"desc": "笔落惊风雨，诗成泣鬼神。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "懋和道人",
		"siteurl": "https://blog.dao.js.cn",
		"imgurl": "https://cn.cravatar.com/avatar/37d41e2b550633a30f5d41de61c1aa92?s=400&r=G&d=mp&ver=1754413756",
		"desc": "李懋和，俗名李栋梁。书法、国画爱好者，互联网安全与前端建设者。",
		"tags": [
			"Blog"
		],
		"weight": 11,
		"enabled": true
	},
	{
		"title": "致星极客 | To STAR",
		"siteurl": "https://2star.top",
		"imgurl": "https://2star.top/upload/zxjkicon.webp",
		"desc": "创造属于你我的「奇迹」",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "I'm WhiteBear",
		"siteurl": "https://whitebear.im",
		"imgurl": "https://www.blogsclub.org/blog/1/avatar/68383a458be2f.jpg",
		"desc": "个人自留地",
		"tags": [
			"Blog"
		],
		"weight": 12,
		"enabled": true
	},
	{
		"title": "温柔鱼-vrou",
		"siteurl": "https://blog.vrou.cn",
		"imgurl": "https://blog.vrou.cn/upload/logo.webp",
		"desc": "他还没有自我介绍呢",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "索玛",
		"siteurl": "https://suo.ma",
		"imgurl": "https://suo.ma/favicon.ico",
		"desc": "",
		"tags": [
			"Blog", "退网仙人"
		],
		"weight": 11,
		"enabled": true
	},
	{
		"title": "hatch_blod自留地",
		"siteurl": "https://002.hk",
		"imgurl": "https://www.blogsclub.org/blog/12/avatar/673ac9b082e5c.jpg",
		"desc": "Hello!",
		"tags": [
			"Blog"
		],
		"weight": 11,
		"enabled": true
	},
	{
		"title": "酥米的小站",
		"siteurl": "https://www.sumi233.top",
		"imgurl": "https://cdn.sumi233.top/gh/huang233893/blog-image-bed@main/top/huang233893/imgs/blog/usersumi.png",
		"desc": "终有一日，寻梦中人",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "XgrBlog",
		"siteurl": "https://xgrblog.cn",
		"imgurl": "https://xgrblog.cn/avatar.jpg",
		"desc": "学无止境",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "記緒漂流",
		"siteurl": "https://ttio.cc",
		"imgurl": "https://ttio.cc/favicon.svg",
		"desc": "于记忆之川，泛思绪之舟。",
		"tags": [
			"Blog"
		],
		"weight": 11,
		"enabled": true
	},
	{
		"title": "YYsuni",
		"siteurl": "https://www.yysuni.com",
		"imgurl": "https://www.yysuni.com/favicon.png",
		"desc": "YYsuni 的个人博客，记录前端开发、探索、笔记。前端 UI 更新代码仓库。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "Freedom2599的小破绽",
		"siteurl": "https://freedom2599.cn",
		"imgurl": "https://gcore.jsdelivr.net/gh/freedom2599/Pics@main/assets/tx.jpg",
		"desc": "气味是记忆的超链接",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "日勿の部落格",
		"siteurl": "https://blog.085404.xyz",
		"imgurl": "https://img.085404.xyz/images/206765796b50c8ccbfbee6a4cfea84ff.webp",
		"desc": "岁月漫长，恒久热爱",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "Antx's Blog",
		"siteurl": "https://blog.antx.cc",
		"imgurl": "https://halo-oss-qiniu.antx.cc/files/2025/07/30/uyeowvrywqlkttlj.png",
		"desc": "别怕路远，走一步就有一步的光亮。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "Enento焰白小站",
		"siteurl": "https://www.enento.cloud",
		"imgurl": "https://www.enento.cloud/upload/Enentoico.jpg",
		"desc": "百次思考，千次落笔，刻下万次记忆",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "gankudadiz的个人小站",
		"siteurl": "https://blog.gankudadiz.com",
		"imgurl": "https://blog.gankudadiz.com/avatar/avatar-128x128.jpg",
		"desc": "记录 coding 与生活。<127.0.0.1 is where the heart is>",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "枝动力の小站",
		"siteurl": "https://zhidongli.top",
		"imgurl": "https://zhidongli.top/OIP-C.webp",
		"desc": "渺渺星海，唯我独芒！",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "Serenity",
		"siteurl": "https://www.aobp.cn",
		"imgurl": "https://www.aobp.cn/upload/%E5%A4%B4%E5%83%8F.png",
		"desc": "热爱可抵岁月漫长",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "企鹅的博客",
		"siteurl": "https://www.lydqe.com.cn",
		"imgurl": "https://www.lydqe.com.cn/upload/logo.jpg",
		"desc": "努力学习新的知识",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "蛋蛋之家",
		"siteurl": "https://wuqishi.com",
		"imgurl": "https://wuqishi.com/dan.svg",
		"desc": "一枚蛋蛋的自留地",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "Rinty雨屋",
		"siteurl": "https://rinty.xyz",
		"imgurl": "https://rinty.xyz/upload/897409385.jpg",
		"desc": "活着就是一种伟大！",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "我剑也未尝不利",
		"siteurl": "https://tch.cool",
		"imgurl": "https://tch.cool/upload/logo.png",
		"desc": "对所有的烦恼说拜拜，对所有的快乐说嗨嗨～",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "wangxinyang王",
		"siteurl": "https://wangxinyang.top",
		"imgurl": "https://wangxinyang.top/avatar.png",
		"desc": "个人博客 / 学习交流 / 生活日常",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "壮壮博客",
		"siteurl": "https://zhuangzhuang.io",
		"imgurl": "https://zhuangzhuang.io/upload/favicon.png",
		"desc": "运维开发 / 独立开发者 / 博主",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "益友网站",
		"siteurl": "https://blog.yiyou.bj.cn",
		"imgurl": "https://www.yiyou.bj.cn/logo/youlogo.png",
		"desc": "记生活点滴，留岁月温柔。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "菰城鸥鹭的大学之道",
		"siteurl": "https://www.gcoulu.cn",
		"imgurl": "https://www.gcoulu.cn/upload/Logo_A%20%281%29.webp",
		"desc": "菰城鸥鹭的大学之道主页 欢迎访问！ 菰城鸥鹭的大学之道，一个无偿提供课堂笔记及学习技巧的网站。本站点仅供学习参考，非商业用途，感谢大家的关注与支持 ヽ(*￣▽￣*)ノ",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "星河の外",
		"siteurl": "https://blog.elsworld.cn:8443",
		"imgurl": "https://blog.elsworld.cn:8443/upload/blog-logo.png",
		"desc": "/* ShiDai's Personal Blog */",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "木因博客",
		"siteurl": "https://blog.muyin.site",
		"imgurl": "https://blog.muyin.site/upload/liuyiwuqing.png",
		"desc": "心在哪里收获就在哪里",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "Xiaozheng's Blog",
		"siteurl": "https://halo.bt.hyin.top",
		"imgurl": "https://halo.bt.hyin.top/upload/d21dec38-bf2a-470b-94b3-208eb8ebf80e.png",
		"desc": "一个热爱技术、喜欢折腾的小佬。 专注于后端开发。 记录生活，分享技术，探索未知。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "咖啡豆子coffee的小站",
		"siteurl": "https://blog.kfdzcoffee.cn",
		"imgurl": "https://images.kfdzcoffee.cn/i/1/avatar.png",
		"desc": "以真理的精神追求真理 Pursue truth in the spirit of truth",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "bbb-lsy07",
		"siteurl": "https://blog.tsoo.net",
		"imgurl": "https://blog.tsoo.net/upload/lsyb.png",
		"desc": "科技激荡人文，洞见智慧本真。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "羽天的驾驶舱",
		"siteurl": "https://www.yutian233.top",
		"imgurl": "https://www.yutian233.top/upload/cgi-bin_mmwebwx-bin_webwxgetmsgimg___MsgID_7876561108144232541_skey__crypt_d95c1199_bc58ab7d56720732.jpg",
		"desc": "物理発覚中。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "雨落秋垣",
		"siteurl": "https://uniomo.com",
		"imgurl": "https://uniomo.com/upload/favicon.webp",
		"desc": "我在，也可以不在。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "内密心書",
		"siteurl": "https://oortaka.top",
		"imgurl": "https://oortaka.top/upload/10-tuya.png",
		"desc": "漂浮在互联网海面上的一盏小灯",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "阿宏的随笔",
		"siteurl": "https://iachieveall.com",
		"imgurl": "https://p3-image-server.iachieveall.com/halo-pic/d03c4ff7-bb45-4951-b849-13888a32546d-vqgczrli.png?imageView2/0/w/800",
		"desc": "记录思考，持续协作",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "昊天兽王的日记本",
		"siteurl": "https://昊天兽王.top",
		"imgurl": "https://昊天兽王.top/upload/8b8a31b7-a023-4bc0-86de-41a37148d6ce.png",
		"desc": "hallo！world！",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "liveling的小破站",
		"siteurl": "https://www.liveling.top",
		"imgurl": "https://www.liveling.top/upload/liveling.png",
		"desc": "前端开发者 / 独立开发者 / 博主",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "繁华如风的小站",
		"siteurl": "https://www.fhsf.cn",
		"imgurl": "https://img.fhsf.cn/blog/2026/01/8BB1016E-0AFE-47E1-BFB3-1A0DA3A48DD3.png",
		"desc": "「繁华如风的小站」是一个专注于技术分享与数字生活的个人博客，致力于为开发者与技术爱好者提供实用教程、工具评测与创新思路。",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "花开暖年",
		"siteurl": "https://huakainuannian.cn",
		"imgurl": "https://huakainuannian.cn/upload/640%20%281%29-62757048-21c5-420c-9237-ddce6db786d1.gif",
		"desc": "热爱你来过的每一天星辰",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "梦涵LOVEの小窝",
		"siteurl": "https://heyuhan.huohuo.ink",
		"imgurl": "https://heyuhan.huohuo.ink/upload/%E6%A2%A6%E6%B6%B5LOVE-2.jpg",
		"desc": "一个一个小涵子的小 BLOG，一起来分享生活的小确幸吧～",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	},
	{
		"title": "Fry酥条の博客",
		"siteurl": "https://blog.fryfries13.cn",
		"imgurl": "https://blog.fryfries13.cn/upload/Fry%E9%85%A5%E6%9D%A1.png",
		"desc": "未来已来，尽在掌握！",
		"tags": [
			"Blog"
		],
		"weight": 10,
		"enabled": true
	}
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
