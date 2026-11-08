const fs = require('fs');
const path = require('path');

// 1. FAQ.html
const faqHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>常见问题FAQ - ssrdog 官方答疑中心 | Clash使用与节点疑问解答</title>
    <meta name="description" content="ssrdog 官方常见问题解答库，涵盖新手入门、Clash 与 Clash Party 客户端配置、IPLC专线原理、套餐选购、支付充值、流媒体解锁及故障排查等全方位疑问解答。">
    <meta name="keywords" content="Clash FAQ, 机场常见问题, ssrdog常见问题, 科学上网FAQ, 魔法梯子答疑, 便宜机场常见问题, 稳定节点问题">
    <link rel="canonical" href="https://ssrdogjic.homes/faq.html">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">

    <!-- Schema Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "什么是 Clash 机场？它是如何工作的？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Clash机场是指基于开源Clash内核协议提供节点订阅与分流规则服务的加速平台。通过在客户端导入服务商提供的订阅链接，系统能自动根据预设规则将海外受限流量引导至高速专线节点，国内流量保持直连不减速。"
          }
        },
        {
          "@type": "Question",
          "name": "ssrdog 机场安全吗？如何保障隐私？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ssrdog 极其注重用户隐私安全，严格执行零日志（No-Logs）政策，不记录任何用户的浏览历史、真实IP或DNS查询。数据全程采用高强度对称加密传输，服务器部署在隐私友好法域。"
          }
        },
        {
          "@type": "Question",
          "name": "什么是 IPLC 专线？它与普通公网节点相比有什么优势？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "IPLC 是运营商级点对点内网跨境光缆通道，不经过公网国际出口与 GFW 的物理审查，晚高峰零丢包、低延迟且在敏感时期永不掉线，是高质量翻墙的首选。"
          }
        },
        {
          "@type": "Question",
          "name": "购买后可以在哪些设备上使用？支持几台设备同时在线？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "支持 Windows、macOS、iOS(iPhone/iPad)、Android 手机平板及软路由等全平台。根据所选套餐，可支持 3 至 10 台设备同时并发在线。"
          }
        },
        {
          "@type": "Question",
          "name": "支持哪些支付方式？充值后多久到账？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "支持支付宝、微信支付、银联快捷以及 USDT 加密货币支付。通过第三方自动网关处理，支付成功后系统秒级自动开通套餐并生成订阅授权。"
          }
        },
        {
          "@type": "Question",
          "name": "如果遇到节点全部超时连接不上怎么办？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "请先校准本地系统时间确保时差不超过60秒；排查是否有杀毒软件占用 7890 端口；在后台确认套餐是否处于有效期内。若仍无法解决，可参考本站故障排查教程或联系 7x24 工单客服。"
          }
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
        "name": "常见问题 FAQ",
        "item": "https://ssrdogjic.homes/faq.html"
      }]
    }
    </script>
