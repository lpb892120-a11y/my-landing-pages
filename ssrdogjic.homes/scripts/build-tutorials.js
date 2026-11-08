const fs = require('fs');
const path = require('path');

// 1. Central tutorials.html
const tutorialsHubHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>教程中心 - ssrdog 官方 Clash / Clash Party 全平台使用配置指南</title>
    <meta name="description" content="ssrdog 官方教程站提供 Windows、macOS、iOS(小火箭)、Android 及 Clash Party 的从入门到精通完整配置教程，一键导入节点订阅，快速掌握科学上网与规则分流。">
    <meta name="keywords" content="Clash教程, Clash Party教程, 科学上网教程, 魔法梯子, Shadowrocket教程, Clash for Windows, Clash Meta, 稳定节点, 机场配置">
    <link rel="canonical" href="https://ssrdogjic.homes/tutorials.html">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">

    <!-- Schema Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "ssrdog 全平台 Clash / Clash Party 客户端科学上网配置指南",
      "description": "5步完成电脑与手机端科学上网节点订阅导入与规则分流配置",
      "step": [
        {
          "@type": "HowToStep",
          "name": "注册并订购套餐",
          "text": "在 ssrdog 官网完成账号注册并选购适合的专线套餐"
        },
        {
          "@type": "HowToStep",
          "name": "下载对应客户端",
          "text": "下载 Windows、Mac、iOS 或 Android 客户端"
        },
        {
          "@type": "HowToStep",
          "name": "一键导入订阅",
          "text": "在客户端配置界面粘贴订阅 URL 并下载全量节点"
        },
        {
          "@type": "HowToStep",
          "name": "选择分流模式与节点",
          "text": "勾选规则模式 (Rule)，挑选延迟最低的优质专线节点"
        },
        {
          "@type": "HowToStep",
          "name": "开启系统代理",
          "text": "打开 System Proxy 开关即可畅游全球互联网"
        }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": "https://ssrdogjic.homes/"
      }, {
        "@type": "ListItem",
        "position": 2,
        "name": "教程中心",
        "item": "https://ssrdogjic.homes/tutorials.html"
      }]
    }
    </script>
