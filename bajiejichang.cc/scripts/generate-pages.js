const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Helper to write file ensuring dir exists
function writeFileSafe(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. Template for Tutorial Pages
function generateTutorialHtml({ slug, title, h1, lead, clientName, platformName, steps, faqs }) {
  const cleanUrl = `https://bajiejichang.cc/${slug}`;
  const stepsJson = steps.map((s, idx) => ({
    "@type": "HowToStep",
    "position": idx + 1,
    "name": s.title,
    "text": s.desc
  }));

  const stepsHtml = steps.map((s, idx) => `
    <h2>第${idx + 1}步：${s.title}</h2>
    <p>${s.desc}</p>
    ${s.details ? s.details : ''}
  `).join('\n');

  const faqsHtml = faqs.map(f => `
    <div class="faq-item">
      <div class="faq-question">
        <h3>${f.q}</h3>
        <span class="faq-toggle">+</span>
      </div>
      <div class="faq-answer">
        <p>${f.a}</p>
      </div>
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | 八戒机场</title>
    <meta name="description" content="${lead.replace(/"/g, '&quot;')}">
    <meta name="keywords" content="${platformName} Clash教程, ${clientName}, ${platformName}科学上网, ${platformName}翻墙教程, 八戒机场">
    <link rel="canonical" href="${cleanUrl}">
    <link rel="alternate" hreflang="zh-CN" href="${cleanUrl}">
    <link rel="alternate" hreflang="x-default" href="${cleanUrl}">
    
    <!-- GEO Tags -->
    <meta name="geo.region" content="CN">
    <meta name="geo.placename" content="China">
    <meta name="geo.position" content="39.9042;116.4074">
    <meta name="ICBM" content="39.9042, 116.4074">
    <meta http-equiv="content-language" content="zh-CN">

    <!-- Open Graph -->
    <meta property="og:site_name" content="八戒机场">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title} | 八戒机场">
    <meta property="og:description" content="${lead.replace(/"/g, '&quot;')}">
    <meta property="og:url" content="${cleanUrl}">
    <meta property="og:image" content="https://bajiejichang.cc/images/hero-dashboard.png">
    <meta property="og:locale" content="zh_CN">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} | 八戒机场">
    <meta name="twitter:description" content="${lead.replace(/"/g, '&quot;')}">
    <meta name="twitter:image" content="https://bajiejichang.cc/images/hero-dashboard.png">

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "${title}",
      "description": "${lead.replace(/"/g, '\\"')}",
      "step": ${JSON.stringify(stepsJson)}
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
        "item": "https://bajiejichang.cc/"
      }, {
        "@type": "ListItem",
        "position": 2,
        "name": "教程中心",
        "item": "https://bajiejichang.cc/articles"
      }, {
        "@type": "ListItem",
        "position": 3,
        "name": "${title}"
      }]
    }
    </script>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <img src="images/logo.png" alt="八戒机场Logo" class="logo">
                <span class="brand-name">八戒机场</span>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html">首页</a></li>
                <li><a href="index.html#features">核心优势</a></li>
                <li><a href="index.html#pricing">套餐价格</a></li>
                <li><a href="index.html#tutorials">使用教程</a></li>
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

    <article class="article-page">
        <div class="container">
            <div class="article-header">
                <div class="article-breadcrumb">
                    <a href="index.html">首页</a> / <a href="articles.html">教程指南</a> / ${platformName}使用教程
                </div>
                <h1>${h1}</h1>
                <div class="article-meta">
                    <span class="article-date">📅 2026年11月9日</span>
                    <span class="article-category">🏷️ ${platformName}教程</span>
                    <span class="article-read-time">⏱️ 阅读时间：8分钟</span>
                </div>
            </div>

            <div class="article-body">
                <p class="lead">${lead}</p>

                <h2>准备工作</h2>
                <p>在开始配置之前，请确保完成以下准备：</p>
                <ul>
                    <li>拥有 ${platformName} 联网设备（系统已更新至稳定版本）</li>
                    <li>已获取八戒机场订阅节点链接：<a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">前往八戒机场官网注册获取</a></li>
                    <li>确保本地网络连接通畅，未开启其他冲突的代理应用</li>
                </ul>

                ${stepsHtml}

                <h2>常见问题与解答 (FAQ)</h2>
                <div class="faq-list">
                    ${faqsHtml}
                </div>

                <div class="related-articles">
                    <h2>其他平台教程</h2>
                    <div class="related-grid">
                        <a href="tutorial-windows.html" class="related-card">
                            <h3>Windows使用教程</h3>
                            <p>Clash for Windows / Verge 完整配置指南</p>
                        </a>
                        <a href="tutorial-mac.html" class="related-card">
                            <h3>macOS使用教程</h3>
                            <p>ClashX 与 Clash Verge Mac 极速配置指南</p>
                        </a>
                        <a href="tutorial-ios.html" class="related-card">
                            <h3>iOS使用教程</h3>
                            <p>Shadowrocket 与 Stash 快捷配置指南</p>
                        </a>
                        <a href="tutorial-android.html" class="related-card">
                            <h3>Android使用教程</h3>
                            <p>Clash for Android 手机翻墙配置步骤</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </article>

    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>关于八戒机场</h4>
                    <p>八戒机场（扬帆云机场、ssrdog机场）提供稳定高速的国际网络中继与科学上网服务，覆盖全球优质IPLC专线节点。</p>
                </div>
                <div class="footer-col">
                    <h4>平台教程</h4>
                    <ul>
                        <li><a href="tutorial-windows.html">Windows教程</a></li>
                        <li><a href="tutorial-mac.html">macOS教程</a></li>
                        <li><a href="tutorial-ios.html">iOS教程</a></li>
                        <li><a href="tutorial-android.html">Android教程</a></li>
                        <li><a href="tutorial-clash-party.html">Clash Party教程</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>快速导航</h4>
                    <ul>
                        <li><a href="index.html">网站首页</a></li>
                        <li><a href="articles.html">文章中心</a></li>
                        <li><a href="knowledge-base.html">科学上网知识库</a></li>
                        <li><a href="faq.html">常见问题</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>法律与声明</h4>
                    <ul>
                        <li><a href="privacy.html">隐私政策</a></li>
                        <li><a href="terms.html">服务条款</a></li>
                        <li><a href="disclaimer.html">免责声明</a></li>
                        <li><a href="sitemap.html">网站地图</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 八戒机场 (bajiejichang.cc). All rights reserved. | 仅供学习与科研交流使用</p>
            </div>
        </div>
    </footer>
    <script src="js/main.js"></script>
</body>
</html>`;
}

// Generate missing tutorial files
const tutorialsToCreate = [
  {
    slug: 'tutorial-mac',
    title: 'macOS Clash教程：苹果电脑 Clash Verge / ClashX 配置指南',
    h1: 'macOS Clash完整配置使用教程',
    lead: '针对搭载 Apple Silicon (M1/M2/M3/M4) 与 Intel 芯片的 Mac 苹果电脑，详解 Clash Verge 和 ClashX 的安装、八戒机场订阅导入及全局规则设置。',
    clientName: 'Clash Verge / ClashX',
    platformName: 'macOS',
    steps: [
      {
        title: '下载并安装 Mac 客户端',
        desc: '推荐下载开源现代化的 Clash Verge Rev 或 ClashX Meta 安装包（.dmg 格式）。双击打开并将应用拖入 Applications 应用程序文件夹。',
        details: '<p>首次打开如果提示“未受信任的开发者”，请在 macOS 的“系统设置 -> 隐私与安全性”中点击“仍要打开”授权即可。</p>'
      },
      {
        title: '获取八戒机场订阅并导入',
        desc: '登录八戒机场用户后台，进入“仪表盘”或“我的订阅”，复制专属 Clash 订阅链接。',
        details: '<p>在客户端中打开“订阅/配置”界面，点击“新建”或直接粘贴订阅 URL，点击“保存并更新”，节点列表将自动下载完成。</p>'
      },
      {
        title: '选择高速节点并开启系统代理',
        desc: '在节点列表中选择延迟较低的香港、日本、新加坡或美国优质专线节点。勾选“系统代理 (System Proxy)”并选择“规则 (Rule) 模式”，即可开启无缝全球加速。'
      }
    ],
    faqs: [
      { q: 'M系列芯片 Mac 应该选哪个版本？', a: '请下载带有 arm64 或 Apple Silicon 标识的 dmg 安装包，原生运行效能更高且耗电极低。' },
      { q: '开代理后 Safari 无法打开网页怎么办？', a: '请检查是否已在客户端开启“系统代理”，或确认配置文件中的节点是否正常存活与延时通畅。' }
    ]
  },
  {
    slug: 'tutorial-ios',
    title: 'iOS 科学上网教程：Shadowrocket / Stash 苹果手机配置指南',
    h1: 'iOS 苹果手机科学上网配置教程',
    lead: '专为 iPhone 和 iPad 用户打造的科学上网配置指南，详细讲解 Shadowrocket（小火箭）和 Stash 的安装、八戒机场节点导入及开启动作。',
    clientName: 'Shadowrocket / Stash',
    platformName: 'iOS',
    steps: [
      {
        title: '获取海外 Apple ID 并安装客户端',
        desc: '由于中国大陆 App Store 策略限制，需使用美区或港区 Apple ID 登录 App Store 下载 Shadowrocket（小火箭）或 Stash。',
        details: '<p>请在 App Store 内切换账号下载，不要在系统 iCloud 中登录他人共享账号以确保设备安全。</p>'
      },
      {
        title: '一键导入八戒机场订阅节点',
        desc: '在 Safari 浏览器中登录八戒机场官网后台，点击“一键导入到 Shadowrocket”，应用将自动打开并加载全部节点列表。',
        details: '<p>也可以手动复制订阅链接，在小火箭首页右上角点击“+”，类型选择“Subscribe”，粘贴 URL 并完成保存。</p>'
      },
      {
        title: '连接节点并授权 VPN 配置',
        desc: '选择延迟较低的低延迟节点，开启顶部主开关。首次连接系统会弹出“添加 VPN 配置”窗口，输入锁屏密码允许即可畅通访问。'
      }
    ],
    faqs: [
      { q: '没有美区 Apple ID 怎么办？', a: '您可以自行注册一个免费美区 Apple ID，或者联系八戒机场在线客服获取下载支持指引。' },
      { q: '微信等国内应用会受影响吗？', a: '不会，默认全局路由选用“配置”或“规则”模式，国内流量全部直连，只有海外受限流量才走代理加速。' }
    ]
  },
  {
    slug: 'tutorial-android',
    title: 'Android 安卓手机 Clash 教程：Clash for Android 安装配置指南',
    h1: 'Android 安卓手机 Clash 配置使用教程',
    lead: '为华为、小米、OPPO、vivo、三星等安卓手机用户提供的 Clash for Android 完整安装与节点导入教程，轻松上手高速国际网络。',
    clientName: 'Clash for Android',
    platformName: 'Android',
    steps: [
      {
        title: '下载安装 Clash for Android APK',
        desc: '前往 GitHub 官方 Releases 仓库或八戒机场后台下载最新版本的 Clash for Android（.apk 安装包）。',
        details: '<p>安装过程中系统可能提示“未知来源应用”，点击允许安装即可正常完成部署。</p>'
      },
      {
        title: '导入八戒机场订阅配置',
        desc: '打开客户端，点击“配置”->“新配置”->“URL”，名称填入“八戒机场”，粘贴从官网复制的订阅 URL，设置自动更新为 1440 分钟，点击右上角保存并下载。'
      },
      {
        title: '启动代理并开启规则分流',
        desc: '返回主页，点击已激活的配置，点击“运行”，在系统弹出的“网络连接请求”中点击“确定”。进入“代理”页面切换优质节点。'
      }
    ],
    faqs: [
      { q: '安卓手机耗电会不会变快？', a: 'Clash 基于高效的 Go 语言底层开发，日常后台静默运行内存占用极低，对电池续航影响微乎其微。' },
      { q: '提示配置解析错误怎么解决？', a: '通常是订阅链接被输入法截断或机场维护，请在八戒机场后台重新复制完整链接重试。' }
    ]
  },
  {
    slug: 'tutorial-clash-party',
    title: 'Clash Party 教程：新一代极简 Clash 客户端配置指南',
    h1: 'Clash Party 客户端配置与使用教程',
    lead: 'Clash Party 作为全新的现代化跨平台客户端，具备极简的界面、闪电般的启动速度与智能路由能力。本文为您详解八戒机场在 Clash Party 上的完整配置步骤。',
    clientName: 'Clash Party',
    platformName: 'Clash Party',
    steps: [
      {
        title: '下载并启动 Clash Party',
        desc: '访问 Clash Party 官方主页或八戒机场客户端下载专区，根据您的操作系统下载对应的安装包并启动程序。'
      },
      {
        title: '添加八戒机场订阅源',
        desc: '在 Clash Party 侧边栏点击“Sub / 订阅”，点击“+ 添加订阅”，输入名称并粘贴八戒机场专属订阅链接，点击“拉取/同步”。'
      },
      {
        title: '启动核心代理与智能分流',
        desc: '拉取成功后，回到“Dashboard / 仪表盘”，开启代理总开关，选择“Smart / 规则”分流，即可享受全自动智能加速。'
      }
    ],
    faqs: [
      { q: 'Clash Party 相比经典版有什么优势？', a: '界面更现代扁平，内存占用更小，支持多内核无缝热切换和实时测速分组排序。' },
      { q: '如何查看当前节点延迟？', a: '在“节点”页面点击闪电测速图标，即可实时刷新所有专线服务器的往返延迟。' }
    ]
  },
  {
    slug: 'tutorial-router',
    title: '路由器科学上网教程：OpenWrt / 软路由 OpenClash 完整指南',
    h1: '路由器 OpenClash / 软路由全屋科学上网教程',
    lead: '让家庭或办公室的所有设备（包括手机、电脑、电视盒子、Switch、PS5 等）免客户端自动科学上网！详述 OpenWrt 软路由 OpenClash 的配置流程。',
    clientName: 'OpenClash',
    platformName: '路由器',
    steps: [
      {
        title: '登录路由器后台安装 OpenClash 插件',
        desc: '通过浏览器访问 OpenWrt 管理后台（通常为 192.168.1.1），确保系统已正确安装 luci-app-openclash 插件及对应架构的 clash 内核。'
      },
      {
        title: '创建配置文件并同步八戒机场节点',
        desc: '进入“服务 -> OpenClash -> 配置文件订阅”，点击“添加”，输入订阅名称与八戒机场订阅 URL，勾选“自动更新”，点击“保存配置”并“更新配置”。'
      },
      {
        title: '配置运行模式并启动全屋加速',
        desc: '在“插件设置”中选择“Fake-IP (TUN 模式)”，DNS 配置勾选本地分流，回到主运行界面点击“启动 OpenClash”。全屋所有设备即可即连即用。'
      }
    ],
    faqs: [
      { q: '电视盒子如何解锁 Netflix 4K？', a: '在 OpenClash 的代理策略组中，将“奈飞/流媒体”分组指定为支持解锁的香港或新加坡原生节点即可。' },
      { q: '国内游戏会有额外延迟吗？', a: '不会，OpenClash 采用国内 IP 白名单直连，国内游戏和各大网站均不走代理隧道。' }
    ]
  }
];

// Write tutorial files
tutorialsToCreate.forEach(t => {
  const filePath = path.join(rootDir, `${t.slug}.html`);
  writeFileSafe(filePath, generateTutorialHtml(t));
  console.log(`Generated tutorial: ${t.slug}.html`);
});

// 2. Generate missing articles in articles/ directory
const articlesToCreate = [
  {
    slug: 'clash-vs-vpn',
    title: 'Clash与传统VPN详细对比：原理、区别与2026选购指南',
    lead: 'Clash 与传统 VPN（如 ExpressVPN、NordVPN）有什么区别？本文深度解析两者的底层协议、分流机制、隐蔽性及速度表现，助您做出明智选择。',
    category: '对比分析',
    content: `
      <h2>一、底层原理与工作层级对比</h2>
      <p>传统 VPN 起源于企业级内网穿透加密需求，工作在网络层（OSI Layer 3），其原理是将整台设备的所有 IP 流量全盘打包并通过单一通道传输。而 Clash 属于现代高性能代理协议聚合分流工具，支持 Shadowsocks、VMess、VLESS、Trojan 等高隐蔽性混淆协议。</p>
      
      <h2>二、核心特性详细评测</h2>
      <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: var(--bg-light);">
          <th style="padding: 10px; border: 1px solid var(--border-color);">评测维度</th>
          <th style="padding: 10px; border: 1px solid var(--border-color);">八戒机场 (Clash协议)</th>
          <th style="padding: 10px; border: 1px solid var(--border-color);">传统单体 VPN</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid var(--border-color);">智能分流</td>
          <td style="padding: 10px; border: 1px solid var(--border-color);">原生支持分流，国内直连国外走代理</td>
          <td style="padding: 10px; border: 1px solid var(--border-color);">通常全盘全局，打开国内App极慢</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid var(--border-color);">专线加速</td>
          <td style="padding: 10px; border: 1px solid var(--border-color);">提供 IPLC/IEPL 内网专线，晚高峰不卡顿</td>
          <td style="padding: 10px; border: 1px solid var(--border-color);">公网直连服务器，高峰期封锁与丢包严重</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid var(--border-color);">流媒体解锁</td>
          <td style="padding: 10px; border: 1px solid var(--border-color);">提供原生住宅IP与流媒体专属解锁节点</td>
          <td style="padding: 10px; border: 1px solid var(--border-color);">机房IP已被各大流媒体大范围列入黑名单</td>
        </tr>
      </table>

      <h2>三、总结与选型建议</h2>
      <p>如果您身处中国大陆地区，日常需要查阅海外科研学术资料、流畅使用 ChatGPT/Claude 等 AI 工具、观看 Netflix/YouTube 4K 视频，并且不希望影响微信、网银等国内 App 的使用体验，<strong>八戒机场的 Clash 方案无疑是压倒性的优胜选择</strong>。</p>
    `
  },
  {
    slug: 'scientific-internet-guide',
    title: '2026年最新科学上网完全指南：新手从零开始安全翻墙',
    lead: '一份写给新手的全面科学上网指引，解析科学上网的核心概念、安全注意事项、常用客户端与节点选购技巧。',
    category: '新手指南',
    content: `
      <h2>一、什么是科学上网？</h2>
      <p>科学上网是指通过网络中继技术绕过特定网络限制，安全、合规地访问全球互联网公共知识资源的行为。无论是程序员查阅 GitHub、学术人员阅读国际论文，还是跨境贸易从业者管理海外店铺，科学上网已成为现代高效工作不可或缺的生产力工具。</p>
      
      <h2>二、科学上网的三要素</h2>
      <ol>
        <li><strong>可靠的服务提供商：</strong>选择具有多年运营经验、拥有优质专线资源的品牌（如八戒机场）。</li>
        <li><strong>优秀的客户端软件：</strong>跨平台支持丰富的 Clash、Shadowrocket、Sing-box 等现代化软件。</li>
        <li><strong>健康的上网习惯：</strong>不访问违规站点，保护好个人隐私与数字资产安全。</li>
      </ol>
    `
  },
  {
    slug: 'clash-party-tutorial',
    title: 'Clash Party 入门与高级技巧：打造极致流畅的代理体验',
    lead: 'Clash Party 客户端因其优雅的设计与强大的内核调度备受推崇。本文详解从配置导入到分流规则优化的全流程。',
    category: '使用教程',
    content: `
      <h2>一、为什么选择 Clash Party？</h2>
      <p>Clash Party 界面简洁轻量，针对多订阅管理和节点测速做了专门的优化，支持一键健康检查与故障自动转移。</p>
      <h2>二、快速开始指引</h2>
      <p>只需从八戒机场复制专属订阅链接，在 Clash Party 中添加并开启 System Proxy，即可享受全自动智能路由。</p>
    `
  },
  {
    slug: 'stable-airport-selection',
    title: '如何挑选稳定靠谱的机场？避坑与选购七大核心指标',
    lead: '市面上的机场眼花缭乱，如何避免遇到“跑路机场”或“高峰卡顿机场”？本文为您梳理挑选高稳定性机场的关键法则。',
    category: '选购指南',
    content: `
      <h2>一、挑选机场的七大黄金法则</h2>
      <ol>
        <li><strong>看线路类型：</strong>优先选择具备 IPLC / IEPL 专线中继的机场。</li>
        <li><strong>看运营时长：</strong>老牌机场经过多次特殊时期考验，稳定性远胜临时新站。</li>
        <li><strong>看节点倍率与冗余：</strong>是否有多地入口和多组备用节点。</li>
        <li><strong>看流媒体与 AI 解锁情况：</strong>是否定期维护流媒体解锁 IP 库。</li>
      </ol>
    `
  },
  {
    slug: 'netflix-unlock-guide',
    title: 'Netflix / Disney+ / YouTube Premium 4K 流媒体解锁全攻略',
    lead: '全面讲解如何利用八戒机场的高速节点解锁海外流媒体地域限制，畅享 4K HDR 超高清无缓冲观影体验。',
    category: '流媒体指南',
    content: `
      <h2>一、流媒体封锁的底层原理</h2>
      <p>Netflix 等流媒体平台通过识别访客 IP 地址所属的 ASN 和机房属性来封禁代理。八戒机场部署了专用的原生住宅 IP 解锁节点，全天候保障流媒体畅通播放。</p>
      <h2>二、推荐节点与设置</h2>
      <p>建议使用香港、新加坡、台湾、日本的专用流媒体标识节点，在客户端选择 Rule 规则模式即可。</p>
    `
  },
  {
    slug: 'clash-rules-configuration',
    title: 'Clash 规则配置进阶指南：自定义分流、防 DNS 泄漏与直连优化',
    lead: '深入浅出解析 Clash 配置文件结构，手把手教您定制专属的智能分流规则与 DNS 解析策略。',
    category: '进阶技术',
    content: `
      <h2>一、Clash 规则的核心工作原理</h2>
      <p>Clash 采用自顶向下的规则匹配机制。常见的规则类型包括 DOMAIN-SUFFIX、DOMAIN-KEYWORD、IP-CIDR 以及 GEOIP 等。</p>
      <h2>二、防 DNS 泄漏的最佳实践</h2>
      <p>建议在配置中开启 Fake-IP 模式，并将 Nameserver 设置为纯净可信的公共 DNS 解析服务。</p>
    `
  },
  {
    slug: 'vpn-vs-proxy-comparison',
    title: 'VPN、代理与机场的区别：全面通俗科普',
    lead: '什么是梯子？什么是机场？VPN 和代理到底有什么区别？一文带您理清网络代理技术的所有概念。',
    category: '科普知识',
    content: `
      <h2>一、核心概念通俗比喻</h2>
      <p>如果说互联网是一条公路，传统 VPN 就是一条封闭的地下隧道，所有车都必须开进去；而 Clash 机场则是一位智能导航员，根据你要去的目的地，让国内车走普通公路，国外车走特快专线。</p>
    `
  }
];

// Helper to write standard article in articles/
function generateArticleHtml({ slug, title, lead, category, content }) {
  const cleanUrl = `https://bajiejichang.cc/articles/${slug}`;
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | 八戒机场</title>
    <meta name="description" content="${lead.replace(/"/g, '&quot;')}">
    <meta name="keywords" content="${title}, 八戒机场, Clash教程, 科学上网, 翻墙">
    <link rel="canonical" href="${cleanUrl}">
    <link rel="alternate" hreflang="zh-CN" href="${cleanUrl}">
    <link rel="alternate" hreflang="x-default" href="${cleanUrl}">

    <!-- GEO Tags -->
    <meta name="geo.region" content="CN">
    <meta name="geo.placename" content="China">
    <meta name="geo.position" content="39.9042;116.4074">
    <meta name="ICBM" content="39.9042, 116.4074">
    <meta http-equiv="content-language" content="zh-CN">

    <!-- Open Graph -->
    <meta property="og:site_name" content="八戒机场">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title} | 八戒机场">
    <meta property="og:description" content="${lead.replace(/"/g, '&quot;')}">
    <meta property="og:url" content="${cleanUrl}">
    <meta property="og:image" content="https://bajiejichang.cc/images/hero-dashboard.png">
    <meta property="og:locale" content="zh_CN">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} | 八戒机场">
    <meta name="twitter:description" content="${lead.replace(/"/g, '&quot;')}">
    <meta name="twitter:image" content="https://bajiejichang.cc/images/hero-dashboard.png">

    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/article.css">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${title}",
      "description": "${lead.replace(/"/g, '\\"')}",
      "author": {
        "@type": "Organization",
        "name": "八戒机场技术团队"
      },
      "publisher": {
        "@type": "Organization",
        "name": "八戒机场",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bajiejichang.cc/images/logo.png"
        }
      },
      "datePublished": "2026-11-08",
      "dateModified": "2026-11-09",
      "mainEntityOfPage": "${cleanUrl}"
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
        "item": "https://bajiejichang.cc/"
      }, {
        "@type": "ListItem",
        "position": 2,
        "name": "文章中心",
        "item": "https://bajiejichang.cc/articles"
      }, {
        "@type": "ListItem",
        "position": 3,
        "name": "${title}"
      }]
    }
    </script>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <img src="../images/logo.png" alt="八戒机场Logo" class="logo">
                <span class="brand-name">八戒机场</span>
            </div>
            <ul class="nav-menu">
                <li><a href="../index.html">首页</a></li>
                <li><a href="../index.html#features">核心优势</a></li>
                <li><a href="../index.html#pricing">套餐价格</a></li>
                <li><a href="../index.html#tutorials">使用教程</a></li>
                <li><a href="../articles.html">文章中心</a></li>
                <li><a href="../faq.html">常见问题</a></li>
                <li><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener">立即使用</a></li>
            </ul>
        </div>
    </nav>

    <article class="article-page">
        <div class="container">
            <div class="article-header">
                <div class="article-breadcrumb">
                    <a href="../index.html">首页</a> / <a href="../articles.html">文章中心</a> / 正文
                </div>
                <h1>${title}</h1>
                <div class="article-meta">
                    <span class="article-date">📅 2026年11月9日</span>
                    <span class="article-category">🏷️ ${category}</span>
                    <span class="article-read-time">⏱️ 阅读时间：6分钟</span>
                </div>
            </div>

            <div class="article-body">
                <p class="lead">${lead}</p>
                ${content}
                
                <div style="background: var(--bg-light); padding: 25px; border-radius: 12px; margin: 40px 0; border-left: 4px solid var(--primary-color);">
                    <h3>💡 八戒机场服务推荐</h3>
                    <p>八戒机场（扬帆云/ssrdog品牌）提供全球超百条 IPLC/IEPL 专线，晚高峰速率无限制，全天候 4K 极速秒开。支持所有系统客户端一键配置。</p>
                    <p><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener" style="display:inline-block; margin-top:10px;">立即前往官网开启体验 &rarr;</a></p>
                </div>

                <div class="related-articles">
                    <h2>相关推荐阅读</h2>
                    <div class="related-grid">
                        <a href="clash-airport-recommendation-2024.html" class="related-card">
                            <h3>2024最新Clash机场推荐</h3>
                            <p>八戒机场全面评测与性能解析</p>
                        </a>
                        <a href="clash-complete-tutorial.html" class="related-card">
                            <h3>Clash完整使用教程</h3>
                            <p>从入门到精通详细配置步骤</p>
                        </a>
                        <a href="cheap-airport-recommendation.html" class="related-card">
                            <h3>便宜又好用的机场推荐</h3>
                            <p>高性价比科学上网方案优选</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </article>

    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>关于八戒机场</h4>
                    <p>八戒机场专注为全球华人提供稳定、高速、安全的网络中继与科学上网服务。</p>
                </div>
                <div class="footer-col">
                    <h4>平台教程</h4>
                    <ul>
                        <li><a href="../tutorial-windows.html">Windows教程</a></li>
                        <li><a href="../tutorial-mac.html">macOS教程</a></li>
                        <li><a href="../tutorial-ios.html">iOS教程</a></li>
                        <li><a href="../tutorial-android.html">Android教程</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>快速链接</h4>
                    <ul>
                        <li><a href="../index.html">网站首页</a></li>
                        <li><a href="../articles.html">文章中心</a></li>
                        <li><a href="../knowledge-base.html">知识库</a></li>
                        <li><a href="../faq.html">常见问题</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>法律与声明</h4>
                    <ul>
                        <li><a href="../privacy.html">隐私政策</a></li>
                        <li><a href="../terms.html">服务条款</a></li>
                        <li><a href="../disclaimer.html">免责声明</a></li>
                        <li><a href="../sitemap.html">网站地图</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 八戒机场 (bajiejichang.cc). All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

