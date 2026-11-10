const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://liuliangguangjc.sbs';
const TARGET_URL = 'https://jichang-go.org/go.php';

function getHeader(activeTab) {
  return `
  <header class="site-header">
    <div class="container header-inner">
      <a href="index.html" class="brand-logo">
        <img src="images/logo.svg" alt="流量光官网Logo" width="36" height="36" />
        <span>流量光官网</span>
        <span class="brand-badge">PRO</span>
      </a>
      <ul class="nav-menu">
        <li><a href="index.html" class="nav-link ${activeTab === 'home' ? 'active' : ''}">官网首页</a></li>
        <li><a href="tutorials.html" class="nav-link ${activeTab === 'tutorials' ? 'active' : ''}">使用教程</a></li>
        <li><a href="articles/index.html" class="nav-link ${activeTab === 'articles' ? 'active' : ''}">SEO文章库</a></li>
        <li><a href="faq.html" class="nav-link ${activeTab === 'faq' ? 'active' : ''}">常见问题</a></li>
        <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="nav-link" style="color: #38bdf8;">用户中心</a></li>
      </ul>
      <div class="nav-actions">
        <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="btn btn-primary">
          <span>进入流量光官网</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <button class="mobile-toggle" aria-label="展开导航菜单">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </header>`;
}

function getFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand-logo">
            <img src="images/logo.svg" alt="流量光Logo" width="32" height="32" />
            <span>流量光官网</span>
          </a>
          <p>流量光（Liuliangguang）专注于提供高速稳定、抗封锁且隐私安全的全球网络加速中继服务。全节点支持 Clash、Clash Party、Shadowrocket 等主流客户端，智能分流秒开 4K，助力跨境出海与科研办公。</p>
          <div style="margin-top: 1rem;">
            <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="btn btn-primary" style="padding: 8px 18px; font-size: 0.88rem;">获取专属高速节点</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>产品与服务</h4>
          <ul class="footer-links">
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">高速节点套餐</a></li>
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">企业跨境专线定制</a></li>
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">ChatGPT/AI 原生节点</a></li>
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">4K/8K 流媒体解锁节点</a></li>
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">最新节点状态监测</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>教程与支持</h4>
          <ul class="footer-links">
            <li><a href="tutorials.html">新手配置全套教程</a></li>
            <li><a href="articles/clash-party-tutorial.html">Clash Party 客户端教程</a></li>
            <li><a href="articles/mobile-clash-ios-android.html">iOS / 安卓配置指南</a></li>
            <li><a href="faq.html">常见问题知识库</a></li>
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">在线工单客服</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>网站导航与法规</h4>
          <ul class="footer-links">
            <li><a href="sitemap.xml">网站地图 (XML)</a></li>
            <li><a href="articles/index.html">文章专栏总览</a></li>
            <li><a href="privacy.html">隐私政策</a></li>
            <li><a href="terms.html">服务条款</a></li>
            <li><a href="disclaimer.html">免责声明</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>&copy; 2026 流量光官网 (Liuliangguang). 保留所有权利。全球分布式专线加速网络。</div>
        <div class="footer-legal-links">
          <a href="privacy.html">隐私权协议</a>
          <a href="terms.html">用户协议</a>
          <a href="disclaimer.html">合规免责声明</a>
        </div>
      </div>
    </div>
  </footer>
  
  <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="floating-cta" aria-label="立即前往流量光官网">
    <span>⚡ 立即获取高速稳定节点</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </a>`;
}

// 1. tutorials.html (独立教程站)
const tutorialsHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>流量光官网使用教程中心 - Windows/Mac/iOS/Android/软路由全平台配置指南</title>
  <meta name="description" content="流量光官网官方客户端配置与使用教程中心。详细提供 Clash Party、Clash Verge Rev、Shadowrocket (小火箭)、Loon、v2rayN 及 OpenWrt 路由器上一键导入订阅与智能分流的图文流程。">
  <meta name="keywords" content="Clash教程, Clash Party教程, 小火箭教程, Shadowrocket, 科学上网教程, 魔法梯子, 稳定节点, 流量光官网">
  <link rel="canonical" href="${DOMAIN}/tutorials.html">
  <link rel="icon" type="image/svg+xml" href="images/logo.svg">
  <link rel="stylesheet" href="css/style.css">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "官网首页", "item": "${DOMAIN}/" },
      { "@type": "ListItem", "position": 2, "name": "使用教程中心", "item": "${DOMAIN}/tutorials.html" }
    ]
  }
  </script>
</head>
<body>
  <div id="reading-progress"></div>
  <canvas id="bg-canvas"></canvas>

  ${getHeader('tutorials')}

  <main class="container" style="padding-top: 3.5rem; padding-bottom: 5rem;">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="index.html">官网首页</a>
      <span class="separator">/</span>
      <span style="color: #cbd5e1;">使用教程中心</span>
    </nav>

    <div class="section-header" style="margin-bottom: 3.5rem;">
      <span class="section-badge">TUTORIAL CENTER</span>
      <h1 class="section-title">全平台客户端极速上手指南</h1>
      <p class="section-subtitle">涵盖 Windows、macOS、iOS、Android 以及家用路由器，跟随教程 60 秒内畅享全球高速专线。</p>
    </div>

    <!-- 教程卡片流 -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2rem;">
      <!-- Windows / Mac: Clash Party -->
      <div class="feature-card" style="display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.2rem;">
          <div class="feature-icon" style="margin-bottom: 0;">💻</div>
          <div>
            <h2 style="font-size: 1.35rem; margin-bottom: 2px;">Clash Party (首选推荐)</h2>
            <span style="font-size: 0.8rem; color: #38bdf8;">Windows 10/11 · macOS · Android</span>
          </div>
        </div>
        <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">
          2026 年最新开源 Mihomo 内核全平台神器。内置现代美观 UI，原生支持 Hysteria2 与 Vless 协议，支持开箱即用的 TUN 虚拟网卡与自动测速自愈。
        </p>
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.88rem;">获取订阅链接</a>
          <a href="articles/clash-party-tutorial.html" class="read-more">图文详细步骤 →</a>
        </div>
      </div>

      <!-- iOS: Shadowrocket -->
      <div class="feature-card" style="display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.2rem;">
          <div class="feature-icon" style="margin-bottom: 0; background: rgba(99, 102, 241, 0.15); border-color: rgba(99, 102, 241, 0.3); color: #818cf8;">🚀</div>
          <div>
            <h2 style="font-size: 1.35rem; margin-bottom: 2px;">Shadowrocket (小火箭)</h2>
            <span style="font-size: 0.8rem; color: #818cf8;">iOS (iPhone / iPad)</span>
          </div>
        </div>
        <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">
          苹果生态最经典强大的轻量级代理工具。支持美区 App Store 一键下载，一键导入流量光聚合订阅，自动按规则分流，省电无感常驻后台。
        </p>
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.88rem;">一键导入小火箭</a>
          <a href="articles/mobile-clash-ios-android.html" class="read-more">iOS 配置详解 →</a>
        </div>
      </div>

      <!-- 开发者极客: Clash Verge Rev -->
      <div class="feature-card" style="display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.2rem;">
          <div class="feature-icon" style="margin-bottom: 0; background: rgba(236, 72, 153, 0.15); border-color: rgba(236, 72, 153, 0.3); color: #f472b6;">⚙️</div>
          <div>
            <h2 style="font-size: 1.35rem; margin-bottom: 2px;">Clash Verge Rev</h2>
            <span style="font-size: 0.8rem; color: #f472b6;">Windows · macOS (ARM/Intel) · Linux</span>
          </div>
        </div>
        <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">
          采用 Rust + Tauri 构建的高性能极客客户端。内存开销极小，具备强大的 Script / Merge 配置预处理能力，完美支持命令行终端代理转发。
        </p>
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.88rem;">获取订阅</a>
          <a href="articles/clash-verge-rev-clash-meta.html" class="read-more">极客进阶指南 →</a>
        </div>
      </div>

      <!-- 软路由 / 全屋加速: OpenWrt -->
      <div class="feature-card" style="display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.2rem;">
          <div class="feature-icon" style="margin-bottom: 0; background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.3); color: #34d399;">📡</div>
          <div>
            <h2 style="font-size: 1.35rem; margin-bottom: 2px;">OpenClash / PassWall</h2>
            <span style="font-size: 0.8rem; color: #34d399;">OpenWrt · iStoreOS · 软路由</span>
          </div>
        </div>
        <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">
          为客厅 Apple TV、PS5、Xbox 与全屋智能家居提供物理级透明网关加速。全屋设备连入 Wi-Fi 即可秒开 4K，彻底告别单机重复配置。
        </p>
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.88rem;">获取通用订阅</a>
          <a href="articles/gaming-streaming-speedup.html" class="read-more">软路由与主机加速 →</a>
        </div>
      </div>
    </div>

    <!-- 进阶使用建议 Callout -->
    <div class="callout-box tip" style="margin-top: 4rem;">
      <h3 style="font-size: 1.25rem; margin-bottom: 0.8rem;">💡 新手配置的三条铁律</h3>
      <ol style="margin-left: 1.2rem; line-height: 1.8; color: #cbd5e1;">
        <li><strong>务必选择“Rule (规则)”模式：</strong>千万不要误点“Global (全局)”，规则模式下访问国内微信、百度、B站完全不走节点、不扣流量，只有境外服务才走专线。</li>
        <li><strong>所有节点显示 Timeout 检查时间：</strong>Windows 用户请务必按 Win+I 确认系统时钟已与北京时间完全同步。</li>
        <li><strong>每隔一周更新一次订阅：</strong>服务商会定期对网络线路进行动态优化与测速扩容，定期更新订阅可确保始终享受最优路由。</li>
      </ol>
    </div>

    <div class="cta-banner" style="margin-top: 4rem;">
      <h2>遇到配置疑难？专业客服随时协助</h2>
      <p>流量光官网配备 7x24 小时技术工单服务，任何客户端使用与订阅导入问题，均有专业工程师协助排查！</p>
      <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="btn btn-glow-gold btn-lg">进入流量光官网获取支持</a>
    </div>
  </main>

  ${getFooter()}
  <script src="js/main.js"></script>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'tutorials.html'), tutorialsHtml, 'utf8');
console.log('Generated tutorials.html successfully!');

// 2. faq.html (独立 FAQ 知识库)
const allFaqs = [
  {
    cat: '基础入门',
    q: '什么是“机场”？为什么它比普通免费 VPN 更好用？',
    a: '在科学上网语境中，“机场”是指基于专用中继协议（如 Shadowsocks、Vless、Hysteria2）架构的分布式网络服务商。相比传统单点 VPN，机场拥有全球多入口 BGP 智能调度、海量专线中继节点和规则分流能力，不仅速度快数倍，而且不会影响国内本土软件的正常访问。'
  },
  {
    cat: '基础入门',
    q: '为什么说流量光官网是性价比最高的便宜安全机场？',
    a: '流量光打破了传统老牌专线机场动辄三四十元的高昂门槛，入门版低至 12.8 元/月即可享受全内网 IEPL 陆港专线与 4K 秒开。全线节点零超卖、零日志存储，兼顾极速与安全。'
  },
  {
    cat: '客户端配置',
    q: 'Clash Party 导入订阅后显示“Network Error”怎么排查？',
    a: '首先检查复制的订阅链接前后是否有误带的空格；其次检查本地网络 DNS 是否遭到运营商劫持，可尝试将电脑 DNS 改为 119.29.29.29 或 223.5.5.5；最后检查是否开启了其他第三方代理杀毒软件占用了 7890 端口。'
  },
  {
    cat: '客户端配置',
    q: 'TUN 模式和普通系统代理有什么区别？我平时应该开哪个？',
    a: '系统代理仅对遵循系统环境变量的浏览器和大部分普通软件生效；而 TUN 模式创建了虚拟网卡，会强制捕获整机全部 TCP/UDP 流量（包括 CMD 命令行、Python 终端、Steam 游戏、安卓模拟器等）。平时仅浏览网页只需开启系统代理，有代码开发或游戏需求时勾选 TUN 模式。'
  },
  {
    cat: '业务应用',
    q: '流量光节点能解锁哪些流媒体平台与 AI 服务？',
    a: '全节点标配解锁 YouTube 4K/8K、Netflix 全球片库、Disney+、HBO Max、Spotify、TikTok 等主流流媒体；同时专项节点原生解锁 ChatGPT-4o、Claude 3.5 Sonnet、Midjourney、Copilot 等 AI 生产力工具。'
  },
  {
    cat: '业务应用',
    q: '做外贸跨境电商（Amazon/TikTok/PayPal）如何防止店铺封号？',
    a: '多店铺运营切记“一店一独立环境一固定 IP”。推荐使用 AdsPower 等指纹浏览器，搭配流量光分配的纯净商用住宅 Socks5 专线节点，并强制关闭 WebRTC 探测，杜绝任何关联风险。'
  },
  {
    cat: '账号与计费',
    q: '购买后可以退款吗？流量用完后能单独加油吗？',
    a: '支持在用户中心随时补差价升杯更高规格套餐，或按需订购流量重置加油包，秒级实时到账无需变更客户端节点。'
  },
  {
    cat: '安全合规',
    q: '使用流量光官网会记录我的上网历史或下载记录吗？',
    a: '绝对不会。流量光全线边缘节点均运行在无盘纯内存（RAM）系统中，坚决奉行零日志承诺（No-Logs Policy），绝不记录用户的通信内容、目标网站或个人隐私。'
  }
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": allFaqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a
    }
  }))
};

const faqListHtml = allFaqs.map((faq, index) => `
  <div class="faq-item ${index === 0 ? 'active' : ''}">
    <button class="faq-question" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
      <span><span class="audience-tag" style="margin-right: 8px; margin-bottom: 0;">${faq.cat}</span> ${faq.q}</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div class="faq-answer" style="${index === 0 ? 'max-height: 250px;' : ''}">
      <p>${faq.a}</p>
    </div>
  </div>
