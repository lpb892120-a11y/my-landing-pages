const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const DOMAIN = 'https://bajiejichang.cfd';
const BRAND_NAME = '八戒机场';
const AFF_LINK = 'https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4';

const articles = [
  {
    slug: 'clash-airport-recommendation-2024',
    title: '2024年最新Clash机场推荐：八戒机场全面评测',
    desc: '详细对比市面上主流Clash机场服务，从速度、稳定性、晚高峰表现、价格等多维度分析，为您提供最值得选购的高性价比节点推荐。',
    cat: '机场推荐',
    date: '2024-11-08',
    img: 'images/article-1.svg'
  },
  {
    slug: 'best-airport-recommendation-2024',
    title: '2024最佳科学上网机场综合推荐指南',
    desc: '全方位梳理全网口碑优质机场，涵盖性价比梯子、专线加速、ChatGPT解锁与4K流媒体首选服务商。',
    cat: '综合评测',
    date: '2024-11-08',
    img: 'images/article-2.svg'
  },
  {
    slug: 'cheap-airport-recommendation',
    title: '便宜又好用的机场推荐：学生党高性价比之选',
    desc: '预算有限也能享受优质科学上网服务，盘点价格实惠、低至19元/月但质量稳定可靠的Clash机场。',
    cat: '性价比推荐',
    date: '2024-11-07',
    img: 'images/article-3.svg'
  },
  {
    slug: 'scientific-internet-complete-guide',
    title: '科学上网完全指南：新手从零入门到精通',
    desc: '系统科普科学上网协议技术（Shadowsocks/V2Ray/Trojan）、梯子选择标准、分流规则与安全防护技巧。',
    cat: '入门指南',
    date: '2024-11-06',
    img: 'images/article-4.svg'
  },
  {
    slug: 'clash-complete-tutorial',
    title: 'Clash完整使用教程：从零开始学习配置与订阅',
    desc: '包含Windows、Mac、手机多平台客户端下载、订阅导入、分流模式选择与自动更新的全流程图文教程。',
    cat: '核心教程',
    date: '2024-11-05',
    img: 'images/article-5.svg'
  },
  {
    slug: 'windows-clash-beginner-guide',
    title: 'Windows平台Clash配置与使用新手教程',
    desc: '适合新手的Windows Clash配置指南，详解系统代理开关、TUN虚拟网卡模式、开机自启与测速排错。',
    cat: '系统教程',
    date: '2024-11-05',
    img: 'images/article-6.svg'
  },
  {
    slug: 'shadowrocket-ios-guide',
    title: 'iOS苹果小火箭（Shadowrocket）配置指南',
    desc: '详解苹果iPhone/iPad外区账号登录、Shadowrocket客户端安装、节点订阅导入与全局分流策略。',
    cat: '移动端指南',
    date: '2024-11-04',
    img: 'images/article-7.svg'
  },
  {
    slug: 'ai-tools-usage-guide',
    title: 'AI工具使用指南：ChatGPT、Claude、Midjourney全攻略',
    desc: '手把手教您如何通过八戒机场解锁ChatGPT 4o、Claude 3.5 Sonnet，解决地区不可用报错与支付风控。',
    cat: 'AI应用',
    date: '2024-11-03',
    img: 'images/article-8.svg'
  },
  {
    slug: 'netflix-unlock-guide',
    title: 'Netflix与流媒体全球解锁指南：畅看各国影视库',
    desc: '如何挑选流媒体解锁原生节点，4K无缓冲观看Netflix、Disney+、HBO Max与YouTube Premium。',
    cat: '流媒体',
    date: '2024-11-02',
    img: 'images/article-9.svg'
  },
  {
    slug: 'airport-selection-guide',
    title: '如何选择稳定的Clash机场？5大关键评估指标',
    desc: '从专线质量、晚高峰带宽冗余、协议安全性、客户端兼容性与售后服务全面解析优质机场的核心要素。',
    cat: '选购技巧',
    date: '2024-11-01',
    img: 'images/article-10.svg'
  },
  {
    slug: 'airport-speed-optimization',
    title: '机场节点速度优化技巧：告别卡顿与高延迟',
    desc: '深入剖析延迟产生原因，通过DNS优化、并发连接调优与节点负载选择大幅提升科学上网速度。',
    cat: '速度调优',
    date: '2024-10-31',
    img: 'images/article-1.svg'
  },
  {
    slug: 'common-problems-solutions',
    title: '科学上网常见问题与故障排查指南',
    desc: '解决节点超时、系统时间不同步、浏览器能上网客户端不上网等常见连接痛点的实用排错手册。',
    cat: '疑难解答',
    date: '2024-10-30',
    img: 'images/article-2.svg'
  },
  {
    slug: 'router-proxy-setup',
    title: '路由器科学上网与透明代理配置教程',
    desc: '针对OpenWrt、华硕梅林路由器的Clash插件配置教程，实现家庭全屋智能设备无感科学上网。',
    cat: '高级教程',
    date: '2024-10-29',
    img: 'images/article-3.svg'
  },
  {
    slug: 'security-privacy-guide',
    title: '科学上网安全与隐私保护完全指南',
    desc: '零日志政策深度解析，防止DNS泄漏、WebRTC真实IP暴露，保障个人信息与隐私绝对安全。',
    cat: '安全隐私',
    date: '2024-10-28',
    img: 'images/article-4.svg'
  },
  {
    slug: 'vpn-proxy-knowledge',
    title: 'VPN与代理原理技术深度解析：有什么区别？',
    desc: '从OSI网络层、协议加密、性能开销和使用场景全方位对比传统VPN与现代Clash代理的差异。',
    cat: '技术科普',
    date: '2024-10-27',
    img: 'images/article-5.svg'
  }
];

let articlesHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文章中心 - ${BRAND_NAME} | Clash教程与机场深度评测</title>
    <meta name="description" content="${BRAND_NAME}文章中心为您提供2026最新Clash机场推荐、科学上网配置教程、流媒体解锁指南与网络优化方案。">
    <meta name="keywords" content="Clash机场推荐,科学上网教程,${BRAND_NAME},翻墙评测,Shadowrocket配置,便宜梯子">
    <link rel="canonical" href="${DOMAIN}/articles">
    <link rel="alternate" hreflang="zh-CN" href="${DOMAIN}/articles">
    <link rel="alternate" hreflang="x-default" href="${DOMAIN}/articles">
    <meta property="og:title" content="文章中心 - ${BRAND_NAME}">
    <meta property="og:description" content="${BRAND_NAME}官方教程、机场评测与科学上网技术文章汇集">
    <meta property="og:url" content="${DOMAIN}/articles">
    <meta property="og:type" content="website">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "文章中心 - ${BRAND_NAME}",
      "description": "${BRAND_NAME}深度教程、机场评测、使用技巧汇总",
      "url": "${DOMAIN}/articles"
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首页", "item": "${DOMAIN}/" },
        { "@type": "ListItem", "position": 2, "name": "文章中心", "item": "${DOMAIN}/articles" }
      ]
    }
    </script>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <a href="index.html" style="text-decoration:none;"><h1>${BRAND_NAME}</h1></a>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html">首页</a></li>
                <li><a href="index.html#advantages">核心优势</a></li>
                <li><a href="index.html#pricing">套餐价格</a></li>
                <li><a href="tutorial-windows.html">客户端教程</a></li>
                <li><a href="articles.html" style="color:#6366f1;font-weight:700;">文章中心</a></li>
                <li><a href="faq.html">常见问题</a></li>
                <li><a href="${AFF_LINK}" class="btn btn-primary" target="_blank" rel="noopener">立即注册</a></li>
            </ul>
        </div>
    </nav>

    <section class="articles-hero" style="background:linear-gradient(135deg,#1e1b4b,#0f172a);color:#fff;padding:110px 0 60px;text-align:center;">
        <div class="container">
            <h1 style="font-size:36px;font-weight:800;margin-bottom:12px;">📚 ${BRAND_NAME}知识与文章中心</h1>
            <p style="color:#cbd5e1;font-size:18px;max-width:700px;margin:0 auto 25px;">深度教程、机场评测、流媒体解锁与使用技巧，助您高效畅游全球网络</p>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
                <a href="tutorial-windows.html" style="background:rgba(255,255,255,0.1);color:#fff;padding:8px 16px;border-radius:20px;text-decoration:none;font-size:14px;">💻 Windows配置</a>
                <a href="tutorial-mac.html" style="background:rgba(255,255,255,0.1);color:#fff;padding:8px 16px;border-radius:20px;text-decoration:none;font-size:14px;">🍎 macOS配置</a>
                <a href="tutorial-android.html" style="background:rgba(255,255,255,0.1);color:#fff;padding:8px 16px;border-radius:20px;text-decoration:none;font-size:14px;">🤖 Android配置</a>
                <a href="tutorial-ios.html" style="background:rgba(255,255,255,0.1);color:#fff;padding:8px 16px;border-radius:20px;text-decoration:none;font-size:14px;">📱 iOS小火箭</a>
                <a href="tutorial-clash-party.html" style="background:rgba(255,255,255,0.1);color:#fff;padding:8px 16px;border-radius:20px;text-decoration:none;font-size:14px;">🎉 Clash Party</a>
            </div>
        </div>
    </section>

    <main class="container" style="max-width:1200px;margin:50px auto 80px;padding:0 20px;">
        <div class="articles-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:30px;">
