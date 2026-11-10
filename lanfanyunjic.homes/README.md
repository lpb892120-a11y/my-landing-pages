# 蓝帆云机场官网 (lanfanyunjic.homes)

蓝帆云机场官方落地页，采用轻量趣味互动与浅色系现代设计风格，全站深度适配 SEO 优化、网站地图与 IndexNow 实时推送机制。

## 站点信息
- **网站名称**: 蓝帆云机场官网
- **绑定域名**: `lanfanyunjic.homes`
- **外部跳转链接**: `https://vipmjj01.jlyvipaff.com/#/?code=8YreAbFA`
- **线路架构**: 企业级 IPLC / IEPL 物理内网专线，晚高峰 4K/8K 秒开，全节点解锁 Netflix 与 ChatGPT

## 目录结构
```text
lanfanyunjic.homes/
├── index.html                                    # 官网主落地页 (含各个核心板块与平滑锚点导航)
├── robots.txt                                    # 搜索引擎爬虫协议文件
├── sitemap.xml                                   # XML 网站地图
├── 7c39e564d7824aa7b82f4510b6cefa81.txt         # IndexNow 密钥验证文件
├── submit-indexnow.js                            # IndexNow 批量推送工具 (Node.js)
├── favicon.svg                                   # SVG 品牌图标
├── site.webmanifest                              # Web App Manifest
├── nginx.conf                                    # Nginx 生产环境配置
├── Caddyfile                                     # Caddy 生产环境配置
├── generate-site.js                              # 站点与文章构建生成器
├── assets/
│   ├── css/
│   │   ├── style.css                             # 浅色系与微光动效样式
│   │   └── article.css                           # 知识库文章详情排版样式
│   └── js/
│       └── main.js                               # 交互逻辑、延迟仿真与滚动监听
└── articles/                                     # 12 篇 SEO 深度长文
    ├── tizi-tuijian.html                         # 梯子推荐
    ├── kexue-shangwang-zhinan.html               # 科学上网指南
    ├── tizi-kepu.html                            # 梯子科普
    ├── ai-gongju-shiyong-zhinan.html             # AI工具使用指南
    ├── clash-jiaocheng.html                      # Clash Verge / Mihomo 配置教程
    ├── shadowrocket-ios-jiaocheng.html           # iOS 小火箭配置教程
    ├── youxi-jiasu-zhinan.html                   # 游戏低延迟加速指南
    ├── liumeiti-jiesuo-zhinan.html               # 4K/8K 流媒体跨区解锁指南
    ├── iplc-zhuanxian-vs-bgp.html                # IPLC专线与普通BGP中继对比
    ├── sing-box-jiaocheng.html                   # Sing-box 通用客户端教程
    ├── waimao-kuajing-wangluo.html               # 外贸跨境电商防关联网络方案
    └── anquan-yinsi-fanghu.html                  # 梯子与机场安全防护手册
```

## IndexNow 实时推送
每次更新内容后，可直接在终端运行以下命令将全部 13 个 URL 推送给 Bing / Yandex 等搜索引擎：
```bash
node submit-indexnow.js
```