</head>
<body>
    <div class="top-notice-bar">
        ⚡ 2026节点架构已升级！全线解锁 ChatGPT / Claude 与 4K 流媒体，<a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">立即前往官网直达体验 &rarr;</a>
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
                <li><a href="faq.html" style="color:var(--primary-color);font-weight:700;">常见问题</a></li>
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
            <div class="section-header" style="text-align: center; max-width: 800px; margin: 0 auto;">
                <span class="ping-tag" style="background:#e0e7ff;color:#4338ca;font-weight:700;margin-bottom:12px;">💡 官方权威答疑库</span>
                <h1 style="font-size: 2.6rem; margin-bottom: 16px; font-weight: 800; color: #1e293b;">常见问题解答 (FAQ)</h1>
                <p style="font-size: 1.15rem; color: #64748b; line-height: 1.8;">分类归纳新手入门、节点使用、客户端配置、计费退订及排错核心技巧</p>
            </div>
        </div>
    </section>

    <!-- Main FAQ Content -->
    <section style="padding: 20px 0 80px; background: #ffffff;">
        <div class="container" style="max-width: 960px;">
            
            <!-- Category 1: 新手入门与基础概念 -->
            <div style="margin-bottom: 50px;">
                <h2 style="font-size: 1.7rem; color: #1e293b; margin-bottom: 25px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; display:flex; align-items:center; gap:10px;">
                    <span>🔰</span> 1. 新手入门与核心概念
                </h2>
                <div class="faq-list">
                    
                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>什么是 Clash 机场？如何开始使用？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>Clash 机场是专门提供高速代理节点订阅的服务商。使用流程仅需四步：<br>
                            1. 访问 <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">ssrdog 官网</a> 注册账号并选购套餐。<br>
                            2. 按照操作系统下载对应的客户端（如 Windows/Mac 推荐 Clash Party 或 Clash Verge，iOS 推荐 Shadowrocket，Android 推荐 Clash Meta）。<br>
                            3. 在用户后台复制订阅链接导入至客户端。<br>
                            4. 选择规则模式（Rule）并开启代理即可秒开外网。</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>为什么大家都推荐用“规则模式 (Rule)”而不是“全局模式 (Global)”？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>因为规则模式最智能、最省流量！它内置了精准的路由规则，访问百度、微信、淘宝等国内网站时自动走本地直连，不绕道国外；只有访问 Google、YouTube、GitHub、ChatGPT 等海外受限服务时才经由专线加速，两者互不影响。</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>ssrdog 机场安全吗？会不会泄露我的上网隐私？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>绝对安全！ssrdog 严格执行行业最高标准的零日志（No-Logs）政策，不记录任何访问历史和传输内容。所有通信均由军事级强加密协议保护，服务器位于海外隐私保护法区。</p>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Category 2: 节点与专线网络质量 -->
            <div style="margin-bottom: 50px;">
                <h2 style="font-size: 1.7rem; color: #1e293b; margin-bottom: 25px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; display:flex; align-items:center; gap:10px;">
                    <span>⚡</span> 2. 节点与专线网络质量
                </h2>
                <div class="faq-list">
                    
                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>什么是 IPLC / IEPL 专线？它比普通节点强在哪里？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>IPLC 是电信运营商提供的跨境点对点封闭式内网光纤，不经过公网国际公共出口与 GFW 防火墙审查。其优势是：晚高峰绝对零丢包、延迟低至极限（如深圳到香港仅 14ms），即使在敏感时期也 100% 稳定在线。</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>为什么播放 Netflix 提示只能看自制剧？ssrdog 如何解决？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>普通机场采用的是机房 IP，被流媒体数据库列入了黑名单。ssrdog 在海外节点部署了当地纯净原生住宅 IP，能够全区解锁 Netflix 非自制剧、Disney+ 以及 YouTube 4K/8K 超高清画质。</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>使用 ChatGPT / Claude 会弹出 Access Denied 报错吗？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>不会！ssrdog 专门调优了针对 OpenAI 与 Anthropic 的纯净反风控专线，无任何 Cloudflare 5秒盾阻拦，保障大语言模型交互流畅不掉线。</p>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Category 3: 账号、套餐与售后保障 -->
            <div style="margin-bottom: 50px;">
                <h2 style="font-size: 1.7rem; color: #1e293b; margin-bottom: 25px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; display:flex; align-items:center; gap:10px;">
                    <span>💳</span> 3. 账号、套餐与售后保障
                </h2>
                <div class="faq-list">
                    
                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>支持哪些付款方式？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>支持支付宝、微信支付、银联在线快捷支付以及 USDT (TRC-20) 加密货币支付。全程由合规第三方加密网关处理，安全秒级开通。</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>套餐月度流量用完了怎么办？中途能升级吗？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>如果流量用尽，可以在后台选购流量临时叠加包，或者直接在用户中心补差价升级至更高规格的套餐，即买即生效，未到期天数自动抵扣计算。</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>一个账号允许多少台设备同时在线？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>入门版支持 3 台设备，标准版支持 5 台设备，豪华旗舰版支持最高 10 台设备同时在线。一个订阅链接可自由导入到您所有的手机、电脑或平板中。</p>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Category 4: 客户端配置与排错急救 -->
            <div style="margin-bottom: 50px;">
                <h2 style="font-size: 1.7rem; color: #1e293b; margin-bottom: 25px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; display:flex; align-items:center; gap:10px;">
                    <span>🛠️</span> 4. 客户端配置与排错急救
                </h2>
                <div class="faq-list">
                    
                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>订阅更新提示 403 Forbidden 怎么回事？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>通常是因为套餐到期欠费或当月流量耗尽。请先登录 <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">官网后台</a> 检查账号状态，若正常可尝试重新复制最新订阅 URL 重新导入。</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>节点全部显示“Timeout 超时”或 0ms 怎么解决？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>90% 的原因是本地电脑系统时间不准！加密协议严格依赖时间戳，请在 Windows/Mac 设置中点击“立即同步时间”。此外检查杀毒软件是否拦截了代理内核进程。</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <div class="faq-question">
                            <h3>关掉代理后电脑打不开任何国内网页了怎么办？</h3>
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>这是因为关闭软件前未取消系统代理，导致残留了 127.0.0.1:7890 代理设置。打开 Windows“设置 &rarr; 网络和 Internet &rarr; 代理”，将“手动设置代理”开关关闭即可恢复。</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>

    <!-- Bottom CTA -->
    <section class="cta">
        <div class="container">
            <div class="cta-content" data-aos="zoom-in">
                <h2>还有其他疑问？立即联系 7x24 在线技术客服</h2>
                <p>无论任何网络疑难杂症，ssrdog 专业工程师团队竭诚为您排忧解难</p>
                <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-hero btn-primary" target="_blank" rel="noopener">立即前往官网咨询客服 &rarr;</a>
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