`;

articles.forEach(art => {
  articlesHtml += `            <article class="article-card" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 4px 15px rgba(0,0,0,0.04);transition:transform 0.2s,box-shadow 0.2s;display:flex;flex-direction:column;">
                <div class="article-image" style="width:100%;height:200px;overflow:hidden;background:#f3f4f6;">
                    <a href="articles/${art.slug}.html">
                        <img src="${art.img}" alt="${art.title}" style="width:100%;height:100%;object-fit:cover;transition:transform 0.3s;" loading="lazy">
                    </a>
                </div>
                <div class="article-content" style="padding:22px;flex:1;display:flex;flex-direction:column;">
                    <div class="article-meta" style="display:flex;justify-content:space-between;font-size:13px;color:#9ca3af;margin-bottom:10px;">
                        <span style="color:#6366f1;font-weight:600;background:#eef2ff;padding:2px 8px;border-radius:4px;">${art.cat}</span>
                        <span>📅 ${art.date}</span>
                    </div>
                    <h3 style="font-size:18px;font-weight:700;line-height:1.4;margin-bottom:10px;">
                        <a href="articles/${art.slug}.html" style="color:#1f2937;text-decoration:none;">${art.title}</a>
                    </h3>
                    <p style="color:#6b7280;font-size:14px;line-height:1.6;margin-bottom:16px;flex:1;">${art.desc}</p>
                    <a href="articles/${art.slug}.html" style="color:#6366f1;font-weight:600;text-decoration:none;font-size:14px;display:inline-flex;align-items:center;gap:4px;">
                        阅读全文 →
                    </a>
                </div>
            </article>\n`;
});

articlesHtml += `        </div>
    </main>

    <footer style="background:#111827;color:#9ca3af;padding:40px 0;margin-top:60px;font-size:14px;text-align:center;">
        <div class="container">
            <p>&copy; 2024-2026 ${BRAND_NAME} (bajiejichang.cfd) | 专业科学上网节点服务商</p>
            <p style="margin-top:10px;">
                <a href="index.html" style="color:#9ca3af;margin:0 10px;">首页</a>
                <a href="articles.html" style="color:#9ca3af;margin:0 10px;">文章中心</a>
                <a href="faq.html" style="color:#9ca3af;margin:0 10px;">常见问题</a>
                <a href="sitemap.html" style="color:#9ca3af;margin:0 10px;">网站地图</a>
                <a href="privacy.html" style="color:#9ca3af;margin:0 10px;">隐私政策</a>
                <a href="terms.html" style="color:#9ca3af;margin:0 10px;">服务条款</a>
                <a href="disclaimer.html" style="color:#9ca3af;margin:0 10px;">免责声明</a>
            </p>
        </div>
    </footer>
</body>
</html>`;

fs.writeFileSync(path.join(rootDir, 'articles.html'), articlesHtml, 'utf8');
console.log('Successfully updated articles.html with all 15 articles and clean SVGs!');