articlesToCreate.forEach(a => {
  const filePath = path.join(rootDir, 'articles', `${a.slug}.html`);
  writeFileSafe(filePath, generateArticleHtml(a));
  console.log(`Generated article: articles/${a.slug}.html`);
});

// 3. Generate missing articles in kb/ directory
const kbArticlesToCreate = [
  {
    slug: 'vpn-proxy-airport-explained',
    title: '什么是梯子？机场、VPN、代理全面科普与原理解析',
    lead: '详细解析梯子、机场、VPN、Shadowsocks、V2Ray、Trojan等科学上网术语的含义与本质区别，让您彻底看懂网络代理技术的底层机制。',
    category: '基础科普'
  },
  {
    slug: 'best-vpn-airport-recommendation',
    title: '2026年优质梯子推荐：机场选购与避坑完全指南',
    lead: '如何选择靠谱稳定的高性价比机场？从专线质量、晚高峰测速、客服支持与隐私政策等多角度为您深度剖析。',
    category: '选购指南'
  },
  {
    slug: 'clash-complete-tutorial',
    title: 'Clash全平台完整使用教程：Windows / Mac / iOS / Android 通用指南',
    lead: 'Clash 是全球最流行的科学上网开源内核之一。本文提供全平台客户端的下载、订阅导入与分流配置总览。',
    category: '客户端教程'
  },
  {
    slug: 'speed-optimization-guide',
    title: '机场节点速度与延迟优化：如何让你的科学上网快如闪电',
    lead: '遇到连接缓慢、丢包或视频缓冲卡顿？本文传授几招实用优化设置，轻松释放千兆专线带宽潜能。',
    category: '进阶技巧'
  },
  {
    slug: 'clash-rules-configuration',
    title: 'Clash规则配置与自定义分流策略深度解析',
    lead: '手把手教您定制个性化分流规则集，实现国内应用直连、海外特定域名精准走专用节点的超强体验。',
    category: '进阶技巧'
  },
  {
    slug: 'streaming-media-guide',
    title: '流媒体解锁与4K极速播放指南：畅享 Netflix / Disney+ / YouTube',
    lead: '海外主流流媒体平台区域限制如何破解？如何挑选支持全解锁的优质原生节点？本文为您详细解答。',
    category: '流媒体指南'
  },
  {
    slug: 'academic-resources-guide',
    title: '科研与学术加速指南：轻松访问 Google Scholar、IEEE 与海外学术库',
    lead: '针对高校师生与科研工作者，提供访问国际核心期刊、科研数据库与海外高校学术服务器的高速直通解决方案。',
    category: '学术科研'
  },
  {
    slug: 'security-privacy-guide',
    title: '科学上网安全与隐私保护指南：防追踪、防泄密与安全防范',
    lead: '在使用网络代理与翻墙工具时，如何确保个人身份信息与账户密码的绝对安全？本文为您详解网络安全防护常识。',
    category: '安全隐私'
  },
  {
    slug: 'dns-leak-protection',
    title: 'DNS 泄漏原理与防护实践：全面保护上网真实 IP 与隐私',
    lead: '什么是 DNS 泄漏？为什么开了代理运营商还能看到你的访问记录？教您如何在客户端中彻底堵死 DNS 泄漏漏洞。',
    category: '安全隐私'
  },
  {
    slug: 'common-problems-solutions',
    title: '科学上网常见故障排除排查手册：节点连不上、超时等问题一网打尽',
    lead: '节点超时、能打开 Google 却打不开推特、提示无法解析主机？最全面的翻墙排错手册帮您快速自愈。',
    category: '故障排除'
  }
];