fs.writeFileSync(path.join(__dirname, 'faq.html'), faqHtml);
console.log('Created: faq.html');

// 2. privacy.html
const privacyHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>隐私政策 (Privacy Policy) - ssrdog 官方平台</title>
    <meta name="description" content="ssrdog 官方隐私政策，详细阐述我们如何秉持严格的零日志（No-Logs）原则保护用户数据安全与隐私权益。">
    <link rel="canonical" href="https://ssrdogjic.homes/privacy.html">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">
</head>
<body>
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
                <li><a href="tutorials.html">使用教程</a></li>
                <li><a href="articles.html">文章中心</a></li>
                <li><a href="faq.html">常见问题</a></li>
                <li><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener">立即使用</a></li>
            </ul>
        </div>
    </nav>

    <main class="article-page">
        <div class="container" style="max-width:900px;">
            <article class="article-body">
                <h1>隐私政策 (Privacy Policy)</h1>
                <p style="color:var(--text-light);margin-bottom:30px;">最后修订生效日期：2026年11月08日</p>

                <h2>一、前言与基本承诺</h2>
                <p>ssrdog（以下简称“我们”或“本平台”）深知个人隐私对用户的重要性。我们始终将用户的网络隐私与数据安全置于产品生命周期的第一位。本政策详细说明我们如何处理用户在访问官网（ssrdogjic.homes）及使用我们的全球网络专线加速服务时的数据流程。</p>

                <h2>二、严格执行“零日志政策 (No-Logs Policy)”</h2>
                <p><strong>我们郑重承诺并严格践行以下零日志规范：</strong></p>
                <ul>
                    <li><strong>绝对不记录访问日志：</strong>我们不监控、不记录、不留存您访问的任何具体网址、域名、请求数据包或在线活动。</li>
                    <li><strong>绝对不记录通信内容：</strong>所有流量通过高强度现代加密通道传输，我们既无能力也无意图查看或篡改您的通信数据。</li>
                    <li><strong>绝对不记录真实 IP 映射：</strong>我们的服务器运行在受保护的 RAM 内存系统中，不落盘保存用户的真实源 IP 地址与分配的目标 IP 之间的关联映射。</li>
                    <li><strong>绝对不进行数据商业转卖：</strong>我们绝不向任何第三方数据经纪人、广告商出售、共享或出租用户资料。</li>
                </ul>

                <h2>三、我们仅收集的基础账户运营信息</h2>
                <p>为维持账户正常登录与套餐计费，我们仅在最小必要限度内收集以下非敏感信息：</p>
                <ul>
                    <li><strong>注册邮箱地址：</strong>仅用于账号密码重置、订阅授权识别与重要节点维护通知。</li>
                    <li><strong>套餐与带宽用量统计：</strong>仅统计账号当月消耗的总体字节数（如已用 15GB / 300GB），用于套餐流量计费结算，不包含任何内容信息。</li>
                    <li><strong>支付交易凭据：</strong>支付过程由受监管的第三方合规加密网关处理，本平台服务器不会也不可能存储您的银行卡号或支付密码。</li>
                </ul>

                <h2>四、数据安全保护技术</h2>
                <p>我们采用当前业界最前沿的技术架构保护数据资产：管理后台强制开启 TLS 1.3 传输加密，多因素认证（2FA）守护，且全线服务器采用物理防火墙隔离与定期自动化漏洞渗透扫描。</p>

                <h2>五、政策变更与联络</h2>
                <p>如对本隐私政策有任何疑问或需要注销账户清除数据，欢迎通过官方唯一认证通道联系我们：<a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">ssrdog 客户服务支持中心</a>。</p>
            </article>
        </div>
    </main>

    <footer class="footer">
        <div class="container" style="text-align:center;">
            <p>&copy; 2026 ssrdog (ssrdogjic.homes). All rights reserved. | <a href="index.html" style="color:#6366f1;">返回官网首页</a></p>
        </div>
    </footer>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'privacy.html'), privacyHtml);
