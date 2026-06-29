---
title: Nacos安装部署及配置教程
author: 梅莉
published: 2025-06-06 17:00:00
description: 使用Docker部署Nacos并适配人大金仓数据库，含驱动配置、数据库建表脚本及完整启动流程
pinned: false
tags: [nacos,docker]
category: 技术
draft: false
image: ./images/nacos-install.avif
---
由于nacos原生只支持内存数据库与mysql，对于一些国产化数据库来说并没有做好适配，那么笔者想专门说一说对于一些国产化数据库该如何去进行nacos的配置，笔者将会从nacos的部署到人大金仓（kingbase）的配置，讲解这整个流程中的操作方式，下面直接进入正题。

#### 第一步：获取Nacos镜像

使用pull拉取最新nacos镜像

```bash
docker pull nacos/nacos-server
```

![拉取nacos镜像](./images/nacos-install-1.avif)

#### 第二步：获取数据库驱动jar包

官网也给出了下载地址[人大金仓下载中心](https://download.kingbase.com.cn/xzzx/index.htm)，同样选择对应的数据库版本，然后在"**_接口驱动_**”中进行下载，可以在下载解压后的压缩包里找到对应版本的驱动包

![下载数据库驱动](./images/nacos-install-2.avif)

那么这里笔者将会使用**kingbase8-8.6.0.jar**这个驱动，按照实际情况选择对应的包即可

#### 第三步：创建持久化目录（conf、logs、data、libs）

笔者在根目录data文件中创建，你也可以选择其它位置作为你的之后挂载节点

```bash
cd /data 
mkdir nacos
cd /data/nacos
mkdir conf
mkdir logs
mkdir libs
```

文件目录结构如下

![创建nacos持久化目录](./images/nacos-install-3.avif)

#### 第四步：上传数据库驱动包至libs文件夹

这一步没啥好说的，有手就行

![上传数据库驱动](./images/nacos-install-4.avif)

#### 第五步：编写application.properties配置文件

```properties
# 这里这个mysql不用管，不影响最终连接kingbase
spring.datasource.platform=mysql
db.num=1
# 【需要修改】这里替换成你的数据库连接ip和端口，其它参数不要动
db.url.0=jdbc:kingbase8://127.0.0.1:54321/nacos_config?allowEncodingChanges=true&clientEncoding=UTF8
# 【需要修改】数据库认证用户
db.user.0=admin
# 【需要修改】数据库认证密码
db.password.0=admin123
# 开启集群鉴权
nacos.core.auth.enabled=true
nacos.core.auth.enable.userAgentAuthWhite=false
nacos.core.auth.plugin.nacos.token.secret.key=${NACOS_AUTH_TOKEN:iW0hB1iM1gX3uG5bF1kB4wB4gY9oP0pR9yI4fK0zE4kJ3gR9vU8uV9uH3xP8cJ7hX3uX5xO0}
nacos.core.auth.server.identity.key=${NACOS_AUTH_IDENTITY_KEY:admin}
nacos.core.auth.server.identity.value=${NACOS_AUTH_IDENTITY_VALUE:admin}
```

然后将这个配置文件上传至config文件夹内

![上传application.properties](./images/nacos-install-5.avif)

#### 第六步：配置Nacos数据库

这里直接提供SQL脚本了，直接丢数据库运行一下一键生成所需要的库和表单

```sql
CREATE DATABASE nacos_config ENCODING = 'UTF8';
\ C nacos_config;
CREATE TABLE "config_info" (
	"id" BIGSERIAL NOT NULL,
	"data_id" VARCHAR ( 255 ) NOT NULL,
	"group_id" VARCHAR ( 128 ),
	"content" TEXT NOT NULL,
	"md5" VARCHAR ( 32 ),
	"gmt_create" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"gmt_modified" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"src_user" TEXT,
	"src_ip" VARCHAR ( 50 ),
	"app_name" VARCHAR ( 128 ),
	"tenant_id" VARCHAR ( 128 ) DEFAULT '',
	"c_desc" VARCHAR ( 256 ),
	"c_use" VARCHAR ( 64 ),
	"effect" VARCHAR ( 64 ),
	"type" VARCHAR ( 64 ),
	"c_schema" TEXT,
	"encrypted_data_key" VARCHAR ( 1024 ) NOT NULL DEFAULT '',
	PRIMARY KEY ( "id" ),
	UNIQUE ( "data_id", "group_id", "tenant_id" ) 
);
COMMENT ON TABLE "config_info" IS 'config_info';
COMMENT ON COLUMN "config_info"."id" IS 'id';
CREATE TABLE "config_info_gray" (
	"id" BIGSERIAL NOT NULL,
	"data_id" VARCHAR ( 255 ) NOT NULL,
	"group_id" VARCHAR ( 128 ) NOT NULL,
	"content" TEXT NOT NULL,
	"md5" VARCHAR ( 32 ),
	"src_user" TEXT,
	"src_ip" VARCHAR ( 100 ),
	"gmt_create" TIMESTAMP ( 3 ) NOT NULL DEFAULT CURRENT_TIMESTAMP ( 3 ),
	"gmt_modified" TIMESTAMP ( 3 ) NOT NULL DEFAULT CURRENT_TIMESTAMP ( 3 ),
	"app_name" VARCHAR ( 128 ),
	"tenant_id" VARCHAR ( 128 ) DEFAULT '',
	"gray_name" VARCHAR ( 128 ) NOT NULL,
	"gray_rule" TEXT NOT NULL,
	"encrypted_data_key" VARCHAR ( 256 ) NOT NULL DEFAULT '',
	PRIMARY KEY ( "id" ),
	UNIQUE ( "data_id", "group_id", "tenant_id", "gray_name" ) 
);
CREATE INDEX "idx_dataid_gmt_modified" ON "config_info_gray" ( "data_id", "gmt_modified" );
CREATE INDEX "idx_gmt_modified" ON "config_info_gray" ( "gmt_modified" );
COMMENT ON TABLE "config_info_gray" IS 'config_info_gray';
CREATE TABLE "config_tags_relation" (
	"id" BIGINT NOT NULL,
	"tag_name" VARCHAR ( 128 ) NOT NULL,
	"tag_type" VARCHAR ( 64 ),
	"data_id" VARCHAR ( 255 ) NOT NULL,
	"group_id" VARCHAR ( 128 ) NOT NULL,
	"tenant_id" VARCHAR ( 128 ) DEFAULT '',
	"nid" BIGSERIAL NOT NULL,
	PRIMARY KEY ( "nid" ),
	UNIQUE ( "id", "tag_name", "tag_type" ) 
);
CREATE INDEX "idx_tenant_id" ON "config_tags_relation" ( "tenant_id" );
COMMENT ON TABLE "config_tags_relation" IS 'config_tag_relation';
CREATE TABLE "group_capacity" (
	"id" BIGSERIAL NOT NULL,
	"group_id" VARCHAR ( 128 ) NOT NULL DEFAULT '',
	"quota" INTEGER NOT NULL DEFAULT 0,
	"usage" INTEGER NOT NULL DEFAULT 0,
	"max_size" INTEGER NOT NULL DEFAULT 0,
	"max_aggr_count" INTEGER NOT NULL DEFAULT 0,
	"max_aggr_size" INTEGER NOT NULL DEFAULT 0,
	"max_history_count" INTEGER NOT NULL DEFAULT 0,
	"gmt_create" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"gmt_modified" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ( "id" ),
	UNIQUE ( "group_id" ) 
);
COMMENT ON TABLE "group_capacity" IS '集群、各Group容量信息表';
CREATE TABLE "users" ( "username" VARCHAR ( 50 ) NOT NULL PRIMARY KEY, "password" VARCHAR ( 500 ) NOT NULL, "enabled" BOOLEAN NOT NULL );
CREATE TABLE "roles" ( "username" VARCHAR ( 50 ) NOT NULL, "role" VARCHAR ( 50 ) NOT NULL, UNIQUE ( "username", "role" ) );
CREATE TABLE "permissions" (
	"role" VARCHAR ( 50 ) NOT NULL,
	"resource" VARCHAR ( 128 ) NOT NULL,
	"action" VARCHAR ( 8 ) NOT NULL,
	UNIQUE ( "role", "resource", "action" ) 
);
CREATE TABLE config_info_beta (
	ID INTEGER AUTO_INCREMENT NOT NULL,
	data_id VARCHAR ( 255 ) NOT NULL,
	group_id VARCHAR ( 128 ) NOT NULL,
	app_name VARCHAR ( 128 ) DEFAULT NULL,
	CONTENT TEXT NOT NULL,
	beta_ips TEXT DEFAULT NULL,
	md5 VARCHAR ( 32 ) DEFAULT NULL,
	gmt_create datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	gmt_modified datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	src_user TEXT,
	src_ip VARCHAR ( 20 ) DEFAULT NULL,
	tenant_id VARCHAR ( 128 ) DEFAULT '',
	encrypted_data_key TEXT 
);
COMMENT ON TABLE config_info_beta IS 'config_info_beta';
COMMENT ON COLUMN config_info_beta.gmt_create IS '创建时间';
COMMENT ON COLUMN config_info_beta.gmt_modified IS '修改时间';
COMMENT ON COLUMN config_info_beta.src_user IS 'source user';
COMMENT ON COLUMN config_info_beta.tenant_id IS '租户字段';
COMMENT ON COLUMN config_info_beta.encrypted_data_key IS '秘钥';
ALTER TABLE config_info_beta ADD CONSTRAINT pk_config_info_beta PRIMARY KEY ( ID ) ENABLE VALIDATE;
ALTER TABLE config_info_beta ADD CONSTRAINT uk_configinfobeta_datagrouptenant UNIQUE ( data_id, group_id, tenant_id ) ENABLE VALIDATE;
CREATE TABLE config_info_tag (
	ID INTEGER AUTO_INCREMENT NOT NULL,
	data_id VARCHAR ( 255 ) NOT NULL,
	group_id VARCHAR ( 128 ) NOT NULL,
	tenant_id VARCHAR ( 128 ) DEFAULT '',
	tag_id VARCHAR ( 128 ) NOT NULL,
	app_name VARCHAR ( 128 ) DEFAULT NULL,
	CONTENT TEXT NOT NULL,
	md5 VARCHAR ( 32 ) DEFAULT NULL,
	gmt_create datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	gmt_modified datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	src_user TEXT,
	src_ip VARCHAR ( 20 ) DEFAULT NULL 
);
COMMENT ON TABLE config_info_tag IS 'config_info_tag';
COMMENT ON COLUMN config_info_tag.gmt_create IS '创建时间';
COMMENT ON COLUMN config_info_tag.gmt_modified IS '修改时间';
COMMENT ON COLUMN config_info_tag.src_user IS 'source user';
COMMENT ON COLUMN config_info_tag.src_ip IS 'source ip';
ALTER TABLE config_info_tag ADD CONSTRAINT pk_config_info_tag PRIMARY KEY ( ID ) ENABLE VALIDATE;
ALTER TABLE config_info_tag ADD CONSTRAINT uk_configinfotag_datagrouptenanttag UNIQUE ( data_id, group_id, tenant_id, tag_id ) ENABLE VALIDATE;
CREATE TABLE his_config_info (
	ID BIGINT NOT NULL,
	nid BIGINT NOT NULL AUTO_INCREMENT,
	data_id VARCHAR ( 255 ) NOT NULL,
	group_id VARCHAR ( 128 ) NOT NULL,
	app_name VARCHAR ( 128 ) DEFAULT NULL,
	CONTENT TEXT NOT NULL,
	md5 VARCHAR ( 32 ) DEFAULT NULL,
	gmt_create datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	gmt_modified datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	src_user TEXT,
	src_ip VARCHAR ( 20 ) DEFAULT NULL,
	op_type CHAR ( 10 ) DEFAULT NULL,
	tenant_id VARCHAR ( 128 ) DEFAULT '',
	encrypted_data_key TEXT 
);
COMMENT ON TABLE his_config_info IS '多租户改造';
COMMENT ON COLUMN his_config_info.tenant_id IS '租户字段';
COMMENT ON COLUMN his_config_info.encrypted_data_key IS '秘钥';
ALTER TABLE his_config_info ADD CONSTRAINT pk_his_config_info PRIMARY KEY ( nid ) ENABLE VALIDATE;
CREATE INDEX idx_gmt_create ON his_config_info USING BTREE ( gmt_create ) TABLESPACE sys_default;
CREATE INDEX idx_gmt_modified ON his_config_info USING BTREE ( gmt_modified ) TABLESPACE sys_default;
CREATE INDEX idx_did ON his_config_info USING BTREE ( data_id ) TABLESPACE sys_default;
CREATE TABLE tenant_capacity (
	ID BIGINT NOT NULL AUTO_INCREMENT,
	tenant_id VARCHAR ( 128 ) NOT NULL DEFAULT '',
	quota INTEGER NOT NULL DEFAULT '0',
	USAGE INTEGER NOT NULL DEFAULT '0',
	max_size INTEGER NOT NULL DEFAULT '0',
	max_aggr_count INTEGER NOT NULL DEFAULT '0',
	max_aggr_size INTEGER NOT NULL DEFAULT '0',
	max_history_count INTEGER NOT NULL DEFAULT '0',
	gmt_create datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	gmt_modified datetime NOT NULL DEFAULT CURRENT_TIMESTAMP 
);
COMMENT ON TABLE tenant_capacity IS '租户容量信息表';
COMMENT ON COLUMN tenant_capacity.ID IS '主键ID';
COMMENT ON COLUMN tenant_capacity.tenant_id IS 'Tenant ID';
COMMENT ON COLUMN tenant_capacity.quota IS '配额，0表示使用默认值';
COMMENT ON COLUMN tenant_capacity.USAGE IS '使用量';
COMMENT ON COLUMN tenant_capacity.max_size IS '单个配置大小上限，单位为字节，0表示使用默认值';
COMMENT ON COLUMN tenant_capacity.max_aggr_count IS '聚合子配置最大个数';
COMMENT ON COLUMN tenant_capacity.max_aggr_size IS '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值';
COMMENT ON COLUMN tenant_capacity.max_history_count IS '最大变更历史数量';
COMMENT ON COLUMN tenant_capacity.gmt_create IS '创建时间';
COMMENT ON COLUMN tenant_capacity.gmt_modified IS '修改时间';
ALTER TABLE tenant_capacity ADD CONSTRAINT pk_tenant_capacity PRIMARY KEY ( ID ) ENABLE VALIDATE;
ALTER TABLE tenant_capacity ADD CONSTRAINT uk_tenant_id UNIQUE ( tenant_id ) ENABLE VALIDATE;
CREATE TABLE tenant_info (
	ID BIGINT NOT NULL AUTO_INCREMENT,
	kp VARCHAR ( 128 ) NOT NULL,
	tenant_id VARCHAR ( 128 ) DEFAULT '',
	tenant_name VARCHAR ( 128 ) DEFAULT '',
	tenant_desc VARCHAR ( 256 ) DEFAULT NULL,
	create_source VARCHAR ( 32 ) DEFAULT NULL,
	gmt_create BIGINT NOT NULL,
	gmt_modified BIGINT NOT NULL 
);
COMMENT ON TABLE tenant_info IS 'tenant_info';
COMMENT ON COLUMN tenant_info.gmt_create IS '创建时间';
COMMENT ON COLUMN tenant_info.gmt_modified IS '修改时间';
ALTER TABLE tenant_info ADD CONSTRAINT pk_tenant_info PRIMARY KEY ( ID ) ENABLE VALIDATE;
ALTER TABLE tenant_info ADD CONSTRAINT uk_tenant_info_kptenantid UNIQUE ( kp, tenant_id ) ENABLE VALIDATE;
CREATE INDEX idx_tenant_id_2 ON tenant_info USING BTREE ( tenant_id ) TABLESPACE sys_default;
INSERT INTO tenant_info ( ID, kp, tenant_id, tenant_name, tenant_desc, create_source, gmt_create, gmt_modified )
VALUES
	( 1, '1', 'dev', 'dev', '开发环境', NULL, 1641741270448, 1641741287236 ),
	( 2, '1', 'prod', 'prod', '生产环境', NULL, 1641741270448, 1641741287236 ),
	( 3, '1', 'test', 'test', '测试环境', NULL, 1641741270448, 1641741287236 );
```

正常情况会生成如下库和表单

![nacos数据库表](./images/nacos-install-6.avif)

#### 第七步：编写docker-compose.yml文件

这个配置文件放哪儿都可以，笔者放在/home/nacos下，配置内容如下

```yaml
services:
  nacos:
    image: nacos/nacos-server:latest
    container_name: nacos
    environment:
      MODE: standalone
      JVM_XMS: 512m
      JVM_XMX: 512m
      JVM_XMN: 256m
      DB_POOL_CONFIG_DRIVERCLASSNAME: com.kingbase8.Driver
    volumes:
      - /data/nacos/libs/kingbase8-8.6.0.jar:/home/nacos/plugins/kingbase8-8.6.0.jar
      - /data/nacos/conf/application.properties:/home/nacos/conf/application.properties
      - /data/nacos/logs/:/home/nacos/logs
    privileged: true
    restart: always
    network_mode: "host"
```

#### 第八步：启动Nacos容器并访问

```bash
# 【需要修改】进入刚才编写好的docker-compose.yml所在目录
cd /home/nacos
# 启动！
docker-compose -f up docker-compose.yml up -d
```

接着直接访问服务器ip的8848端口即可打开nacos管理页，首次登录会要求设置密码

![设置nacos密码](./images/nacos-install-7.avif)

![nacos登录页](./images/nacos-install-8.avif)

完成以上步骤便大功告成