function generateKbArticleHtml({ slug, title, lead, category }) {
  const cleanUrl = `https://bajiejichang.cc/kb/${slug}`;
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | 八戒机场科学上网知识库</title>
    <meta name="description" content="${lead.replace(/"/g, '&quot;')}">
    <meta name="keywords" content="${title}, 科学上网知识库, 翻墙教程, 八戒机场, Clash教程">
    <link rel="canonical" href="${cleanUrl}">
    <link rel="alternate" hreflang="zh-CN" href="${cleanUrl}">
    <link rel="alternate" hreflang="x-default" href="${cleanUrl}">

    <!-- GEO Tags -->
    <meta name="geo.region" content="CN">
    <meta name="geo.placename" content="China">
    <meta name="geo.position" content="39.9042;116.4074">
    <meta name="ICBM" content="39.9042, 116.4074">
    <meta http-equiv="content-language" content="zh-CN">

    <!-- Open Graph -->
    <meta property="og:site_name" content="八戒机场">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title} | 八戒机场">
    <meta property="og:description" content="${lead.replace(/"/g, '&quot;')}">
    <meta property="og:url" content="${cleanUrl}">
    <meta property="og:image" content="https://bajiejichang.cc/images/hero-dashboard.png">
    <meta property="og:locale" content="zh_CN">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} | 八戒机场">
    <meta name="twitter:description" content="${lead.replace(/"/g, '&quot;')}">
    <meta name="twitter:image" content="https://bajiejichang.cc/images/hero-dashboard.png">

    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/article.css">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${title}",
      "description": "${lead.replace(/"/g, '\\"')}",
      "author": {
        "@type": "Organization",
        "name": "八戒机场知识库"
      },
      "publisher": {
        "@type": "Organization",
        "name": "八戒机场",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bajiejichang.cc/images/logo.png"
        }
      },
      "datePublished": "2026-11-08",
      "dateModified": "2026-11-09",
      "mainEntityOfPage": "${cleanUrl}"
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
        "item": "https://bajiejichang.cc/"
      }, {
        "@type": "ListItem",
        "position": 2,
        "name": "知识库",
        "item": "https://bajiejichang.cc/knowledge-base"
      }, {
        "@type": "ListItem",
        "position": 3,
        "name": "${title}"
      }]
    }
    </script>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <img src="../images/logo.png" alt="八戒机场Logo" class="logo">
                <span class="brand-name">八戒机场</span>
            </div>
            <ul class="nav-menu">
                <li><a href="../index.html">首页</a></li>
                <li><a href="../index.html#features">核心优势</a></li>
                <li><a href="../index.html#pricing">套餐价格</a></li>
                <li><a href="../knowledge-base.html">科学知识库</a></li>
                <li><a href="../articles.html">文章中心</a></li>
                <li><a href="../faq.html">常见问题</a></li>
                <li><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener">立即使用</a></li>
            </ul>
        </div>
    </nav>

    <article class="article-page">
        <div class="container">
            <div class="article-header">
                <div class="article-breadcrumb">
                    <a href="../index.html">首页</a> / <a href="../knowledge-base.html">知识库</a> / ${category}
                </div>
                <h1>${title}</h1>
                <div class="article-meta">
                    <span class="article-date">📅 2026年11月9日</span>
                    <span class="article-category">🏷️ ${category}</span>
                    <span class="article-read-time">⏱️ 阅读时间：10分钟</span>
                </div>
            </div>

            <div class="article-body">
                <p class="lead">${lead}</p>
                
                <h2>核心知识讲解</h2>
                <p>科学上网不仅仅是一门技术工具的使用，更是一种数字时代获取前沿知识与提升工作效能的基本素养。无论是在人工智能应用浪潮中调用 ChatGPT/Claude API，还是在全球化业务中开展跨国协作，稳定优质的国际网络通道都是坚实的基石。</p>

                <h2>技术实现与最佳实践</h2>
                <p>针对不同网络环境，建议读者重点掌握以下几个核心环节：</p>
                <ol>
                    <li><strong>选用经过市场检验的成熟协议：</strong>现代混淆协议（如 VMess/Trojan/VLESS）具备出色的抗封锁与抗探测特性。</li>
                    <li><strong>配置合理的分流规则：</strong>使用 Rule 模式，确保微信、支付宝、淘宝等大陆服务保持高速直连，海外流量自动走专线加速。</li>
                    <li><strong>保障客户端与节点订阅及时更新：</strong>订阅节点通常包含动态路由与备用通道，遇到突发网络波动时刷新订阅往往能瞬间恢复高速连接。</li>
                </ol>

                <div style="background: var(--bg-light); padding: 25px; border-radius: 12px; margin: 40px 0; border-left: 4px solid var(--primary-color);">
                    <h3>🚀 稳定靠谱的节点保障：八戒机场</h3>
                    <p>八戒机场拥有专属的全球优质中继网络，提供全天候 99.9% 在线率保证与专业的工单客服支持，支持全平台主流客户端一键订阅。</p>
                    <p><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener" style="display:inline-block; margin-top:10px;">立即获取八戒机场专属节点 &rarr;</a></p>
                </div>

                <div class="related-articles">
                    <h2>知识库相关文章</h2>
                    <div class="related-grid">
                        <a href="scientific-internet-complete-guide.html" class="related-card">
                            <h3>2024最新科学上网完全指南</h3>
                            <p>从入门到精通15分钟深度科普</p>
                        </a>
                        <a href="ai-tools-guide.html" class="related-card">
                            <h3>AI 工具使用指南</h3>
                            <p>ChatGPT / Claude / Midjourney 高效访问</p>
                        </a>
                        <a href="../knowledge-base.html" class="related-card">
                            <h3>返回知识库首页</h3>
                            <p>浏览12篇深度原创翻墙技术文章</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </article>

    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>关于八戒机场</h4>
                    <p>八戒机场（扬帆云/ssrdog品牌）致力于为科研、外贸与数字创作者提供高品质网络出海基础设施。</p>
                </div>
                <div class="footer-col">
                    <h4>使用教程</h4>
                    <ul>
                        <li><a href="../tutorial-windows.html">Windows教程</a></li>
                        <li><a href="../tutorial-mac.html">macOS教程</a></li>
                        <li><a href="../tutorial-ios.html">iOS教程</a></li>
                        <li><a href="../tutorial-android.html">Android教程</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>快速通道</h4>
                    <ul>
                        <li><a href="../index.html">网站首页</a></li>
                        <li><a href="../articles.html">文章中心</a></li>
                        <li><a href="../knowledge-base.html">知识库</a></li>
                        <li><a href="../faq.html">常见问题</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>法律与声明</h4>
                    <ul>
                        <li><a href="../privacy.html">隐私政策</a></li>
                        <li><a href="../terms.html">服务条款</a></li>
                        <li><a href="../disclaimer.html">免责声明</a></li>
                        <li><a href="../sitemap.html">网站地图</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 八戒机场 (bajiejichang.cc). All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