console.log('Created: privacy.html');

// 3. terms.html
const termsHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>服务条款 (Terms of Service) - ssrdog 官方平台</title>
    <meta name="description" content="ssrdog 官方服务条款，规定了使用 ssrdog 提供的网络专线加速与科学上网服务的合规准则、用户权利与责任规范。">
    <link rel="canonical" href="https://ssrdogjic.homes/terms.html">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">
</head>
<body>
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
                <li><a href="tutorials.html">使用教程</a></li>
                <li><a href="articles.html">文章中心</a></li>
                <li><a href="faq.html">常见问题</a></li>
                <li><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener">立即使用</a></li>
            </ul>
        </div>
    </nav>

    <main class="article-page">
        <div class="container" style="max-width:900px;">
            <article class="article-body">
                <h1>服务条款 (Terms of Service)</h1>
                <p style="color:var(--text-light);margin-bottom:30px;">最后修订生效日期：2026年11月08日</p>

                <h2>一、协议的接纳与适用</h2>
                <p>欢迎注册并使用 ssrdog 提供的网络专线加速服务。当您在官网注册账号、选购套餐或导入节点订阅时，即代表您已充分阅读并无条件接受本服务条款的全部约束。若您不同意本条款的任何内容，请立即停止使用本平台。</p>

                <h2>二、合理与合规使用规范 (Acceptable Use Policy)</h2>
                <p>ssrdog 服务仅供用户进行合法合规的学术研究、外贸跨境商务、软件开发及影音娱乐。<strong>严禁利用本平台服务从事以下任何违法活动：</strong></p>
                <ul>
                    <li>发起 DDoS / CC 网络拒绝服务攻击或端口暴力扫描；</li>
                    <li>传播散布网络病毒、木马蠕虫或进行钓鱼欺诈；</li>
                    <li>发送大批量未经许可的商业垃圾邮件（Spamming）；</li>
                    <li>使用 BT / PT 客户端通过直连节点高并发下载受版权保护的盗版资源（可能导致机房端口被封）；</li>
                    <li>任何破坏国家网络安全、侵害他人合法权益或违反所在国法律法规的恶意行为。</li>
                </ul>
                <p>一经发现违规行为，我们有权在不予提前通知的情况下永久封禁违规账号且不予退费。</p>

                <h2>三、服务可用性与服务级别协议 (SLA)</h2>
                <p>我们承诺通过 IPLC/BGP 双活内网架构尽最大商业努力维持 99.9% 的骨干网络连通率。但在以下不可抗力情况下，可能产生暂时性的维护波动：</p>
                <ul>
                    <li>海底物理光缆遭遇地震等不可抗力断裂导致的全球路由绕行；</li>
                    <li>运营商机房预先公告的电力升级或设备紧急扩容；</li>
                    <li>非本平台所能控制的本地运营商（如特定局域网）DNS 劫持。</li>
                </ul>

                <h2>四、退款与售后政策</h2>
                <p>我们对专线网络质量充满信心。针对首次购买月付套餐的新用户，若在购买后 24 小时内因技术原因无法使用且经客服排查未能解决，用户可申请全额退款。超出时限或已大额消耗流量的账号按协议计费标准执行。</p>
            </article>
        </div>
    </main>

    <footer class="footer">
        <div class="container" style="text-align:center;">
            <p>&copy; 2026 ssrdog (ssrdogjic.homes). All rights reserved. | <a href="index.html" style="color:#6366f1;">返回官网首页</a></p>
        </div>
    </footer>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'terms.html'), termsHtml);
