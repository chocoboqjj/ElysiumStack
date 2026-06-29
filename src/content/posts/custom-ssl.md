---
title: 自建CA证书与带CA的SSL自签证书
author: 梅莉
published: 2025-08-13 16:39:00
description: 使用OpenSSL自建CA并签发带CA的SSL自签证书，涵盖密钥生成、证书签发及域名绑定全流程
pinned: false
tags: [ssl,证书]
category: 技术
draft: false
image: ./images/custom-ssl.avif
---
## ①基本概念

#### **HTTP(Hypertext Transfer Protocol)**

-   **超文本传输协议**，使用该协议进行访问的数据是没有任何加密措施的，任何人都可以使用监听等手段窃取传输过程中的信息数据，因此是一种**不安全的传输协议**。
    

#### **HTTPS(Hypertext Transfer Protocol Secure)**

-   **超文本传输安全协议**，基于**HTTP**的基础之上结合了**SSL**与**TLS**协议，提供了加密通讯以及服务器身份鉴定的能力，是一种**安全的传输协议**。
    

#### **SSL(Secure Socket Layer)**

-   **安全套接层**，通俗点说就是数据加密，它的作用就是对服务器与客户端之间传输的数据流进行加密。
    

#### **SSL证书**

-   可以理解为服务器的“营业执照”，通常由**公认受信的互联网数字证书颁发机构**，也就是**CA(Certificate Authority)**，经过服务器身份验证后所签发的“营业执照”，即**SSL证书**
    

#### **域名**

-   可以理解为一个网站的标识符，访问一个网站需要知道对应服务器的IP地址，但是如果靠IP地址来记忆对应的网站着实有些麻烦，而域名的存在便是简化了这种访问成本，例如本站的域名是`elysium-stack.cn`，当你访问本站时你不需要知道本站的IP是什么，DNS服务器会自动将域名进行解析并找到对应的站点IP地址，从而进一步访问，**通常域名会与SSL证书进行绑定**。
    

## ②为什么要使用SSL证书

最根本的目的是**保护数据在传输过程中的安全！**如果你的系统要做**信息安全等级保护**（**等保测评**），那么就必须要使用基于**HTTPS**协议的安全连接。那么你可能发现了一个问题：

Q：如果我的系统部署在内网，_**CA**没办法验证我的服务器，那我不是就拿不到**公认CA**签发的**SSL证书**了吗？_

A：确实如此，但是我们可以**自建CA**同时**自己签发证书**

## **③什么是自签证书**

自签证书是**不受信任的CA**所签发的**SSL证书**，讲人话就是自己手搓的**SSL**证书，自签证书可以分为两种：

-   **带CA的自签证书**
    
    -   先手搓一个**CA**，然后再手搓一张**SSL证书**，同时使用自己的**CA**来进行证书的签发，便于管理与控制证书吊销等操作，一般会用这个（本文也将以此为例）。
        
-   **不带CA的自签证书**
    
    -   直接手搓一张**SSL证书**。
        

## **④创建CA证书与自签证书**

~~正片开始~~ 接下来笔者会详细说明如何创建自己的**CA**以及如何通过自己的**CA**来签发证书

-   前置条件：
    
    -   一台**linux**服务器或**mac**电脑
        
    -   **OpenSSL**库（笔者的版本是`3.0.13`）
        
    -   一个自定义的域名且**必须要满足域名的命名规则**
        

> 以下笔者会以test.study.cn域名为例

### 第一步：创建自定义CA密钥

在控制台中输入以下命令

```
# customCA这个名字可以自己改
openssl genrsa -des3 -out customCA.key 2048
```

接着会提示`Enter PEM pass phrase`与`Verifying - Enter PEM pass phrase`，创建密码同时会有二次确认，**记住这个密码，后面会用到！**

![创建CA密钥](./images/custom-ssl-1.avif)

然后在目录中会自动生成文件`customCA.key`

![CA密钥文件生成](./images/custom-ssl-2.avif)

### 第二步：根据CA密钥，创建CA证书

在控制台中输入以下命令

    # customCA.key是第一步中生成的，3650是证书的有效期（单位：天），那这里就是10年的有效期
    openssl req -x509 -new -nodes -key customCA.key -sha256 -days 3650 -out customCA.pem