kbArticlesToCreate.forEach(k => {
  const filePath = path.join(rootDir, 'kb', `${k.slug}.html`);
  writeFileSafe(filePath, generateKbArticleHtml(k));
  console.log(`Generated KB article: kb/${k.slug}.html`);
});

// 4. Generate HTML Sitemap (sitemap.html)
const sitemapHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网站地图 (HTML Sitemap) | 八戒机场</title>
    <meta name="description" content="八戒机场官方网站地图，为您提供全站所有页面、教程指南、测评文章与科学上网知识库的完整导航索引。">
    <meta name="keywords" content="八戒机场网站地图, HTML sitemap, Clash教程目录, 科学上网导航">
    <link rel="canonical" href="https://bajiejichang.cc/sitemap">
    <link rel="alternate" hreflang="zh-CN" href="https://bajiejichang.cc/sitemap">
    <link rel="alternate" hreflang="x-default" href="https://bajiejichang.cc/sitemap">

    <!-- GEO Tags -->
    <meta name="geo.region" content="CN">
    <meta name="geo.placename" content="China">
    <meta name="geo.position" content="39.9042;116.4074">
    <meta name="ICBM" content="39.9042, 116.4074">
    <meta http-equiv="content-language" content="zh-CN">

    <!-- Open Graph -->
    <meta property="og:site_name" content="八戒机场">
    <meta property="og:type" content="website">
    <meta property="og:title" content="网站地图 | 八戒机场">
    <meta property="og:description" content="八戒机场官方网站地图，提供全站完整页面索引。">
    <meta property="og:url" content="https://bajiejichang.cc/sitemap">
    <meta property="og:image" content="https://bajiejichang.cc/images/hero-dashboard.png">
    <meta property="og:locale" content="zh_CN">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="网站地图 | 八戒机场">
    <meta name="twitter:description" content="八戒机场官方网站地图，提供全站完整页面索引。">
    <meta name="twitter:image" content="https://bajiejichang.cc/images/hero-dashboard.png">

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">
    <style>
        .sitemap-section {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-bottom: 30px;
        }
        .sitemap-section h2 {
            font-size: 22px;
            color: #333;
            border-bottom: 2px solid var(--primary-color);
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .sitemap-links {
            list-style: none;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 15px;
        }
        .sitemap-links a {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #4b5563;
            text-decoration: none;
            padding: 10px 14px;
            background: #f9fafb;
            border-radius: 8px;
            transition: all 0.2s ease;
            font-size: 15px;
            border: 1px solid #e5e7eb;
        }
        .sitemap-links a:hover {
            color: var(--primary-color);
            background: #eff6ff;
            border-color: var(--primary-color);
            transform: translateX(3px);
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <img src="images/logo.png" alt="八戒机场Logo" class="logo">
                <span class="brand-name">八戒机场</span>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html">首页</a></li>
                <li><a href="index.html#features">核心优势</a></li>
                <li><a href="index.html#pricing">套餐价格</a></li>
                <li><a href="articles.html">文章中心</a></li>
                <li><a href="knowledge-base.html">知识库</a></li>
                <li><a href="faq.html">常见问题</a></li>
                <li><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener">立即使用</a></li>
            </ul>
        </div>
    </nav>

    <div class="container" style="padding: 120px 0 80px;">
        <div class="section-header" style="text-align: center; margin-bottom: 40px;">
            <h1>八戒机场网站地图</h1>
            <p>清晰索引全站所有栏目、教程、测评与科学上网深度指南</p>
        </div>

        <div class="sitemap-section">
            <h2>📌 核心栏目与基础服务</h2>
            <ul class="sitemap-links">
                <li><a href="index.html">🏠 网站首页 (bajiejichang.cc)</a></li>
                <li><a href="articles.html">📚 文章中心与评测大全</a></li>
                <li><a href="knowledge-base.html">🧠 科学上网深度知识库</a></li>
                <li><a href="faq.html">❓ 常见问题与解答 (FAQ)</a></li>
                <li><a href="sitemap.xml" target="_blank">🗺️ XML 站点地图 (搜索引擎专用)</a></li>
            </ul>
        </div>

        <div class="sitemap-section">
            <h2>💻 跨平台客户端使用教程</h2>
            <ul class="sitemap-links">
                <li><a href="tutorial-windows.html">🪟 Windows Clash 完整图文配置教程</a></li>
                <li><a href="tutorial-mac.html">🍎 macOS Clash Verge / ClashX 配置指南</a></li>
                <li><a href="tutorial-ios.html">📱 iOS 苹果手机 Shadowrocket 配置教程</a></li>
                <li><a href="tutorial-android.html">🤖 Android 安卓手机 Clash 配置指南</a></li>
                <li><a href="tutorial-clash-party.html">🎉 Clash Party 现代化客户端使用教程</a></li>
                <li><a href="tutorial-router.html">📶 路由器 OpenClash 全屋科学上网指南</a></li>
            </ul>
        </div>

        <div class="sitemap-section">
            <h2>📰 文章中心与深度评测</h2>
            <ul class="sitemap-links">
                <li><a href="articles/clash-airport-recommendation-2024.html">2024最新Clash机场推荐：八戒机场评测</a></li>
                <li><a href="articles/clash-complete-tutorial.html">Clash完整使用教程：从入门到精通</a></li>
                <li><a href="articles/cheap-airport-recommendation.html">便宜又好用的机场推荐：性价比之选</a></li>
                <li><a href="articles/clash-vs-vpn.html">Clash与传统VPN深度对比分析</a></li>
                <li><a href="articles/scientific-internet-guide.html">2026最新科学上网安全翻墙指南</a></li>
                <li><a href="articles/clash-party-tutorial.html">Clash Party 入门与高级技巧详解</a></li>
                <li><a href="articles/stable-airport-selection.html">如何挑选稳定靠谱的机场？避坑指标</a></li>
                <li><a href="articles/netflix-unlock-guide.html">Netflix / Disney+ 4K流媒体解锁全攻略</a></li>
                <li><a href="articles/clash-rules-configuration.html">Clash规则配置与防DNS泄漏深度解析</a></li>
                <li><a href="articles/vpn-vs-proxy-comparison.html">VPN、代理与机场的区别通俗科普</a></li>
            </ul>
        </div>

        <div class="sitemap-section">
            <h2>🎓 科学上网知识库 (12篇深度长文)</h2>
            <ul class="sitemap-links">
                <li><a href="kb/scientific-internet-complete-guide.html">科学上网完全指南 - 从入门到精通</a></li>
                <li><a href="kb/vpn-proxy-airport-explained.html">什么是梯子？机场、VPN、代理全面科普</a></li>
                <li><a href="kb/best-vpn-airport-recommendation.html">2024优质梯子推荐 - 机场选购指南</a></li>
                <li><a href="kb/clash-complete-tutorial.html">Clash使用教程 - Windows/Mac/iOS/Android</a></li>
                <li><a href="kb/speed-optimization-guide.html">机场节点速度与延迟优化完全手册</a></li>
                <li><a href="kb/clash-rules-configuration.html">Clash规则配置深度进阶指南</a></li>
                <li><a href="kb/streaming-media-guide.html">海外流媒体解锁与4K极速播放指南</a></li>
                <li><a href="kb/ai-tools-guide.html">AI工具使用指南 - ChatGPT/Claude无障碍</a></li>
                <li><a href="kb/academic-resources-guide.html">科研与学术加速指南 - 国际文献秒开</a></li>
                <li><a href="kb/security-privacy-guide.html">科学上网安全与隐私保护完全指引</a></li>
                <li><a href="kb/dns-leak-protection.html">DNS泄漏原理与全面防护实践</a></li>
                <li><a href="kb/common-problems-solutions.html">常见连接故障自愈排查手册</a></li>
            </ul>
        </div>

        <div class="sitemap-section">
            <h2>⚖️ 法律声明与政策条款</h2>
            <ul class="sitemap-links">
                <li><a href="privacy.html">🔒 隐私政策 (Privacy Policy)</a></li>
                <li><a href="terms.html">📜 服务条款 (Terms of Service)</a></li>
                <li><a href="disclaimer.html">⚠️ 免责声明 (Disclaimer)</a></li>
            </ul>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <div class="footer-bottom">
                <p>&copy; 2026 八戒机场 (bajiejichang.cc). All rights reserved. | 网站地图更新于 2026-11-09</p>
            </div>
        </div>
    </footer>
</body>
</html>`;

writeFileSafe(path.join(rootDir, 'sitemap.html'), sitemapHtml);
console.log('Generated sitemap.html');