console.log('Created: terms.html');

// 4. disclaimer.html
const disclaimerHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>免责声明 (Disclaimer) - ssrdog 官方平台</title>
    <meta name="description" content="ssrdog 官方免责声明，阐明技术中立性原则、合规使用提醒及第三方内容链接免责规范。">
    <link rel="canonical" href="https://ssrdogjic.homes/disclaimer.html">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">
</head>
<body>
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
                <li><a href="tutorials.html">使用教程</a></li>
                <li><a href="articles.html">文章中心</a></li>
                <li><a href="faq.html">常见问题</a></li>
                <li><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener">立即使用</a></li>
            </ul>
        </div>
    </nav>

    <main class="article-page">
        <div class="container" style="max-width:900px;">
            <article class="article-body">
                <h1>免责声明 (Disclaimer)</h1>
                <p style="color:var(--text-light);margin-bottom:30px;">最后更新：2026年11月08日</p>

                <h2>一、技术中立与非背书原则</h2>
                <p>ssrdog（ssrdogjic.homes）所提供的网络加速、中继节点与客户端配置教学均属于计算机网络通信技术的中立应用。本平台仅作为纯粹的数据管道中继服务提供商，我们对用户通过本服务访问、传输、下载或发布的任何第三方外部网站、信息、数据或言论不承担任何内容审查责任，亦不构成对任何第三方观点的背书或认可。</p>

                <h2>二、用户合规自律义务</h2>
                <p>全体用户在使用 ssrdog 提供的网络通道时，必须严格遵守其所在国家、地区以及服务器所在法域的法律法规。用户应自行对其使用网络过程中的全部操作行为承担直接及附带的法律后果。任何擅自利用本服务侵犯知识产权、传播非法有害信息或损害他人正当权益的行为，均与本平台无关。</p>

                <h2>三、第三方链接与客户端软件声明</h2>
                <p>本网站中引用的开源软件（包括但不限于 Clash、Clash Verge Rev、Clash Party、Shadowrocket 等）均属于其各自开发者所有的独立开源项目或商业软件。ssrdog 仅提供客观的技术配置指导，不对该等第三方软件本身的稳定性、功能完整性或未来版本更新承担法律保证。</p>
            </article>
        </div>
    </main>

    <footer class="footer">
        <div class="container" style="text-align:center;">
            <p>&copy; 2026 ssrdog (ssrdogjic.homes). All rights reserved. | <a href="index.html" style="color:#6366f1;">返回官网首页</a></p>
        </div>
    </footer>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'disclaimer.html'), disclaimerHtml);
