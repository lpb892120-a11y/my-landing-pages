# ssrdog 官方品牌落地页与内容矩阵

> 专注于电竞级 IPLC 专线加速与流媒体/AI 解锁的高性能科学上网品牌官网

---

## 🌐 核心配置规范
- **品牌名称**：`ssrdog`（ssrdog 专线机场 / ssrdog 官网）
- **统一官网跳转链接**：`https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4`
- **正式站点域名**：`https://ssrdogjic.homes/`
- **设计风格**：现代暗光科技风 + 简洁专业中文教程风，全面适配移动端、平板与宽屏桌面

---

## 📁 网站架构明细

### 1. 核心导航与功能页面
- [index.html](file:///d:/桌面文件/落地页11.8/ssrdogjic.homes/index.html) - **品牌官网落地页**：
  - 顶部动态渐变公告条
  - 动态粒子连线星空 Canvas 背景
  - 实时延迟测速小组件 (Live Ping Status)
  - 核心优势 (IPLC专线/零日志/4K流媒体/全球BGP中继)
  - 阶梯式套餐价格（支持月付/年付 8折 交互切换）
  - 细分适合人群（外贸出海、AI开发者、追剧发烧友、科研学术、游戏玩家）
  - Clash / Clash Party 多平台交互式教程选项卡
  - 真实用户使用评价
  - 首页高频 FAQ 手风琴（含 FAQPage Schema）
  - 10 篇 SEO 深度技术文章展区
  - 行动召唤 CTA 与完整全景页脚
- [tutorials.html](file:///d:/桌面文件/落地页11.8/ssrdogjic.homes/tutorials.html) - **教程站总中心**：通用四步配置指引与多系统导航卡片。
- [articles.html](file:///d:/桌面文件/落地页11.8/ssrdogjic.homes/articles.html) - **文章站总中心**：10 篇深度 SEO 文章聚合，分类标签与摘要。
- [faq.html](file:///d:/桌面文件/落地页11.8/ssrdogjic.homes/faq.html) - **FAQ 独立问答站**：按新手入门、专线网络、套餐计费、排错急救四大类别归纳的问答库。

### 2. 独立全平台客户端教程
- [tutorial-windows.html](file:///d:/桌面文件/落地页11.8/ssrdogjic.homes/tutorial-windows.html) - Windows Clash Verge / Clash for Windows 配置教程
- [tutorial-mac.html](file:///d:/桌面文件/落地页11.8/ssrdogjic.homes/tutorial-mac.html) - macOS 苹果电脑配置教程 (支持 Apple Silicon M1-M4)
- [tutorial-ios.html](file:///d:/桌面文件/落地页11.8/ssrdogjic.homes/tutorial-ios.html) - iOS 苹果手机 Shadowrocket (小火箭) 扫码配置指南
- [tutorial-android.html](file:///d:/桌面文件/落地页11.8/ssrdogjic.homes/tutorial-android.html) - Android 安卓手机 Clash Meta 教程 (含分应用代理)
- [tutorial-clash-party.html](file:///d:/桌面文件/落地页11.8/ssrdogjic.homes/tutorial-clash-party.html) - 新一代现代化 Clash Party 专属实战教学

### 3. 10 篇 1800+ 字 SEO 深度技术文章 (`articles/`)
每篇文章均包含：独立标题、描述、H1/H2/H3 层级、要点速览 Callout、目录导读 TOC、横向对比表格、实操步骤卡片、相关阅读推荐、内部链接，以及**文末专属定制的 FAQ 手风琴**与对应 JSON-LD：
1. `clash-airport-recommendation-guide.html` - 2026年稳定Clash机场推荐指南
2. `cheap-reliable-airport-selection.html` - 便宜机场避坑全攻略
3. `clash-party-beginner-tutorial.html` - Clash Party 客户端新手完整配置教程
4. `foreign-trade-cross-border-airport.html` - 外贸出海与跨境电商独立站加速指南
5. `streaming-4k-netflix-airport.html` - 4K/8K超高清流媒体与ChatGPT解锁方案
6. `clash-node-subscription-troubleshooting.html` - Clash节点订阅更新失败与无法联网报错排查手册
7. `iplc-iepl-dedicated-line-airport.html` - 什么是IPLC/IEPL内网专线？
8. `mobile-pc-cross-platform-clash-guide.html` - Windows/Mac/iOS/Android 全平台客户端配置合集
9. `ai-tools-chatgpt-claude-airport-nodes.html` - 畅享ChatGPT、Claude与Midjourney：AI大模型安全机场指南
10. `clash-vs-traditional-vpn-comparison.html` - Clash机场与传统VPN有什么区别？

### 4. 搜索引擎优化 (SEO) 与结构化数据
- **站点地图**：`sitemap.xml`（遵循 Sitemaps.org 规范）及 `sitemap.html`（人类可视化地图）
- **搜索引擎爬虫协议**：`robots.txt`，已配置 Googlebot、Bingbot、Baiduspider 抓取规则
- **Canonical 规范标签**：全站所有 HTML 文件均具备绝对 URL 权威标签
- **Schema JSON-LD 结构化数据**：
  - `Organization` & `WebSite`（首页品牌与站点搜索）
  - `BreadcrumbList`（全站面包屑导航）
  - `Article`（文章元数据与发布机构）
  - `FAQPage`（首页、FAQ页与每篇技术文章底部的 FAQ 折叠块）
  - `HowTo`（各平台使用教程的步骤指引）
- **图片优化**：`images/` 目录下全部提供高清晰度矢量 SVG 插图与架构图，全站图片具备详尽相关度的 `alt` 描述文本

### 5. 法律合规页面
- `privacy.html` - 隐私政策 (严格遵守 No-Logs 规范声明)
- `terms.html` - 服务条款 (服务可用性与合规使用准则)
- `disclaimer.html` - 免责声明 (技术中立与第三方开源软件免责)

---

## 🎨 动态特效与交互亮点
- **Hero 背景粒子连线**：基于原生 HTML5 Canvas 编写的星座网络动态拓扑节点，随窗口尺寸自适应，性能极高。
- **专线低延迟仪表盘 (Live Ping Tester)**：动态呼吸灯展示香港 IPLC 14ms、日本 32ms、新加坡 38ms、美西 115ms。
- **价格周期切换**：月付 / 年付（8折特惠）一键平滑变价。
- **全平台教程选项卡**：无刷新即时切换 Clash Party、Windows、Mac、iOS、Android 步骤指引。
- **平滑手风琴折叠**：FAQ 优雅展开/收起动效。
- **阅读进度条**：长文页面顶部实时滚动百分比进度指示。
- **浮动返回顶部按钮**：页面滚动至 400px 后平滑淡入。
- **一键复制订阅与 Toast 提示**：友好的气泡通知交互。