接着会提示`Enter pass phrase for customCA.key`要求输入第一步中你创建的密码，输入即可

![填写CA证书信息](./images/custom-ssl-3.avif)

验证通过后需要填写关于**CA**的信息，来看一下都是什么意思：

|     |     |     |
| --- | --- | --- |
| 名称  | 填写内容 | 示例（说明） |
| Country Name (2 letter code) \[AU\] | 国家代码 | CN（中国） |
| State or Province Name (full name) \[Some-State\] | 省级名称 | Shanghai（上海） |
| Locality Name (eg, city) \[\] | 市级名称 | Shanghai（上海） |
| Organization Name (eg, company) \[Internet Widgits Pty Ltd\] | 组织名称 | StudyCA（根据实际修改） |
| Organizational Unit Name (eg, section) \[\] | 组织单位名称 | StudyCA（根据实际修改） |
| Common Name (e.g. server FQDN or YOUR name) \[\] | CA证书名称 | Study Cert（根据实际修改） |
| Email Address \[\] | 邮箱  | （根据实际填写） |

![CA证书信息填写完成](./images/custom-ssl-4.avif)

填写完成后，会在目录下生成pem格式的CA证书文件`customCA.pem`，但我们需要把它转成crt格式，输入以下命令

    # customCA.pem是刚才生成的pem格式证书
    openssl x509 -outform der -in customCA.pem -out customCA.crt

然后我们会得到一个crt格式的CA证书文件`customCA.crt`

![CA证书文件生成](./images/custom-ssl-5.avif)

### 第三步：创建用以生成域名证书的配置文件

输入以下命令（一行一行输入）

    cat >> study.ext <<EOF
    authorityKeyIdentifier=keyid,issuer
    basicConstraints=CA:FALSE
    keyUsage=digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
    subjectAltName=@alt_names
    [alt_names]
    # 注意这里test.study.cn是需要关联的域名，替换成你自己的即可
    DNS.1 = test.study.cn
    EOF

![创建ext配置文件](./images/custom-ssl-6.avif)

然后我们会得到一个`study.ext`的配置文件

![ext配置文件生成](./images/custom-ssl-7.avif)

### 第四步：创建域名证书密钥

输入以下命令

    # test.study.cn.csr和test.study.cn.csr.key是域名test.study.cn.csr的密钥
    openssl req -new -sha256 -nodes -out test.study.cn.csr -newkey rsa:2048 -keyout test.study.cn.csr.key

接着需要填写关于域名的信息，也还是先看一下都是什么意思：

|     |     |     |
| --- | --- | --- |
| 名称  | 填写内容 | 示例（说明） |
| Country Name (2 letter code) \[AU\] | 国家代码 | CN（中国） |
| State or Province Name (full name) \[Some-State\] | 省级名称 | Shanghai（上海） |
| Locality Name (eg, city) \[\] | 市级名称 | Shanghai（上海） |
| Organization Name (eg, company) \[Internet Widgits Pty Ltd\] | 组织名称 | Study（根据实际修改） |
| Organizational Unit Name (eg, section) \[\] | 组织单位名称 | Study（根据实际修改） |
| Common Name (e.g. server FQDN or YOUR name) \[\] | 域名  | test.study.cn（根据实际修改） |
| Email Address \[\] | 邮箱  | （根据实际填写） |
| A challenge password \[\] | 创建私钥保护密码 | （根据实际填写） |
| An optional company name \[\] | 额外公司名称 | （根据实际填写） |

![填写域名证书信息](./images/custom-ssl-8.avif)

### 第五步：根据【第一步的**CA密钥】**、【第二步的**CA证书】**、【第三步的**配置文件】**、【第四步**域名证书密钥】**生成**自签域名证书**

### 只需一行命令，如下：

    # 365是证书的有效期（单位：天），那这里就是1年的有效期
    openssl x509 -req -in test.study.cn.csr -CA customCA.pem -CAkey customCA.key -CAcreateserial -out test.study.cn.crt -days 365 -sha256 -extfile study.ext

提示需要输入【第一步的**CA**证书密码】，输入即可

![签发域名证书](./images/custom-ssl-9.avif)

完成后，我们就能得到自定义CA证书与域名test.study.cn的SSL自签证书

![CA证书与自签域名证书生成完成](./images/custom-ssl-10.avif)