`).join('\n');

const faqPageHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>常见问题知识库 (FAQ) - 流量光官网全方位技术解答</title>
  <meta name="description" content="流量光官网权威 FAQ 知识库。全面汇集关于 Clash 节点、Clash Party 教程、便宜机场避坑、流媒体与 ChatGPT 原生解锁以及网络隐私安全的高频疑问与技术解答。">
  <meta name="keywords" content="常见问题, FAQ, 机场常见问题, Clash报错排查, 科学上网, 稳定节点, 流量光官网">
  <link rel="canonical" href="${DOMAIN}/faq.html">
  <link rel="icon" type="image/svg+xml" href="images/logo.svg">
  <link rel="stylesheet" href="css/style.css">
  
  <script type="application/ld+json">
  ${JSON.stringify(faqStructuredData, null, 2)}
  </script>
</head>
<body>
  <div id="reading-progress"></div>
  <canvas id="bg-canvas"></canvas>

  ${getHeader('faq')}

  <main class="container" style="padding-top: 3.5rem; padding-bottom: 5rem;">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="index.html">官网首页</a>
      <span class="separator">/</span>
      <span style="color: #cbd5e1;">常见问题知识库</span>
    </nav>

    <div class="section-header" style="margin-bottom: 3.5rem;">
      <span class="section-badge">KNOWLEDGE BASE</span>
      <h1 class="section-title">常见问题与全方位解答 (FAQ)</h1>
      <p class="section-subtitle">整理自数万用户的真实使用反馈，涵盖网络原理、客户端报错、流媒体与隐私安全的方方面面。</p>
    </div>

    <div class="faq-list">
      ${faqListHtml}
    </div>

    <div class="cta-banner" style="margin-top: 4.5rem;">
      <h2>没有找到你想要的答案？</h2>
      <p>流量光官网技术支持团队随时为你守候。登录用户中心提交工单，5 分钟内获取专属排查指导！</p>
      <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="btn btn-glow-gold btn-lg">联系流量光在线客服</a>
    </div>
  </main>

  ${getFooter()}
  <script src="js/main.js"></script>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'faq.html'), faqPageHtml, 'utf8');
console.log('Generated faq.html successfully!');

// 3. privacy.html (隐私政策)
const privacyHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>隐私政策 - 流量光官网严格践行零日志准则</title>
  <meta name="description" content="流量光官网隐私保护政策声明。我们严格遵守全球前沿的数据隐私合规标准，坚决执行零日志（No-Logs）原则，绝不记录用户访问行为。">
  <link rel="canonical" href="${DOMAIN}/privacy.html">
  <link rel="icon" type="image/svg+xml" href="images/logo.svg">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="reading-progress"></div>
  <canvas id="bg-canvas"></canvas>
  ${getHeader()}

  <main class="container" style="padding-top: 3.5rem; padding-bottom: 5rem; max-width: 900px;">
    <nav class="breadcrumbs">
      <a href="index.html">官网首页</a>
      <span class="separator">/</span>
      <span style="color: #cbd5e1;">隐私政策</span>
    </nav>

    <h1 style="font-size: 2.4rem; margin-bottom: 1.5rem;">流量光官网隐私保护政策</h1>
    <p style="color: #94a3b8; margin-bottom: 2rem;">最后修订日期：2026年3月10日 · 实行版本：v3.2</p>

    <div class="article-content">
      <h2>1. 核心准则：严格的零日志（No-Logs）承诺</h2>
      <p>流量光（以下简称“本平台”）将保护用户的数字通信隐私置于首位。我们在技术架构层面坚决践行零日志存储原则：</p>
      <ul>
        <li>我们<strong>绝不记录</strong>您的网络浏览历史、目标访问 URL、明文通信内容或传输数据。</li>
        <li>我们<strong>绝不记录</strong>您在连接节点时分配的出口真实 IP 或地理定位信息。</li>
        <li>我们<strong>绝不记录</strong>您的 DNS 查询请求内容，全线解析均在纯内存中即时销毁。</li>
      </ul>

      <h2>2. 必要信息的收集范围</h2>
      <p>为维持账户正常登录与计费系统运转，我们仅收集以下极简必要信息：</p>
      <ul>
        <li><strong>账户凭据：</strong>您在注册时填写的电子邮箱地址及经过高强度单向哈希加盐加密的密码密文。</li>
        <li><strong>服务用量：</strong>您当前计费周期内已消耗的总流量字节数（仅作为计费扣减依据，不包含任何流量成分分析）。</li>
        <li><strong>并发连接数：</strong>当前同时在线的设备数量，用于防止套餐被非法滥用及盗刷。</li>
      </ul>

      <h2>3. 数据安全与物理基础设施防护</h2>
      <p>流量光全线骨干网络节点均部署在具备 ISO 27001 认证的一流国际数据中心。所有边缘网关服务器均运行于定制的无盘临时内存操作系统（Diskless RAM OS），每次服务器维护或重启时，内存数据将被即时清空，杜绝任何持久化物理数据留存。</p>

      <h2>4. 严禁滥用与合规界限</h2>
      <p>用户使用本平台加速服务必须严格遵守服务协议，严禁利用本平台从事任何网络攻击、DDoS 轰炸、发送垃圾邮件、传播非法侵权内容或黑客渗透行为。一旦系统自动检测到异常网络攻击报文，本平台有权立即封停违规账户。</p>

      <h2>5. 隐私政策的更新与联系</h2>
      <p>随着技术标准的演进与法规更新，本隐私条款可能会进行微调。任何变动将通过官方网站显著位置进行公示。如对隐私政策有任何疑问，请通过 <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">流量光官网在线工单系统</a> 联络我们的数据合规官。</p>
    </div>
  </main>

  ${getFooter()}
  <script src="js/main.js"></script>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'privacy.html'), privacyHtml, 'utf8');
console.log('Generated privacy.html successfully!');

// 4. terms.html (服务条款)
const termsHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>服务条款 - 流量光官网用户服务协议</title>
  <meta name="description" content="流量光官网服务条款（Terms of Service）。详细说明用户注册、套餐订购、服务使用规范与权益保障。">
  <link rel="canonical" href="${DOMAIN}/terms.html">
  <link rel="icon" type="image/svg+xml" href="images/logo.svg">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="reading-progress"></div>
  <canvas id="bg-canvas"></canvas>
  ${getHeader()}

  <main class="container" style="padding-top: 3.5rem; padding-bottom: 5rem; max-width: 900px;">
    <nav class="breadcrumbs">
      <a href="index.html">官网首页</a>
      <span class="separator">/</span>
      <span style="color: #cbd5e1;">服务条款</span>
    </nav>

    <h1 style="font-size: 2.4rem; margin-bottom: 1.5rem;">流量光官网服务条款 (Terms of Service)</h1>
    <p style="color: #94a3b8; margin-bottom: 2rem;">生效时间：2026年3月10日</p>

    <div class="article-content">
      <h2>1. 条款确认与协议接纳</h2>
      <p>当您访问、注册或购买<strong>流量光官网</strong>（以下简称“本平台”）提供的任何网络中继加速服务时，即表示您已阅读、完全理解并自愿受本服务条款的全部约束。若您不同意本条款的任何部分，请停止使用本服务。</p>

      <h2>2. 账户创建与安全责任</h2>
      <ul>
        <li>用户需提供真实有效的电子邮箱以确保能够接收服务通知与账单凭据。</li>
        <li>用户有责任妥善保管专属订阅链接与账户密码，严禁将个人订阅公开张贴于互联网公共论坛、网盘或社群。因用户自身泄露订阅造成的流量盗刷损失由用户自行承担。</li>
      </ul>

      <h2>3. 服务可用性与网络 SLA 保障</h2>
      <p>本平台致力于提供 99.9% 以上的高可用率连通保障。然而，国际互联网骨干光缆故障、自然灾害、不可抗力事件或上游电力机房突发维护可能造成短暂抖动。本平台运维团队将在发生此类事件时第一时间启动智能冗余备用路由。</p>

      <h2>4. 订购、计费与退款政策</h2>
      <p>套餐计费以周期预付费形式结算。购买后用户将即刻获得对应的带宽配额与高速节点访问权限。用户可随时在后台升杯补差价变更套餐。由于虚拟数字网络服务的即时交付与消耗特性，一经激活产生大额流量消耗后原则上不提供无理由退款，如遇持续技术不可用故障，请提交工单申请个案审查。</p>

      <h2>5. 协议终止与滥用处罚</h2>
      <p>若用户违反服务条款或利用节点从事危害网络安全的违法行径，本平台保留在不事先通知的情况下随时暂停或永久终止其账户服务的权利，且不退还任何剩余款项。</p>
    </div>
  </main>

  ${getFooter()}
  <script src="js/main.js"></script>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'terms.html'), termsHtml, 'utf8');
console.log('Generated terms.html successfully!');

// 5. disclaimer.html (免责声明)
const disclaimerHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>免责声明 - 流量光官网合规声明</title>
  <meta name="description" content="流量光官网法律与合规免责声明。本服务仅供合法的学术科研检索、跨境贸易协同、外贸商务交流与海外合法网络加速使用。">
  <link rel="canonical" href="${DOMAIN}/disclaimer.html">
  <link rel="icon" type="image/svg+xml" href="images/logo.svg">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="reading-progress"></div>
  <canvas id="bg-canvas"></canvas>
  ${getHeader()}

  <main class="container" style="padding-top: 3.5rem; padding-bottom: 5rem; max-width: 900px;">
    <nav class="breadcrumbs">
      <a href="index.html">官网首页</a>
      <span class="separator">/</span>
      <span style="color: #cbd5e1;">免责声明</span>
    </nav>

    <h1 style="font-size: 2.4rem; margin-bottom: 1.5rem;">流量光官网合规与免责声明</h1>
    <p style="color: #94a3b8; margin-bottom: 2rem;">发布日期：2026年3月10日</p>

    <div class="article-content">
      <h2>1. 服务定位与合法用途限定</h2>
      <p><strong>流量光官网</strong>（以下简称“本站”）所提供的网络中继、全球网络加速技术以及相关软件客户端教程，<strong>仅供用户用于正当、合法的日常学术研究、海外文献检索、国际贸易协同、跨境电商出海交流以及合法商业应用</strong>。</p>

      <h2>2. 用户行为责任承担</h2>
      <p>任何使用本站服务的单位或个人，必须严格遵守其所在国家及地区的法律法规。严禁利用本站技术从事任何违反国家安全、侵犯他人知识产权、网络黑客攻击、洗钱诈骗或传播违法不良信息的行为。用户对其使用本站服务产生的所有网络活动及后果承担全部法律责任，与本站无关。</p>

      <h2>3. 外部第三方信息与知识产权</h2>
      <p>本站所提及的第三方软件名称（包括但不限于 Clash、Clash Party、Shadowrocket、Mihomo、Loon、OpenClash 等）以及商标品牌（包括但不限于 Google、YouTube、Netflix、OpenAI、Anthropic 等）均为其各自合法所有者的知识产权，本站仅作事实性描述与技术评测引用，不代表本站与上述实体存在直接商业代理或从属关系。</p>

      <h2>4. 最终解释权</h2>
      <p>在法律允许的最大范围内，本声明的最终解释权归流量光网络技术实验室所有。</p>
    </div>
  </main>

  ${getFooter()}
  <script src="js/main.js"></script>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'disclaimer.html'), disclaimerHtml, 'utf8');
console.log('Generated disclaimer.html successfully!');

// 6. sitemap.xml (完整 XML 网站地图)
const sitemapPages = [
  { loc: `${DOMAIN}/`, priority: '1.0', changefreq: 'daily' },
  { loc: `${DOMAIN}/tutorials.html`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${DOMAIN}/articles/index.html`, priority: '0.9', changefreq: 'daily' },
  { loc: `${DOMAIN}/faq.html`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${DOMAIN}/privacy.html`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${DOMAIN}/terms.html`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${DOMAIN}/disclaimer.html`, priority: '0.5', changefreq: 'monthly' },
  // 10 篇 SEO 文章
  { loc: `${DOMAIN}/articles/clash-party-tutorial.html`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${DOMAIN}/articles/clash-nodes-best-practices.html`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${DOMAIN}/articles/gaming-streaming-speedup.html`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${DOMAIN}/articles/ai-workflow-acceleration.html`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${DOMAIN}/articles/cross-border-ecommerce.html`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${DOMAIN}/articles/airport-protocols-comparison.html`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${DOMAIN}/articles/clash-verge-rev-clash-meta.html`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${DOMAIN}/articles/mobile-clash-ios-android.html`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${DOMAIN}/articles/airport-security-privacy.html`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${DOMAIN}/articles/free-vs-paid-nodes.html`, priority: '0.85', changefreq: 'weekly' }
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPages.map(p => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>2026-03-10</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('Generated sitemap.xml successfully!');

// 7. robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;
fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt, 'utf8');
console.log('Generated robots.txt successfully!');