</head>
<body>
    <div class="top-notice-bar">
        ⚡ 2026节点架构已升级！全平台客户端完美支持一键快速导入，<a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">立即前往官网直达体验 &rarr;</a>
    </div>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <a href="index.html" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
                    <img src="images/logo.svg" alt="ssrdog机场Logo" class="logo">
                    <span class="brand-name">ssrdog</span>
                </a>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html">首页</a></li>
                <li><a href="index.html#features">核心优势</a></li>
                <li><a href="index.html#pricing">套餐价格</a></li>
                <li><a href="tutorials.html" style="color:var(--primary-color);font-weight:700;">使用教程</a></li>
                <li><a href="articles.html">文章中心</a></li>
                <li><a href="faq.html">常见问题</a></li>
                <li><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener">立即使用</a></li>
            </ul>
            <div class="mobile-menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Header Section -->
    <section style="padding: 120px 0 50px; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);">
        <div class="container">
            <div class="section-header" style="text-align: center; max-width: 850px; margin: 0 auto;">
                <span class="ping-tag" style="background:#dbeafe;color:#1d4ed8;font-weight:700;margin-bottom:12px;">🛠️ 官方新手上路中心</span>
                <h1 style="font-size: 2.6rem; margin-bottom: 16px; font-weight: 800; color: #1e293b;">客户端配置与使用教程中心</h1>
                <p style="font-size: 1.15rem; color: #64748b; line-height: 1.8;">全平台图文拆解、常见报错一键解决、视频级详尽步骤，帮您 3 分钟零门槛搞定科学上网</p>
            </div>
        </div>
    </section>

    <!-- Platform Cards Grid -->
    <section style="padding: 20px 0 60px;">
        <div class="container">
            <div class="tutorials-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px;">
                
                <!-- Windows -->
                <div class="tutorial-card" style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:30px;box-shadow:0 4px 15px rgba(0,0,0,0.04);transition:all 0.3s ease;">
                    <div class="tutorial-icon" style="width:60px;height:60px;background:#eff6ff;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
                        <img src="images/windows-icon.svg" alt="Windows系统图标" style="width:36px;height:36px;">
                    </div>
                    <h3 style="font-size:1.35rem;margin-bottom:10px;color:#1e293b;">Windows 客户端教程</h3>
                    <p style="color:#64748b;font-size:0.95rem;margin-bottom:20px;line-height:1.6;">适用于 Windows 10/11 系统的 Clash Verge Rev 与 Clash for Windows 安装配置图文指南。</p>
                    <a href="tutorial-windows.html" class="btn-secondary" style="display:inline-block;padding:8px 18px;border-radius:8px;font-weight:600;text-decoration:none;">查看 Windows 详细教程 &rarr;</a>
                </div>

                <!-- macOS -->
                <div class="tutorial-card" style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:30px;box-shadow:0 4px 15px rgba(0,0,0,0.04);transition:all 0.3s ease;">
                    <div class="tutorial-icon" style="width:60px;height:60px;background:#f8fafc;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
                        <img src="images/mac-icon.svg" alt="Mac系统图标" style="width:36px;height:36px;">
                    </div>
                    <h3 style="font-size:1.35rem;margin-bottom:10px;color:#1e293b;">macOS 苹果电脑教程</h3>
                    <p style="color:#64748b;font-size:0.95rem;margin-bottom:20px;line-height:1.6;">原生适配 Apple Silicon (M1/M2/M3/M4) 及 Intel 架构，手把手教你配置 Clash Verge Mac 版。</p>
                    <a href="tutorial-mac.html" class="btn-secondary" style="display:inline-block;padding:8px 18px;border-radius:8px;font-weight:600;text-decoration:none;">查看 macOS 详细教程 &rarr;</a>
                </div>

                <!-- iOS -->
                <div class="tutorial-card" style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:30px;box-shadow:0 4px 15px rgba(0,0,0,0.04);transition:all 0.3s ease;">
                    <div class="tutorial-icon" style="width:60px;height:60px;background:#f0fdf4;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
                        <img src="images/ios-icon.svg" alt="iOS苹果手机图标" style="width:36px;height:36px;">
                    </div>
                    <h3 style="font-size:1.35rem;margin-bottom:10px;color:#1e293b;">iOS 苹果手机教程</h3>
                    <p style="color:#64748b;font-size:0.95rem;margin-bottom:20px;line-height:1.6;">Shadowrocket (小火箭)、Stash 与 Loon 苹果手机端一键扫码导入与开箱即用教学。</p>
                    <a href="tutorial-ios.html" class="btn-secondary" style="display:inline-block;padding:8px 18px;border-radius:8px;font-weight:600;text-decoration:none;">查看 iOS 详细教程 &rarr;</a>
                </div>

                <!-- Android -->
                <div class="tutorial-card" style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:30px;box-shadow:0 4px 15px rgba(0,0,0,0.04);transition:all 0.3s ease;">
                    <div class="tutorial-icon" style="width:60px;height:60px;background:#fdf2f8;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
                        <img src="images/android-icon.svg" alt="Android系统图标" style="width:36px;height:36px;">
                    </div>
                    <h3 style="font-size:1.35rem;margin-bottom:10px;color:#1e293b;">Android 安卓手机教程</h3>
                    <p style="color:#64748b;font-size:0.95rem;margin-bottom:20px;line-height:1.6;">Clash Meta for Android (CMFA) 与 NekoBox 安装、URL订阅导入及分应用代理配置。</p>
                    <a href="tutorial-android.html" class="btn-secondary" style="display:inline-block;padding:8px 18px;border-radius:8px;font-weight:600;text-decoration:none;">查看 Android 详细教程 &rarr;</a>
                </div>

                <!-- Clash Party -->
                <div class="tutorial-card" style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:30px;box-shadow:0 4px 15px rgba(0,0,0,0.04);transition:all 0.3s ease;">
                    <div class="tutorial-icon" style="width:60px;height:60px;background:#faf5ff;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
                        <img src="images/clash-party-icon.svg" alt="Clash Party图标" style="width:36px;height:36px;">
                    </div>
                    <h3 style="font-size:1.35rem;margin-bottom:10px;color:#1e293b;">Clash Party 专属教程</h3>
                    <p style="color:#64748b;font-size:0.95rem;margin-bottom:20px;line-height:1.6;">新一代现代化极简界面客户端，支持全协议与智能策略组自动优选，新手强烈推荐！</p>
                    <a href="tutorial-clash-party.html" class="btn-secondary" style="display:inline-block;padding:8px 18px;border-radius:8px;font-weight:600;text-decoration:none;">查看 Clash Party 教程 &rarr;</a>
                </div>

                <!-- 故障排查手册 -->
                <div class="tutorial-card" style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:30px;box-shadow:0 4px 15px rgba(0,0,0,0.04);transition:all 0.3s ease;">
                    <div class="tutorial-icon" style="width:60px;height:60px;background:#fef3c7;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
                        <img src="images/icon-support.svg" alt="故障排查图标" style="width:36px;height:36px;">
                    </div>
                    <h3 style="font-size:1.35rem;margin-bottom:10px;color:#1e293b;">故障排查与报错急救</h3>
                    <p style="color:#64748b;font-size:0.95rem;margin-bottom:20px;line-height:1.6;">订阅更新403/500、节点Timeout超时、端口7890冲突、打开代理后国内断网排查全手册。</p>
                    <a href="articles/clash-node-subscription-troubleshooting.html" class="btn-secondary" style="display:inline-block;padding:8px 18px;border-radius:8px;font-weight:600;text-decoration:none;">查看故障排查手册 &rarr;</a>
                </div>

            </div>
        </div>
    </section>

    <!-- Interactive Universal 4-Step Guide Section -->
    <section style="padding: 60px 0; background: #f8fafc;">
        <div class="container" style="max-width:960px;">
            <div class="section-header" style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size:2.2rem;color:#1e293b;">四步通关：所有客户端通用配置法则</h2>
                <p style="color:#64748b;">万变不离其宗，无论使用哪个客户端，核心逻辑永远是这四步：</p>
            </div>

            <div class="step-card">
                <span class="step-number">1</span>
                <strong>步骤一：获取官网订阅链接</strong>
                <p>打开 <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">ssrdog 官网仪表盘</a>，登录您的账号并在“我的订阅”页面复制专属的通用订阅地址（以 https 开头的专用安全加密链接）。</p>
            </div>

            <div class="step-card">
                <span class="step-number">2</span>
                <strong>步骤二：粘贴至客户端配置 (Profiles)</strong>
                <p>打开已下载好的客户端，找到 <code>Profiles (配置/订阅)</code> 选项，将复制的链接粘贴到输入框中，点击 <strong>下载 (Download / 获取)</strong>。客户端将瞬间解析并拉取全量节点列表。</p>
            </div>

            <div class="step-card">
                <span class="step-number">3</span>
                <strong>步骤三：勾选“规则模式 (Rule)”</strong>
                <p>在客户端的模式选择中，务必选择 <strong>“规则模式 (Rule)”</strong>。此模式会自动将国内流量直连，海外受限流量通过 ssrdog 专线节点加速，做到国内国外两不误。</p>
            </div>

            <div class="step-card">
                <span class="step-number">4</span>
                <strong>步骤四：选择节点并打开系统代理开关</strong>
                <p>在 Proxies 面板中挑选一个延迟较低的节点（如香港 01 或日本 01），最后打开客户端主界面的 <strong>System Proxy (系统代理)</strong> 开关，即可顺利开启极速科学上网！</p>
            </div>
        </div>
    </section>

    <!-- Bottom CTA -->
    <section class="cta">
        <div class="container">
            <div class="cta-content" data-aos="zoom-in">
                <h2>准备好体验新一代高品质科学上网了吗？</h2>
                <p>加入数万用户的信赖之选，享受 4K 秒开、晚高峰不卡顿的极致 IPLC 专线服务</p>
                <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-hero btn-primary" target="_blank" rel="noopener">立即注册获取专属订阅 &rarr;</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>关于 ssrdog</h4>
                    <p>ssrdog 是业内领先的全球网络加速与科学上网服务商，专注为程序员、跨境出海、4K流媒体及外贸用户提供超低延迟的 IPLC 专线节点与全平台 Clash / Clash Party 客户端支持。</p>
                    <div class="social-links">
                        <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener" aria-label="Telegram"><img src="images/telegram-icon.svg" alt="Telegram客服通道"></a>
                        <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener" aria-label="Discord"><img src="images/discord-icon.svg" alt="Discord社区"></a>
                        <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener" aria-label="Twitter"><img src="images/twitter-icon.svg" alt="Twitter推特"></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>快速导航</h4>
                    <ul>
                        <li><a href="index.html#features">核心优势</a></li>
                        <li><a href="index.html#pricing">套餐价格</a></li>
                        <li><a href="tutorials.html">客户端配置教程</a></li>
                        <li><a href="articles.html">文章资讯中心</a></li>
                        <li><a href="faq.html">常见答疑FAQ</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>教程专区</h4>
                    <ul>
                        <li><a href="tutorial-windows.html">Windows Clash 教程</a></li>
                        <li><a href="tutorial-mac.html">macOS 客户端配置</a></li>
                        <li><a href="tutorial-ios.html">iOS 小火箭配置教程</a></li>
                        <li><a href="tutorial-android.html">Android 手机翻墙教程</a></li>
                        <li><a href="tutorial-clash-party.html">Clash Party 专属教学</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>法律条款与索引</h4>
                    <ul>
                        <li><a href="privacy.html">隐私政策 (Privacy)</a></li>
                        <li><a href="terms.html">服务条款 (Terms)</a></li>
                        <li><a href="disclaimer.html">免责声明 (Disclaimer)</a></li>
                        <li><a href="sitemap.html">HTML 网站地图</a></li>
                        <li><a href="sitemap.xml">XML 站点地图</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 ssrdog (ssrdogjic.homes). All rights reserved. | 官方官网跳转链接：<a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener" style="color:var(--primary-color);">点击直达 ssrdog 平台</a></p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'tutorials.html'), tutorialsHubHtml);
