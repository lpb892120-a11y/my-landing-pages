# 八戒机场官网 (bajiejichang.lat) 落地页项目

本项目为 **八戒机场官网** 专属定制的高性能、现代浅色系、极速 SEO 友好的静态落地页系统。内置 12 篇长篇（每篇约 2000 字）知识库与教程文章、规范的网站地图、robots.txt 以及 IndexNow 主动索引提交流程。

---

## 📁 目录文件清单

- `index.html`：网站核心落地页（包含 Hero 首屏、核心优势、套餐价格、用户评价、知识库教程展示、FAQ 手风琴、Footer 及悬浮按钮）
- `sitemap.xml`：符合 Sitemaps.org 规范的 XML 网站地图，包含全站 13 个页面
- `robots.txt`：搜索引擎抓取规则文件，已关联 `sitemap.xml`
- `8f2c7a916e3b4d5a9c0d1e2f3a4b5c6d.txt`：IndexNow 域名归属验证 Key 文件
- `submit-indexnow.ps1`：PowerShell 批量向 IndexNow / Bing 提交全站 URL 的自动化推送脚本
- `start-preview.ps1`：本地一键预览脚本（支持 Python HTTP Server 或默认浏览器预览）
- `assets/`：存放网站矢量图标（`logo.svg`）
- `css/style.css`：全站现代浅色系主题样式表
- `js/main.js`：平滑滚动、菜单响应、手风琴切换、价格周期切换与 Canvas 微粒子动态点缀背景
- `posts/`：12 篇两千字深度 SEO 文章与教程

---

## 🚀 本地预览

在当前文件夹的终端（PowerShell）中执行：
```powershell
.\start-preview.ps1
```
或者直接双击打开 `index.html` 即可在任意浏览器中浏览。

---

## 🌐 部署与上线指引

纯静态页面架构，无需任何复杂的后端运行环境，支持秒级部署至任意平台：

### 推荐部署方案：
1. **Cloudflare Pages（首选，免费且自带全球 CDN 与 SSL 证书）：**
   - 将本文件夹直接推送到 GitHub 仓库；
   - 登录 Cloudflare 控制台，进入 **Workers & Pages** -> **Create application** -> **Pages**；
   - 绑定仓库，构建设置留空，直接点击 **Deploy**；
   - 在 Custom Domains 中绑定您的域名 `bajiejichang.lat`。

2. **Nginx / 宝塔面板 / 腾讯云 / 阿里云：**
   - 将本文件夹内的所有文件上传至 Web 根目录（如 `/www/wwwroot/bajiejichang.lat/`）；
   - 确保启用 HTTPS 强制跳转。

---

## 🔍 SEO 与 IndexNow 使用建议

1. **域名解析生效后提交 IndexNow：**
   当 `https://bajiejichang.lat` 解析并开通 SSL 正常访问后，在终端中执行：
   ```powershell
   .\submit-indexnow.ps1
   ```
   即可向 Bing、Yandex 等搜索引擎主动提交全站 URL，实现快速抓取与收录。

2. **Google Search Console 提交：**
   进入 Google Search Console，添加资源 `https://bajiejichang.lat/`，在“站点地图”处直接提交 `https://bajiejichang.lat/sitemap.xml`。

