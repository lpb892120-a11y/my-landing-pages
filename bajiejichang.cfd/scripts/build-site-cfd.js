const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const DOMAIN = 'https://bajiejichang.cfd';
const BRAND_NAME = '八戒机场';
const AFF_LINK = 'https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4';

console.log('--- 1. Generating missing tutorial pages (Mac, Android, iOS, Clash Party) ---');

function createTutorial(slug, title, desc, platformName, steps) {
  const stepsJson = JSON.stringify(steps.map(s => ({
    "@type": "HowToStep",
    "name": s.title,
    "text": s.desc
  })), null, 2);

  const stepsHtml = steps.map((s, idx) => `
    <div class="step-card" style="background:#fff;border-radius:12px;padding:24px;margin-bottom:20px;border:1px solid #e5e7eb;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#ec4899);color:#fff;font-weight:700;">${idx + 1}</span>
        <h3 style="margin:0;font-size:18px;color:#1f2937;">${s.title}</h3>
      </div>
      <p style="color:#4b5563;line-height:1.7;margin-bottom:12px;">${s.desc}</p>
      ${s.tip ? `<div style="background:#f0fdf4;border-left:4px solid #10b981;padding:12px 16px;border-radius:4px;color:#166534;font-size:14px;"><strong>💡 小贴士：</strong>${s.tip}</div>` : ''}
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | ${BRAND_NAME}官方配置指南</title>
    <meta name="description" content="${desc}">
    <meta name="keywords" content="${platformName} Clash教程,科学上网,${BRAND_NAME},翻墙梯子,Clash配置,节点导入">
    <link rel="canonical" href="${DOMAIN}/${slug}">
    <link rel="alternate" hreflang="zh-CN" href="${DOMAIN}/${slug}">
    <link rel="alternate" hreflang="x-default" href="${DOMAIN}/${slug}">
    <meta property="og:title" content="${title} | ${BRAND_NAME}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${DOMAIN}/${slug}">
    <meta property="og:type" content="article">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "${title}",
      "description": "${desc}",
      "step": ${stepsJson}
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首页", "item": "${DOMAIN}/" },
        { "@type": "ListItem", "position": 2, "name": "${platformName}教程", "item": "${DOMAIN}/${slug}" }
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
                <li><a href="articles.html">文章中心</a></li>
                <li><a href="faq.html">常见问题</a></li>
                <li><a href="tutorial-windows.html">Windows</a></li>
                <li><a href="tutorial-mac.html">macOS</a></li>
                <li><a href="tutorial-android.html">Android</a></li>
                <li><a href="tutorial-ios.html">iOS</a></li>
                <li><a href="${AFF_LINK}" class="btn btn-primary" target="_blank" rel="noopener">立即注册</a></li>
            </ul>
        </div>
    </nav>

    <div class="container" style="max-width:900px;margin:100px auto 60px;padding:0 20px;">
        <div style="margin-bottom:30px;">
            <p style="color:#6b7280;font-size:14px;"><a href="index.html" style="color:#6366f1;text-decoration:none;">首页</a> &gt; <a href="articles.html" style="color:#6366f1;text-decoration:none;">知识库</a> &gt; ${platformName}使用指南</p>
            <h1 style="font-size:28px;font-weight:800;color:#1f2937;margin:15px 0 10px;">${title}</h1>
            <p style="color:#4b5563;font-size:16px;line-height:1.6;">${desc}</p>
        </div>

        <!-- 平台切换Tab -->
        <div style="display:flex;gap:10px;margin-bottom:30px;flex-wrap:wrap;">
            <a href="tutorial-windows.html" style="padding:10px 18px;border-radius:8px;background:${slug === 'tutorial-windows' ? '#6366f1' : '#f3f4f6'};color:${slug === 'tutorial-windows' ? '#fff' : '#374151'};text-decoration:none;font-weight:600;">💻 Windows教程</a>
            <a href="tutorial-mac.html" style="padding:10px 18px;border-radius:8px;background:${slug === 'tutorial-mac' ? '#6366f1' : '#f3f4f6'};color:${slug === 'tutorial-mac' ? '#fff' : '#374151'};text-decoration:none;font-weight:600;">🍎 macOS教程</a>
            <a href="tutorial-android.html" style="padding:10px 18px;border-radius:8px;background:${slug === 'tutorial-android' ? '#6366f1' : '#f3f4f6'};color:${slug === 'tutorial-android' ? '#fff' : '#374151'};text-decoration:none;font-weight:600;">🤖 Android教程</a>
            <a href="tutorial-ios.html" style="padding:10px 18px;border-radius:8px;background:${slug === 'tutorial-ios' ? '#6366f1' : '#f3f4f6'};color:${slug === 'tutorial-ios' ? '#fff' : '#374151'};text-decoration:none;font-weight:600;">📱 iOS教程</a>
            <a href="tutorial-clash-party.html" style="padding:10px 18px;border-radius:8px;background:${slug === 'tutorial-clash-party' ? '#6366f1' : '#f3f4f6'};color:${slug === 'tutorial-clash-party' ? '#fff' : '#374151'};text-decoration:none;font-weight:600;">🎉 Clash Party教程</a>
        </div>

        <div class="tutorial-steps">
            ${stepsHtml}
        </div>

        <div style="background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(236,72,153,0.08));border-radius:12px;padding:30px;text-align:center;margin-top:40px;border:1px dashed #6366f1;">
            <h3 style="font-size:22px;color:#1f2937;margin-bottom:10px;">准备好体验极速网络了吗？</h3>
            <p style="color:#6b7280;margin-bottom:20px;">注册${BRAND_NAME}即可获取专属高速订阅节点，晚高峰4K秒开，流畅解锁ChatGPT与主流流媒体。</p>
            <a href="${AFF_LINK}" class="btn btn-primary" target="_blank" rel="noopener" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#6366f1,#ec4899);color:#fff;text-decoration:none;border-radius:8px;font-weight:700;">立即注册 ${BRAND_NAME}</a>
        </div>
    </div>

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
}

// Write macOS tutorial
fs.writeFileSync(path.join(rootDir, 'tutorial-mac.html'), createTutorial(
  'tutorial-mac',
  'macOS Clash配置与使用教程：Clash Verge / ClashX 极速上手',
  '针对苹果Mac电脑（包括M1/M2/M3/M4芯片与Intel机型）的Clash详细配置指南，包含客户端下载、八戒机场订阅导入与系统代理权限设置。',
  'macOS',
  [
    { title: '注册八戒机场并获取订阅', desc: '首先登录八戒机场官网控制台，在首页仪表盘找到【订阅信息】，点击【复制Clash订阅链接】。', tip: '建议妥善保管订阅链接，切勿外传。' },
    { title: '下载并安装 macOS 客户端', desc: '推荐使用 Clash Verge Rev 或 ClashX Meta。下载适用于你机型芯片架构（Apple Silicon 或 Intel）的 .dmg 镜像包，拖动到应用程序文件夹即可。', tip: '首次打开若提示安全提示，请至【系统偏好设置】&gt;【安全性与隐私】允许运行。' },
    { title: '导入八戒机场订阅配置', desc: '打开 Clash Verge 客户端，进入【订阅】页面，将复制的订阅链接粘贴进输入框，点击【下载导入】。', tip: '导入成功后右键订阅文件，可设置每日定时自动更新。' },
    { title: '选择优质节点并开启系统代理', desc: '进入【代理】面板，建议选择延迟低、绿色标示的专线节点（如香港01、日本01），然后在左下角开启【系统代理】开关。' }
  ]
));

// Write Android tutorial
fs.writeFileSync(path.join(rootDir, 'tutorial-android.html'), createTutorial(
  'tutorial-android',
  'Android安卓手机 Clash 配置指南：Clash Meta for Android 安装使用',
  '针对华为、小米、OPPO、vivo等安卓手机的Clash Meta客户端使用指南，从安装包下载、订阅导入到分流设置完整图文教程。',
  'Android',
  [
    { title: '注册八戒机场并复制专属订阅', desc: '使用手机浏览器登录八戒机场后台，在用户中心点击【一键导入】或直接长按复制【Clash订阅链接】。' },
    { title: '安装 Clash Meta for Android (CMFA)', desc: '下载官方适用的 .apk 安装包。安装过程中如弹出未知应用安装风险提示，请选择【继续安装】或【单次允许】。', tip: '尽量避免使用国产定制精简代理软件，开源官方内核更为安全稳定。' },
    { title: '添加配置并下载节点列表', desc: '打开客户端，点击【配置】&gt; 右上角【+】号 &gt; 选择【URL】，名称填写“八戒机场”，URL粘贴订阅链接，右上角保存并下载。' },
    { title: '启动代理连接', desc: '返回主界面，点击灰色【已停止】大按钮变为运行状态。系统会弹出VPN连接请求弹窗，点击【确定】即可畅游全球网络。' }
  ]
));

// Write iOS tutorial
fs.writeFileSync(path.join(rootDir, 'tutorial-ios.html'), createTutorial(
  'tutorial-ios',
  'iOS苹果手机 Shadowrocket（小火箭）/ Loon 极速配置教程',
  '苹果 iPhone / iPad 设备科学上网配置指南，详解外区 Apple ID 获取、Shadowrocket 客户端安装、八戒机场节点导入与规则分流。',
  'iOS',
  [
    { title: '准备非国区 Apple ID 并下载小火箭', desc: '打开 App Store，退出国区账号，登录美区或港区 Apple ID，搜索并下载 Shadowrocket（小火箭）或 Loon、Quantumult X。', tip: '可以在八戒机场控制台或相关渠道获取外区共享ID或自建美区ID。' },
    { title: '一键导入八戒机场订阅', desc: '用 Safari 浏览器登录八戒机场官网后台，点击【一键导入 Shadowrocket】即可自动拉起小火箭完成订阅导入；亦可手动复制订阅 URL 粘贴添加。' },
    { title: '更新订阅与节点延迟测速', desc: '在小火箭首页长按刚导入的八戒机场服务器节点组，点击【按Ping排序】，选择延迟最低的高速专线。' },
    { title: '连接并信任VPN配置', desc: '将全局路由保持为【配置】（智能分流），开启顶部连接开关。首次连接会弹出 iOS 系统 VPN 权限授权窗口，按提示输入锁屏密码即完成。' }
  ]
));

// Write Clash Party tutorial
fs.writeFileSync(path.join(rootDir, 'tutorial-clash-party.html'), createTutorial(
  'tutorial-clash-party',
  'Clash Party 客户端新手入门与深度配置完全指南',
  '新一代现代化 Clash 跨平台客户端 Clash Party 配置教程，界面优美直观，支持八戒机场订阅聚合、智能分流与一键延迟测试。',
  'Clash Party',
  [
    { title: '下载安装最新版 Clash Party', desc: '访问官方发布页面下载适配 Windows、macOS 或 Linux 的 Clash Party 安装程序并运行。' },
    { title: '导入八戒机场订阅链接', desc: '打开软件，点击左侧【Sub / 订阅】，点击【添加订阅】，将八戒机场提供的订阅链接粘贴后点击拉取配置。' },
    { title: '开启智能规则分流模式', desc: '在模式选择中开启 Rule（规则分流），国内网站直连不消耗机场流量，海外网站与流媒体自动通过八戒机场高速节点加速。' },
    { title: '启用系统代理服务', desc: '开启系统代理总开关，系统托盘图标变绿即表示连接成功，可访问 YouTube 测速或登录 ChatGPT 使用。' }
  ]
));

console.log('--- 2. Generating comprehensive HTML Sitemap (sitemap.html) ---');

const allPagesForSitemap = [
  { group: '核心落地页', items: [
    { title: '八戒机场官网首页', url: `${DOMAIN}/`, local: 'index.html', desc: '2026专业高性价比Clash机场首选' },
    { title: '文章资讯与评测中心', url: `${DOMAIN}/articles`, local: 'articles.html', desc: '全站机场评测、技术指南与科学上网知识' },
    { title: '常见问题解答 (FAQ)', url: `${DOMAIN}/faq`, local: 'faq.html', desc: '从购买、配置到故障排查全方位疑难解答' },
    { title: '网站地图 (HTML Sitemap)', url: `${DOMAIN}/sitemap`, local: 'sitemap.html', desc: '全站链接索引导航' }
  ]},
  { group: '全平台客户端使用教程', items: [
    { title: 'Windows Clash教程', url: `${DOMAIN}/tutorial-windows`, local: 'tutorial-windows.html', desc: 'PC端Clash for Windows与Verge完整教程' },
    { title: 'macOS Clash教程', url: `${DOMAIN}/tutorial-mac`, local: 'tutorial-mac.html', desc: '苹果电脑系统代理与Meta内核配置' },
    { title: 'Android 安卓配置教程', url: `${DOMAIN}/tutorial-android`, local: 'tutorial-android.html', desc: '安卓手机Clash Meta安装与订阅导入' },
    { title: 'iOS 苹果小火箭教程', url: `${DOMAIN}/tutorial-ios`, local: 'tutorial-ios.html', desc: 'iPhone Shadowrocket节点导入与规则配置' },
    { title: 'Clash Party 客户端教程', url: `${DOMAIN}/tutorial-clash-party`, local: 'tutorial-clash-party.html', desc: '新一代现代化客户端配置指南' }
  ]},
  { group: '深度评测与科学上网指南', items: [
    { title: '2024最新Clash机场推荐与全面评测', url: `${DOMAIN}/articles/clash-airport-recommendation-2024`, local: 'articles/clash-airport-recommendation-2024.html' },
    { title: '2024最佳机场综合推荐指南', url: `${DOMAIN}/articles/best-airport-recommendation-2024`, local: 'articles/best-airport-recommendation-2024.html' },
    { title: '便宜又好用的高性价比机场推荐', url: `${DOMAIN}/articles/cheap-airport-recommendation`, local: 'articles/cheap-airport-recommendation.html' },
    { title: '科学上网完全指南：新手从零入门', url: `${DOMAIN}/articles/scientific-internet-complete-guide`, local: 'articles/scientific-internet-complete-guide.html' },
    { title: 'Clash完整使用教程：从入门到精通', url: `${DOMAIN}/articles/clash-complete-tutorial`, local: 'articles/clash-complete-tutorial.html' },
    { title: 'Windows平台Clash新手指南', url: `${DOMAIN}/articles/windows-clash-beginner-guide`, local: 'articles/windows-clash-beginner-guide.html' },
    { title: 'Shadowrocket iOS 小火箭配置指南', url: `${DOMAIN}/articles/shadowrocket-ios-guide`, local: 'articles/shadowrocket-ios-guide.html' },
    { title: 'AI工具访问与加速实战（ChatGPT/Claude）', url: `${DOMAIN}/articles/ai-tools-usage-guide`, local: 'articles/ai-tools-usage-guide.html' },
    { title: 'Netflix与全球流媒体解锁完全指南', url: `${DOMAIN}/articles/netflix-unlock-guide`, local: 'articles/netflix-unlock-guide.html' },
    { title: '机场选择核心指标与防坑指南', url: `${DOMAIN}/articles/airport-selection-guide`, local: 'articles/airport-selection-guide.html' },
    { title: '机场节点速度优化与延迟调优', url: `${DOMAIN}/articles/airport-speed-optimization`, local: 'articles/airport-speed-optimization.html' },
    { title: '路由器科学上网与透明网关设置', url: `${DOMAIN}/articles/router-proxy-setup`, local: 'articles/router-proxy-setup.html' },
    { title: '科学上网安全与隐私保护指南', url: `${DOMAIN}/articles/security-privacy-guide`, local: 'articles/security-privacy-guide.html' },
    { title: '网络连接常见问题与故障排查', url: `${DOMAIN}/articles/common-problems-solutions`, local: 'articles/common-problems-solutions.html' },
    { title: 'VPN与代理原理技术深度解析', url: `${DOMAIN}/articles/vpn-proxy-knowledge`, local: 'articles/vpn-proxy-knowledge.html' }
  ]},
  { group: '服务条款与法律政策', items: [
    { title: '隐私政策 (Privacy Policy)', url: `${DOMAIN}/privacy`, local: 'privacy.html' },
    { title: '服务条款 (Terms of Service)', url: `${DOMAIN}/terms`, local: 'terms.html' },
    { title: '免责声明 (Disclaimer)', url: `${DOMAIN}/disclaimer`, local: 'disclaimer.html' }
  ]}
];

let sitemapHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网站地图 (HTML Sitemap) | ${BRAND_NAME}</title>
    <meta name="description" content="${BRAND_NAME}官方网站地图，为您提供全站所有主要页面、核心教程指南、评测文章与科学上网知识库的完整导航索引。">
    <link rel="canonical" href="${DOMAIN}/sitemap">
    <link rel="alternate" hreflang="zh-CN" href="${DOMAIN}/sitemap">
    <link rel="alternate" hreflang="x-default" href="${DOMAIN}/sitemap">
    <meta property="og:title" content="网站地图 | ${BRAND_NAME}">
    <meta property="og:description" content="${BRAND_NAME}全站所有主要页面导航与教程索引">
    <meta property="og:url" content="${DOMAIN}/sitemap">
    <meta property="og:type" content="website">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/article.css">
    <style>
        .sitemap-box { background:#fff;border-radius:12px;padding:25px;margin-bottom:25px;border:1px solid #e5e7eb;box-shadow:0 2px 10px rgba(0,0,0,0.03); }
        .sitemap-box h2 { font-size:20px;color:#1f2937;margin-bottom:16px;border-bottom:2px solid #6366f1;padding-bottom:8px; }
        .sitemap-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;list-style:none;padding:0;margin:0; }
        .sitemap-grid a { display:block;padding:12px 16px;background:#f9fafb;border-radius:8px;color:#374151;text-decoration:none;transition:all 0.2s;font-size:14px;border:1px solid #f3f4f6; }
        .sitemap-grid a:hover { background:#eef2ff;color:#6366f1;border-color:#c7d2fe;transform:translateY(-2px); }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <a href="index.html" style="text-decoration:none;"><h1>${BRAND_NAME}</h1></a>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html">首页</a></li>
                <li><a href="articles.html">文章中心</a></li>
                <li><a href="faq.html">常见问题</a></li>
                <li><a href="tutorial-windows.html">教程指南</a></li>
                <li><a href="${AFF_LINK}" class="btn btn-primary" target="_blank" rel="noopener">立即注册</a></li>
            </ul>
        </div>
    </nav>

    <div class="container" style="max-width:1000px;margin:100px auto 60px;padding:0 20px;">
        <div style="text-align:center;margin-bottom:40px;">
            <h1 style="font-size:32px;font-weight:800;color:#1f2937;margin-bottom:12px;">🗺️ 网站地图 (Sitemap)</h1>
            <p style="color:#6b7280;font-size:16px;">快速浏览${BRAND_NAME}全部页面、使用教程与技术文章，助您轻松畅游网络</p>
        </div>
`;

allPagesForSitemap.forEach(group => {
  sitemapHtml += `        <div class="sitemap-box">
            <h2>${group.group}</h2>
            <ul class="sitemap-grid">
`;
  group.items.forEach(item => {
    sitemapHtml += `                <li><a href="${item.local}">📄 ${item.title}</a></li>\n`;
  });
  sitemapHtml += `            </ul>
        </div>
`;
});

sitemapHtml += `    </div>

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

fs.writeFileSync(path.join(rootDir, 'sitemap.html'), sitemapHtml);

console.log('--- 3. Rebuilding sitemap.xml with Clean URLs (no .html) for all pages ---');

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Flatten all items
const allXmlUrls = [];
allPagesForSitemap.forEach(g => {
  g.items.forEach(it => {
    allXmlUrls.push(it.url);
  });
});

for (const u of allXmlUrls) {
  let priority = '0.8';
  let changefreq = 'weekly';
  if (u === `${DOMAIN}/`) {
    priority = '1.0';
    changefreq = 'daily';
  } else if (u.endsWith('/articles') || u.endsWith('/faq')) {
    priority = '0.9';
    changefreq = 'daily';
  } else if (u.includes('tutorial-')) {
    priority = '0.85';
  } else if (u.endsWith('/privacy') || u.endsWith('/terms') || u.endsWith('/disclaimer') || u.endsWith('/sitemap')) {
    priority = '0.5';
    changefreq = 'monthly';
  }
  sitemapXml += `  <url>
    <loc>${u}</loc>
    <lastmod>2026-11-09</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
}
sitemapXml += `</urlset>\n`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml);

console.log(`Updated sitemap.xml with ${allXmlUrls.length} clean URLs!`);