console.log('Created: tutorials.html');

// Helper to generate platform tutorial pages
function createPlatformPage(platform) {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${platform.title} - ssrdog 官方详细教程</title>
    <meta name="description" content="${platform.desc}">
    <meta name="keywords" content="${platform.keywords}">
    <link rel="canonical" href="https://ssrdogjic.homes/${platform.filename}">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "${platform.title}",
      "description": "${platform.desc}",
      "step": ${JSON.stringify(platform.schemaSteps, null, 2)}
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": "https://ssrdogjic.homes/"
      }, {
        "@type": "ListItem",
        "position": 2,
        "name": "教程中心",
        "item": "https://ssrdogjic.homes/tutorials.html"
      }, {
        "@type": "ListItem",
        "position": 3,
        "name": "${platform.title}"
      }]
    }
    </script>
</head>
<body>
    <div class="top-notice-bar">
        ⚡ 2026节点架构已升级！全平台客户端完美支持一键快速导入，<a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">立即前往官网直达体验 &rarr;</a>
    </div>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <a href="index.html" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
                    <img src="images/logo.svg" alt="ssrdog机场Logo" class="logo">
                    <span class="brand-name">ssrdog</span>
                </a>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html">首页</a></li>
                <li><a href="index.html#features">核心优势</a></li>
                <li><a href="index.html#pricing">套餐价格</a></li>
                <li><a href="tutorials.html">使用教程</a></li>
                <li><a href="articles.html">文章中心</a></li>
                <li><a href="faq.html">常见问题</a></li>
                <li><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener">立即使用</a></li>
            </ul>
            <div class="mobile-menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="article-page">
        <div class="container">
            <header class="article-header">
                <nav class="article-breadcrumb">
                    <a href="index.html">首页</a> &gt; 
                    <a href="tutorials.html">教程中心</a> &gt; 
                    <span>${platform.platformName} 教程</span>
                </nav>
                <h1>${platform.title}</h1>
                <div class="article-meta">
                    <span>📅 最后更新：2026-11-08</span>
                    <span>💻 适用平台：${platform.platformName}</span>
                    <span>⏱️ 阅读时长：约 6 分钟</span>
                    <span>🛡️ ssrdog 官方验证保障</span>
                </div>
                <div class="callout-box info" style="margin-top:20px;">
                    <div class="callout-title">💡 适用提示：</div>
                    <p>${platform.calloutNote}</p>
                </div>
            </header>

            <article class="article-body">
                ${platform.bodyHtml}

                <div class="article-cta">
                    <h3>🚀 马上获取 ssrdog 专属专线节点订阅</h3>
                    <p>超低延迟 IPLC 专线直连、全球 50+ 高速节点、4K 随拖秒开，新手 3 分钟即可配置完毕。</p>
                    <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener" style="display:inline-block;padding:12px 30px;background:#ffffff;color:#4f46e5;font-weight:700;border-radius:30px;text-decoration:none;">立即注册并开启加速 &rarr;</a>
                </div>

                <!-- FAQ Section -->
                <section class="article-faq">
                    <h2>❓ ${platform.platformName} 客户端常见疑问</h2>
                    <div class="faq-list">
                        ${platform.faqs.map(f => `
                            <div class="faq-item">
                                <div class="faq-question">
                                    <h3>${f.q}</h3>
                                    <span class="faq-toggle">+</span>
                                </div>
                                <div class="faq-answer">
                                    <p>${f.a}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </article>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>关于 ssrdog</h4>
                    <p>ssrdog 是业内领先的全球网络加速与科学上网服务商，专注为程序员、跨境出海、4K流媒体及外贸用户提供超低延迟的 IPLC 专线节点与全平台 Clash / Clash Party 客户端支持。</p>
                </div>
                <div class="footer-col">
                    <h4>快速导航</h4>
                    <ul>
                        <li><a href="index.html#features">核心优势</a></li>
                        <li><a href="index.html#pricing">套餐价格</a></li>
                        <li><a href="tutorials.html">客户端配置教程</a></li>
                        <li><a href="articles.html">文章资讯中心</a></li>
                        <li><a href="faq.html">常见答疑FAQ</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>教程专区</h4>
                    <ul>
                        <li><a href="tutorial-windows.html">Windows Clash 教程</a></li>
                        <li><a href="tutorial-mac.html">macOS 客户端配置</a></li>
                        <li><a href="tutorial-ios.html">iOS 小火箭配置教程</a></li>
                        <li><a href="tutorial-android.html">Android 手机翻墙教程</a></li>
                        <li><a href="tutorial-clash-party.html">Clash Party 专属教学</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>法律条款</h4>
                    <ul>
                        <li><a href="privacy.html">隐私政策 (Privacy)</a></li>
                        <li><a href="terms.html">服务条款 (Terms)</a></li>
                        <li><a href="disclaimer.html">免责声明 (Disclaimer)</a></li>
                        <li><a href="sitemap.html">HTML 网站地图</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 ssrdog (ssrdogjic.homes). All rights reserved. | 官方官网跳转链接：<a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener" style="color:var(--primary-color);">点击直达 ssrdog 平台</a></p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>`;
}

// Data for each platform
const platforms = [
    {
        filename: 'tutorial-windows.html',
        platformName: 'Windows',
        title: 'Windows Clash教程：Clash Verge & Clash Party 完整配置图文指南',
        desc: '详细的 Windows 平台科学上网客户端使用教程，涵盖下载安装、订阅一键导入、规则分流模式选择及系统代理开启全流程。',
        keywords: 'Windows Clash教程, Clash for Windows, Clash Verge, Windows科学上网, 魔法梯子, Clash配置',
        calloutNote: '推荐使用 Windows 10 或 Windows 11 64位系统。本教程以当前最主流的 Clash Verge Rev 及 Clash Party 为基准编写。',
        schemaSteps: [
            { "@type": "HowToStep", "name": "注册并获取订阅", "text": "进入 ssrdog 官网后台复制通用订阅链接" },
            { "@type": "HowToStep", "name": "下载安装客户端", "text": "下载 Windows 版 Clash Verge 安装包并完成安装" },
            { "@type": "HowToStep", "name": "导入订阅配置", "text": "在订阅面板粘贴链接并点击下载" },
            { "@type": "HowToStep", "name": "开启系统代理", "text": "勾选规则模式并开启 System Proxy 系统代理" }
        ],
        bodyHtml: `
            <h2>一、客户端下载与安装</h2>
            <p>在 Windows 环境下，目前最受推崇的客户端是 <strong>Clash Verge Rev</strong> 或新一代极简美观的 <strong>Clash Party</strong>。它们采用全新开源内核，全面支持 VLESS、Trojan 等高抗干扰协议。</p>
            <p>下载 <code>.exe</code> 安装包后，双击运行并按照提示安装到默认目录即可。如遇 Windows Defender 提示拦截，点击“更多信息”并选择“仍要运行”。</p>

            <h2>二、导入 ssrdog 订阅节点</h2>
            <div class="step-card">
                <span class="step-number">1</span>
                <strong>复制订阅地址：</strong>登录 <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">ssrdog 用户中心</a>，在仪表盘主页找到“订阅管理”，点击“复制 Clash 订阅链接”。
            </div>
            <div class="step-card">
                <span class="step-number">2</span>
                <strong>添加配置源：</strong>打开客户端，进入左侧 <strong>Profiles (配置)</strong> 页面，在顶部 URL 框粘贴订阅链接，点击 <strong>Import (导入)</strong> 或 Download。
            </div>
            <div class="step-card">
                <span class="step-number">3</span>
                <strong>激活配置文件：</strong>在配置列表中选中刚导入的 <code>ssrdog专线</code>，右键或单击将其设为当前生效配置。
            </div>

            <h2>三、模式选择与开启代理</h2>
            <div class="step-card">
                <span class="step-number">4</span>
                <strong>挑选分流模式：</strong>切换至 <strong>Settings (设置)</strong>，代理模式选择 <strong>Rule (规则模式)</strong>。此模式会自动放行微信、百度等国内应用，海外流量走专线代理。
            </div>
            <div class="step-card">
                <span class="step-number">5</span>
                <strong>开启系统代理开关：</strong>在主界面开启 <strong>System Proxy (系统代理)</strong>。打开浏览器访问 YouTube 或 Google，网页瞬间秒开即代表配置成功！
            </div>
        `,
        faqs: [
            { q: 'Windows 开机能让 Clash 自动启动并开启代理吗？', a: '可以！在设置中开启“开机自启 (Start with Windows)”和“静默自启”，即可实现开机后全天候无感科学上网。' },
            { q: '为什么打开代理后，微信无法收发图片了？', a: '请检查是否误开启了“Global (全局模式)”。切换为“Rule (规则模式)”即可自动直连国内应用。' }
        ]
    },
    {
        filename: 'tutorial-mac.html',
        platformName: 'macOS',
        title: 'macOS Clash教程：苹果电脑 Clash Verge / ClashX Meta 配置指南',
        desc: '针对 Apple Silicon (M1/M2/M3/M4) 与 Intel 架构 Mac 电脑的科学上网配置指南，详解订阅导入与权限设置。',
        keywords: 'Mac Clash教程, macOS翻墙, ClashX, Clash Verge Mac, 苹果电脑科学上网, 魔法梯子',
        calloutNote: '原生支持 macOS Sonoma、Sequoia 及所有搭载 M 系列 Apple 芯片的 Mac 电脑，效能卓越，耗电极低。',
        schemaSteps: [
            { "@type": "HowToStep", "name": "获取订阅", "text": "在 ssrdog 后台复制订阅 URL" },
            { "@type": "HowToStep", "name": "下载安装 Mac 客户端", "text": "将 Clash Verge.dmg 拖入 Applications 应用程序文件夹" },
            { "@type": "HowToStep", "name": "导入并激活配置", "text": "在客户端配置界面下载订阅节点" },
            { "@type": "HowToStep", "name": "开启系统代理", "text": "在顶部菜单栏勾选规则模式并开启代理" }
        ],
        bodyHtml: `
            <h2>一、Mac 客户端安装与安全授权</h2>
            <p>下载对应芯片架构的 <code>.dmg</code> 镜像包（M1-M4 用户请下载 arm64 版本，Intel 用户请下载 x64 版本），双击打开并将软件图标拖入“Applications”文件夹。</p>
            <p>初次打开时如果系统提示“无法打开，因为 Apple 无法检查其是否包含恶意软件”，请打开 Mac <strong>系统设置 &rarr; 隐私与安全性</strong>，下滑点击“仍要打开”即可正常启动。</p>

            <h2>二、导入 ssrdog 专线订阅</h2>
            <p>登录 <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">ssrdog 仪表盘</a> 复制订阅链接。在 Mac 客户端的“Profiles (配置)”中粘贴并回车下载。下载完成后，所有香港、日本、新加坡、美国专线节点将整齐罗列。</p>

            <h2>三、状态栏控制与规则分流</h2>
            <p>Mac 客户端会在顶部状态栏常驻一个猫咪或飞机图标。点击状态栏图标，勾选 <strong>“规则模式 (Rule)”</strong>，然后点击 <strong>“设置为系统代理”</strong>。此时 Safari 或 Chrome 浏览器已全面具备科学上网能力。</p>
        `,
        faqs: [
            { q: 'Mac 电脑合上盖子休眠后，唤醒偶尔无法联网？', a: '在客户端设置中将内核切换为“Meta 内核”，并开启“休眠自动重启代理连接”，能够完美解决休眠唤醒后的套接字重连问题。' },
            { q: 'Mac 终端 (Terminal) 如何走代理？', a: '在设置中开启“Tun Mode (虚拟网卡模式)”并安装辅助驱动，整机终端命令（如 git push、brew update）将全自动走专线加速。' }
        ]
    },
    {
        filename: 'tutorial-ios.html',
        platformName: 'iOS',
        title: 'iOS 小火箭教程：Shadowrocket 苹果手机一键扫码科学上网指南',
        desc: '详尽的 iPhone 与 iPad 设备 Shadowrocket (小火箭) 翻墙配置教程，手把手教你扫码导入节点与添加本地 VPN 描述文件。',
        keywords: 'iOS小火箭教程, Shadowrocket教程, iPhone翻墙, iPad科学上网, 小火箭订阅, 魔法梯子',
        calloutNote: 'iPhone 用户需在 App Store 登录外区 Apple ID 下载正版 Shadowrocket 应用。',
        schemaSteps: [
            { "@type": "HowToStep", "name": "下载 Shadowrocket", "text": "通过美区 Apple ID 从 App Store 下载小火箭" },
            { "@type": "HowToStep", "name": "一键扫码导入", "text": "使用小火箭扫描 ssrdog 后台二维码完成导入" },
            { "@type": "HowToStep", "name": "授权本地 VPN", "text": "开启开关并在弹窗中允许添加 VPN 配置" }
        ],
        bodyHtml: `
            <h2>一、准备工作：下载正版 Shadowrocket</h2>
            <p>中国大陆 App Store 无法直接检索到 <strong>Shadowrocket (小火箭)</strong>。您只需在 App Store 登录一个美区或港区 Apple ID，搜索并获取正版小火箭应用（带有发射中的火箭图标）。</p>

            <h2>二、一键扫码瞬间导入 ssrdog 节点</h2>
            <div class="step-card">
                <span class="step-number">1</span>
                电脑或另一台设备打开 <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">ssrdog 官网后台</a>，进入“我的订阅”，点击“展示二维码”。
            </div>
            <div class="step-card">
                <span class="step-number">2</span>
                打开手机上的 Shadowrocket，点击屏幕左上角的 <strong>扫描二维码</strong> 图标，对准屏幕扫码。
            </div>
            <div class="step-card">
                <span class="step-number">3</span>
                软件会自动下载全部专线节点，并以分组形式展示在主页面。
            </div>

            <h2>三、开启代理与全局路由设置</h2>
            <p>在“全局路由”选项中，确认选择为 <strong>“配置 (Config)”</strong>（等同于电脑端的规则模式）。在节点列表中轻按勾选一个低延迟节点（如 <code>🇭🇰 香港 01 [IPLC]</code>），最后开启顶部的 <strong>未连接</strong> 开关。系统首次会弹出“Shadowrocket 想要添加 VPN 配置”，输入锁屏密码予以允许即可！</p>
        `,
        faqs: [
            { q: '小火箭在 iPhone 后台运行耗电严重吗？', a: '完全不会！Shadowrocket 经过了长达数年的极致优化，平均待机耗电量低于 2%，可放心全天候常驻后台运行。' },
            { q: '节点延迟怎么测？', a: '在主界面点击“连通性测试”，列表将实时显示每个节点的毫秒延迟。' }
        ]
    },
    {
        filename: 'tutorial-android.html',
        platformName: 'Android',
        title: 'Android 安卓教程：Clash Meta for Android 手机科学上网配置教程',
        desc: '华为、小米、OPPO、vivo 及三星等安卓手机快速配置 Clash Meta 的保姆级图文教程，支持分应用代理与一键订阅。',
        keywords: 'Android翻墙教程, 安卓Clash教程, Clash for Android, 华为手机翻墙, 小米手机科学上网, 魔法梯子',
        calloutNote: '适用于所有搭载 Android 9.0 及以上系统的手机、平板及车载中控系统。',
        schemaSteps: [
            { "@type": "HowToStep", "name": "下载客户端", "text": "下载 Clash Meta for Android 的 APK 并安装" },
            { "@type": "HowToStep", "name": "导入订阅 URL", "text": "新建配置粘贴 ssrdog 提供的订阅链接" },
            { "@type": "HowToStep", "name": "开启 VPN 代理", "text": "选择规则模式，点击开关开启本地 VPN 保护" }
        ],
        bodyHtml: `
            <h2>一、客户端 APK 下载与权限准备</h2>
            <p>安卓生态首推 <strong>Clash Meta for Android (CMFA)</strong>。前往 ssrdog 教程中心下载官方原版 APK 安装包。安装时如遇系统纯净模式或安全守护提示，选择“继续安装 / 信任此应用”。</p>

            <h2>二、导入 ssrdog 订阅配置</h2>
            <div class="step-card">
                <span class="step-number">1</span>
                打开手机浏览器登录 <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">ssrdog 用户中心</a>，点击“一键导入 Clash”；或者手动复制通用订阅链接。
            </div>
            <div class="step-card">
                <span class="step-number">2</span>
                打开 Clash 客户端，点击 <strong>“配置 (Configuration)” &rarr; 右上角 [+] &rarr; “URL”</strong>。
            </div>
            <div class="step-card">
                <span class="step-number">3</span>
                名称填写 <code>ssrdog专线</code>，URL 粘贴刚复制的链接，自动更新间隔设为 <code>1440分钟 (24小时)</code>，点击右上角保存图标开始下载。
            </div>

            <h2>三、启动连接与特色应用分流</h2>
            <p>回到首页，点击上方的灰白色大开关使其变为蓝色 <strong>“运行中”</strong>。此时手机通知栏出现小钥匙图标。进入“代理”页面挑选节点即可开始畅游。</p>
            <p><strong>进阶功能：分应用代理：</strong>点击“设置 &rarr; 网络 &rarr; 分应用代理”，可以自由勾选仅让海外软件（如 X/Twitter、YouTube、ChatGPT）走代理，其余国内 App 全部绕行，省电又省流量！</p>
        `,
        faqs: [
            { q: '安卓手机后台经常被杀进程怎么办？', a: '在手机多任务管理界面中，将 Clash 卡片向下滑动锁定，并在手机“电池管理”中将 Clash 的后台耗电管理设为“允许后台高耗电 / 无限制”。' },
            { q: '鸿蒙 HarmonyOS 可以用这个教程吗？', a: '完全通用！HarmonyOS 4.0 及以下版本完美兼容该 Android 客户端。' }
        ]
    },
    {
        filename: 'tutorial-clash-party.html',
        platformName: 'Clash Party',
        title: 'Clash Party 专属教程：新一代极简现代科学上网客户端上手全攻略',
        desc: '专为颜值党与技术极客打造的 Clash Party 深入使用教程，包含内核优化、Tun 虚拟网卡、自动延迟测速回退策略配置。',
        keywords: 'Clash Party教程, Clash Party客户端, 科学上网, 现代UI Clash, 魔法梯子, 稳定专线, 节点测速',
        calloutNote: 'Clash Party 拥有目前所有客户端中最现代优雅的 UI 交互与最激进的内核网络加速技术，新手与极客强烈推荐！',
        schemaSteps: [
            { "@type": "HowToStep", "name": "安装 Clash Party", "text": "下载解压最新安装包并启动软件" },
            { "@type": "HowToStep", "name": "添加 ssrdog 订阅", "text": "在 Profiles 页面输入专属订阅链接并下载" },
            { "@type": "HowToStep", "name": "一键激活并启动代理", "text": "勾选配置并在通用面板开启系统代理" }
        ],
        bodyHtml: `
            <h2>一、为什么 Clash Party 正在成为新一代标杆？</h2>
            <p>传统客户端界面老旧、选项复杂，很多新手望而却步。<strong>Clash Party</strong> 彻底颠覆了这一切：亚克力毛玻璃视觉设计、智能健康度检测、无损协议穿透，让科学上网变成一种优雅的享受。</p>

            <h2>二、从零开始三分钟极速上手</h2>
            <div class="step-card">
                <span class="step-number">1</span>
                <strong>获取您的授权订阅：</strong>进入 <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">ssrdog 官网仪表盘</a> 复制专属 Clash 订阅链接。
            </div>
            <div class="step-card">
                <span class="step-number">2</span>
                <strong>导入与并发测速：</strong>打开 Clash Party，点击左侧 <strong>Profiles</strong> 标签，将链接粘贴进 URL 输入栏点击 Download。下载完毕后切换到 <strong>Proxies</strong>，点击右上角闪电图标进行全节点低延迟并发测速。
            </div>
            <div class="step-card">
                <span class="step-number">3</span>
                <strong>开启系统代理：</strong>回到主面板，滑动开启 <strong>System Proxy</strong>，全部配置即刻大功告成！
            </div>

            <h2>三、高级进阶：电竞级 Tun Mode 虚拟网卡</h2>
            <p>对于需要玩国际服联机游戏或使用命令行工具的极客朋友，可以在 Clash Party 设置中开启 <strong>“Tun Mode (虚拟网卡模式)”</strong>。它能将整台电脑的所有底层 TCP/UDP 流量无死角接管，免去任何应用端代理配置，带来如同硬件软路由般的全局顺畅体验！</p>
        `,
        faqs: [
            { q: 'Clash Party 可以在 Mac 和 Windows 上通用吗？', a: '可以！Clash Party 提供全平台桌面端编译版本，操作逻辑与界面风格高度统一。' },
            { q: '如何设置节点自动故障转移？', a: '在代理页面中勾选“Auto / 自动优选”策略组，软件会在后台定时探测节点健康度，自动切换到当前最快且健康的节点。' }
        ]
    }
];

// Write all platform tutorials
for (const p of platforms) {
    fs.writeFileSync(path.join(__dirname, p.filename), createPlatformPage(p));
    console.log(`Created: ${p.filename}`);
}