console.log('Created: disclaimer.html');

// 5. sitemap.html (HTML Sitemap)
const sitemapHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网站地图 (HTML Sitemap) - ssrdog 官方站点索引</title>
    <meta name="description" content="ssrdog 官方站点地图索引，汇集全部核心页面、客户端教程、FAQ 常见问题与 10 篇 SEO 深度技术文章快速导航。">
    <link rel="canonical" href="https://ssrdogjic.homes/sitemap.html">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">
</head>
<body>
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
                <li><a href="tutorials.html">使用教程</a></li>
                <li><a href="articles.html">文章中心</a></li>
                <li><a href="faq.html">常见问题</a></li>
                <li><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener">立即使用</a></li>
            </ul>
        </div>
    </nav>

    <main class="article-page">
        <div class="container" style="max-width:960px;">
            <article class="article-body">
                <h1>ssrdog 网站全景地图 (Sitemap)</h1>
                <p style="color:var(--text-light);margin-bottom:30px;">快速索引 ssrdog 官网所有主要版块与深度教程资源：</p>

                <h2>一、官方核心板块</h2>
                <ul>
                    <li><a href="index.html" class="internal-link">ssrdog 官方首页 (品牌落地页)</a></li>
                    <li><a href="tutorials.html" class="internal-link">使用教程中心 (Tutorial Hub)</a></li>
                    <li><a href="articles.html" class="internal-link">文章与技术资讯中心 (Article Hub)</a></li>
                    <li><a href="faq.html" class="internal-link">常见问题解答库 (FAQ Center)</a></li>
                    <li><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener" class="internal-link">官网专属注册与订阅通道</a></li>
                </ul>

                <h2>二、全平台客户端实战教程</h2>
                <ul>
                    <li><a href="tutorial-windows.html" class="internal-link">Windows Clash 完整配置图文指南</a></li>
                    <li><a href="tutorial-mac.html" class="internal-link">macOS 苹果电脑 Clash Verge 配置教程</a></li>
                    <li><a href="tutorial-ios.html" class="internal-link">iOS 苹果手机 Shadowrocket 小火箭配置教程</a></li>
                    <li><a href="tutorial-android.html" class="internal-link">Android 安卓手机 Clash Meta 教程</a></li>
                    <li><a href="tutorial-clash-party.html" class="internal-link">Clash Party 新一代客户端上手全攻略</a></li>
                </ul>

                <h2>三、10 篇 SEO 深度技术文章</h2>
                <ol>
                    <li><a href="articles/clash-airport-recommendation-guide.html" class="internal-link">2026年稳定Clash机场推荐指南：如何挑选高速安全好用的科学上网节点？</a></li>
                    <li><a href="articles/cheap-reliable-airport-selection.html" class="internal-link">便宜机场避坑全攻略：低价高性价比科学上网魔法梯子深度评测</a></li>
                    <li><a href="articles/clash-party-beginner-tutorial.html" class="internal-link">Clash Party 客户端新手完整配置教程：现代化UI与节点订阅一键导入教学</a></li>
                    <li><a href="articles/foreign-trade-cross-border-airport.html" class="internal-link">2026外贸出海与跨境电商独立站加速指南：安全稳定不跳IP的科学上网机场方案</a></li>
                    <li><a href="articles/streaming-4k-netflix-airport.html" class="internal-link">4K/8K超高清流媒体与ChatGPT解锁方案：低延迟高带宽稳定节点推荐</a></li>
                    <li><a href="articles/clash-node-subscription-troubleshooting.html" class="internal-link">Clash节点订阅更新失败与无法联网常见报错排查解决全手册</a></li>
                    <li><a href="articles/iplc-iepl-dedicated-line-airport.html" class="internal-link">什么是IPLC/IEPL内网专线？为什么高端科学上网机场强烈推荐专线节点？</a></li>
                    <li><a href="articles/mobile-pc-cross-platform-clash-guide.html" class="internal-link">Windows/Mac/iOS/Android 全平台科学上网与魔法梯子客户端配置实战合集</a></li>
                    <li><a href="articles/ai-tools-chatgpt-claude-airport-nodes.html" class="internal-link">畅享ChatGPT、Claude与Midjourney：AI大模型开发者的安全机场选购与节点配置</a></li>
                    <li><a href="articles/clash-vs-traditional-vpn-comparison.html" class="internal-link">Clash机场与传统VPN有什么区别？科学上网速度、安全与分流机制深度对比</a></li>
                </ol>

                <h2>四、法律条款与合规声明</h2>
                <ul>
                    <li><a href="privacy.html" class="internal-link">隐私政策 (Privacy Policy)</a></li>
                    <li><a href="terms.html" class="internal-link">服务条款 (Terms of Service)</a></li>
                    <li><a href="disclaimer.html" class="internal-link">免责声明 (Disclaimer)</a></li>
                    <li><a href="sitemap.xml" target="_blank" class="internal-link">XML 站点地图 (供搜索引擎索引)</a></li>
                </ul>
            </article>
        </div>
    </main>

    <footer class="footer">
        <div class="container" style="text-align:center;">
            <p>&copy; 2026 ssrdog (ssrdogjic.homes). All rights reserved. | <a href="index.html" style="color:#6366f1;">返回官网首页</a></p>
        </div>
    </footer>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.html'), sitemapHtml);
console.log('Created: sitemap.html');

// 6. sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- 首页 -->
    <url>
        <loc>https://ssrdogjic.homes/</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>

    <!-- 教程中心与平台教程 -->
    <url>
        <loc>https://ssrdogjic.homes/tutorials.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/tutorial-windows.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/tutorial-mac.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/tutorial-ios.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/tutorial-android.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/tutorial-clash-party.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>

    <!-- 文章中心 -->
    <url>
        <loc>https://ssrdogjic.homes/articles.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>

    <!-- 10篇深度 SEO 文章 -->
    <url>
        <loc>https://ssrdogjic.homes/articles/clash-airport-recommendation-guide.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/articles/cheap-reliable-airport-selection.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/articles/clash-party-beginner-tutorial.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/articles/foreign-trade-cross-border-airport.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/articles/streaming-4k-netflix-airport.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/articles/clash-node-subscription-troubleshooting.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/articles/iplc-iepl-dedicated-line-airport.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/articles/mobile-pc-cross-platform-clash-guide.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/articles/ai-tools-chatgpt-claude-airport-nodes.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/articles/clash-vs-traditional-vpn-comparison.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- FAQ 常见问题 -->
    <url>
        <loc>https://ssrdogjic.homes/faq.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- 法律与合规页面 -->
    <url>
        <loc>https://ssrdogjic.homes/privacy.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/terms.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/disclaimer.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>https://ssrdogjic.homes/sitemap.html</loc>
        <lastmod>2026-11-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml);
console.log('Created: sitemap.xml');

// 7. robots.txt
const robotsTxt = `User-agent: *
Allow: /

# 阻断特定临时资源
Disallow: /temp/
Disallow: /admin/
Disallow: /api/

# 站点地图声明
Sitemap: https://ssrdogjic.homes/sitemap.xml

# 常见搜索引擎爬虫优化
User-agent: Googlebot
Allow: /
Crawl-delay: 0.5

User-agent: Bingbot
Allow: /
Crawl-delay: 0.8

User-agent: Baiduspider
Allow: /
Crawl-delay: 1
`;

fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt);
console.log('Created: robots.txt');
