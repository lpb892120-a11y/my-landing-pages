const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const imgDir = path.join(__dirname, '..', 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// 1. Copy logo.svg if exists in bajiejichang.lat
const latLogo = path.resolve(__dirname, '../../bajiejichang.lat/assets/logo.svg');
if (fs.existsSync(latLogo)) {
  fs.copyFileSync(latLogo, path.join(imgDir, 'logo.svg'));
}

// 2. Copy icons from ssrdogjic.homes if available
const ssrImagesDir = path.resolve(__dirname, '../../ssrdogjic.homes/images');
const iconsToCopy = [
  'android-icon.svg', 'clash-party-icon.svg', 'discord-icon.svg',
  'icon-devices.svg', 'icon-global.svg', 'icon-line.svg', 'icon-price.svg',
  'icon-security.svg', 'icon-speed.svg', 'icon-support.svg', 'icon-unblock.svg',
  'ios-icon.svg', 'mac-icon.svg', 'router-icon.svg', 'telegram-icon.svg',
  'twitter-icon.svg', 'windows-icon.svg'
];

iconsToCopy.forEach(icon => {
  const src = path.join(ssrImagesDir, icon);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(imgDir, icon));
  }
});

// 3. Generate article SVG banners with 八戒机场 branding
const articlesMeta = [
  { id: 1, title: '2026年最新Clash机场推荐指南', tag: '机场推荐', color1: '#6366f1', color2: '#ec4899', subtitle: '八戒机场高性价比、稳定专线全面评测' },
  { id: 2, title: 'Clash完整使用教程与配置指南', tag: '客户端配置', color1: '#3b82f6', color2: '#10b981', subtitle: '从下载安装到节点分流规则从零精通' },
  { id: 3, title: '便宜高性价比机场推荐指南', tag: '性价比推荐', color1: '#8b5cf6', color2: '#f43f5e', subtitle: '月付19元起，适合学生与入门用户的科学上网方案' },
  { id: 4, title: '科学上网与网络加速完全指南', tag: '科学上网', color1: '#0ea5e9', color2: '#6366f1', subtitle: '协议解析、网络拓扑与专线原理全景科普' },
  { id: 5, title: 'AI工具访问与加速实战手册', tag: 'AI应用', color1: '#10b981', color2: '#06b6d4', subtitle: '深度解锁ChatGPT、Claude、Midjourney等热门工具' },
  { id: 6, title: 'Windows平台Clash配置与使用', tag: '系统教程', color1: '#f59e0b', color2: '#ef4444', subtitle: 'CFW / Clash Verge / Clash Party 极速上手' },
  { id: 7, title: 'iOS苹果设备Shadowrocket配置', tag: '移动端指南', color1: '#ec4899', color2: '#8b5cf6', subtitle: '小火箭订阅导入、分流策略与节点测速' },
  { id: 8, title: 'Netflix与流媒体全球解锁指南', tag: '流媒体解锁', color1: '#e11d48', color2: '#4f46e5', subtitle: '4K无缓冲畅看Disney+、HBO、YouTube Premium' },
  { id: 9, title: '网络连接常见问题与故障排查', tag: '问题排查', color1: '#14b8a6', color2: '#3b82f6', subtitle: '节点超时、DNS污染与连不上网快速修复指南' },
  { id: 10, title: '机场节点速度优化与低延迟调优', tag: '进阶调优', color1: '#6366f1', color2: '#a855f7', subtitle: 'BGP与IEPL内网专线延迟压降实测对比' }
];

articlesMeta.forEach(art => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="grad_${art.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${art.color1}" />
      <stop offset="100%" stop-color="${art.color2}" />
    </linearGradient>
    <linearGradient id="overlay_${art.id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.75"/>
    </linearGradient>
    <pattern id="grid_${art.id}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.08"/>
    </pattern>
  </defs>
  
  <rect width="800" height="450" fill="url(#grad_${art.id})"/>
  <rect width="800" height="450" fill="url(#grid_${art.id})"/>
  <rect width="800" height="450" fill="url(#overlay_${art.id})"/>
  
  <circle cx="700" cy="90" r="150" fill="#ffffff" fill-opacity="0.06"/>
  <circle cx="100" cy="380" r="120" fill="#ffffff" fill-opacity="0.04"/>
  
  <rect x="60" y="60" width="130" height="34" rx="17" fill="#ffffff" fill-opacity="0.2"/>
  <text x="75" y="82" fill="#ffffff" font-size="14" font-weight="700" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif">${art.tag}</text>
  <text x="740" y="82" fill="#e2e8f0" font-size="14" font-weight="600" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif" text-anchor="end">八戒机场 (bajiejichang.cfd)</text>

  <circle cx="690" cy="220" r="55" fill="#ffffff" fill-opacity="0.15" stroke="#ffffff" stroke-width="2" stroke-opacity="0.3"/>
  <text x="690" y="235" fill="#ffffff" font-size="38" text-anchor="middle">⚡</text>

  <text x="60" y="190" fill="#ffffff" font-size="32" font-weight="800" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif">
    ${art.title}
  </text>
  
  <text x="60" y="245" fill="#e2e8f0" font-size="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif">
    ${art.subtitle}
  </text>

  <g transform="translate(60, 350)">
    <rect x="0" y="0" width="680" height="48" rx="10" fill="#0f172a" fill-opacity="0.6" stroke="#ffffff" stroke-opacity="0.1"/>
    <circle cx="25" cy="24" r="4" fill="#10b981"/>
    <text x="38" y="29" fill="#f8fafc" font-size="13" font-weight="600" font-family="-apple-system, sans-serif">高速BGP专线</text>
    
    <circle cx="165" cy="24" r="4" fill="#38bdf8"/>
    <text x="178" y="29" fill="#f8fafc" font-size="13" font-weight="600" font-family="-apple-system, sans-serif">严格零日志</text>

    <circle cx="305" cy="24" r="4" fill="#a855f7"/>
    <text x="318" y="29" fill="#f8fafc" font-size="13" font-weight="600" font-family="-apple-system, sans-serif">Clash / Shadowrocket</text>

    <text x="660" y="29" fill="#fbbf24" font-size="13" font-weight="700" font-family="-apple-system, sans-serif" text-anchor="end">4K秒开 ★★★★★</text>
  </g>
</svg>`;
  fs.writeFileSync(path.join(imgDir, `article-${art.id}.svg`), svg);
});

// 4. Generate Tutorial SVGs
const tutorials = ['windows', 'mac', 'android', 'ios'];
tutorials.forEach((tut, idx) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="tut_grad_${tut}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#tut_grad_${tut})"/>
  <circle cx="700" cy="90" r="140" fill="#ffffff" fill-opacity="0.08"/>
  <rect x="60" y="60" width="140" height="34" rx="17" fill="#ffffff" fill-opacity="0.2"/>
  <text x="75" y="82" fill="#ffffff" font-size="14" font-weight="700" font-family="-apple-system, sans-serif">客户端教程</text>
  <text x="60" y="200" fill="#ffffff" font-size="36" font-weight="800" font-family="-apple-system, sans-serif">${tut.toUpperCase()} 平台 Clash 配置指南</text>
  <text x="60" y="260" fill="#e2e8f0" font-size="18" font-family="-apple-system, sans-serif">一键导入订阅，智能分流规则，极速稳定连接</text>
  <g transform="translate(60, 340)">
    <rect x="0" y="0" width="680" height="50" rx="10" fill="#0f172a" fill-opacity="0.5"/>
    <text x="25" y="30" fill="#38bdf8" font-size="15" font-weight="600" font-family="-apple-system, sans-serif">✓ 步骤详解</text>
    <text x="160" y="30" fill="#38bdf8" font-size="15" font-weight="600" font-family="-apple-system, sans-serif">✓ 常见报错解决</text>
    <text x="320" y="30" fill="#38bdf8" font-size="15" font-weight="600" font-family="-apple-system, sans-serif">✓ 官方客户端适配</text>
  </g>
</svg>`;
  fs.writeFileSync(path.join(imgDir, `tutorial-${tut}.svg`), svg);
});

// 5. Generate hero-dashboard.svg
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 550" width="900" height="550">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#312e81" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#1e293b" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="900" height="550" rx="20" fill="url(#bg)" stroke="#4338ca" stroke-width="2"/>
  <!-- Window Header -->
  <rect width="900" height="45" rx="20" fill="#1e1b4b"/>
  <circle cx="30" cy="23" r="6" fill="#ef4444"/>
  <circle cx="50" cy="23" r="6" fill="#f59e0b"/>
  <circle cx="70" cy="23" r="6" fill="#10b981"/>
  <text x="450" y="28" fill="#94a3b8" font-size="13" font-family="-apple-system, sans-serif" text-anchor="middle">八戒机场 Clash Dashboard - 状态监控</text>

  <!-- Sidebar -->
  <rect x="20" y="65" width="200" height="465" rx="12" fill="#0f172a" stroke="#334155"/>
  <text x="40" y="105" fill="#e2e8f0" font-size="15" font-weight="700">🚀 节点代理</text>
  <text x="40" y="145" fill="#94a3b8" font-size="14">⚡ 规则分流</text>
  <text x="40" y="185" fill="#94a3b8" font-size="14">📊 连接日志</text>
  <text x="40" y="225" fill="#94a3b8" font-size="14">⚙️ 系统设置</text>

  <!-- Main Content -->
  <g transform="translate(240, 65)">
    <!-- Status Card 1 -->
    <rect x="0" y="0" width="300" height="110" rx="12" fill="url(#cardGrad)" stroke="#6366f1" stroke-width="1.5"/>
    <text x="20" y="35" fill="#94a3b8" font-size="13">当前在线节点</text>
    <text x="20" y="75" fill="#38bdf8" font-size="28" font-weight="800">200+ 专线</text>
    <text x="20" y="98" fill="#10b981" font-size="12">● 99.99% SLA可用率</text>

    <!-- Status Card 2 -->
    <rect x="320" y="0" width="320" height="110" rx="12" fill="url(#cardGrad)" stroke="#ec4899" stroke-width="1.5"/>
    <text x="340" y="35" fill="#94a3b8" font-size="13">平均线路延迟</text>
    <text x="340" y="75" fill="#ec4899" font-size="28" font-weight="800">&lt; 35 ms</text>
    <text x="340" y="98" fill="#10b981" font-size="12">● BGP+IEPL 内网专线</text>

    <!-- Node list table -->
    <rect x="0" y="130" width="640" height="335" rx="12" fill="#0f172a" stroke="#334155"/>
    <text x="20" y="165" fill="#f8fafc" font-size="15" font-weight="700">精选快速专线 (实时测速)</text>

    <!-- Row 1 -->
    <rect x="15" y="185" width="610" height="45" rx="8" fill="#1e293b"/>
    <text x="30" y="213" fill="#ffffff" font-size="14">🇭🇰 香港 01 [BGP专线 | 4K流媒体 | ChatGPT]</text>
    <text x="590" y="213" fill="#10b981" font-size="14" font-weight="700" text-anchor="end">28ms 🟢</text>

    <!-- Row 2 -->
    <rect x="15" y="240" width="610" height="45" rx="8" fill="#1e293b"/>
    <text x="30" y="268" fill="#ffffff" font-size="14">🇯🇵 日本 01 [CN2 GIA | 低延迟游戏专线]</text>
    <text x="590" y="268" fill="#10b981" font-size="14" font-weight="700" text-anchor="end">36ms 🟢</text>

    <!-- Row 3 -->
    <rect x="15" y="295" width="610" height="45" rx="8" fill="#1e293b"/>
    <text x="30" y="323" fill="#ffffff" font-size="14">🇸🇬 新加坡 01 [原生IP | TikTok | Netflix 解锁]</text>
    <text x="590" y="323" fill="#10b981" font-size="14" font-weight="700" text-anchor="end">42ms 🟢</text>

    <!-- Row 4 -->
    <rect x="15" y="350" width="610" height="45" rx="8" fill="#1e293b"/>
    <text x="30" y="378" fill="#ffffff" font-size="14">🇺🇸 美国 01 [AI原生专线 | Claude | Sora 解锁]</text>
    <text x="590" y="378" fill="#38bdf8" font-size="14" font-weight="700" text-anchor="end">118ms 🟢</text>
  </g>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'hero-dashboard.svg'), heroSvg);

// 6. Generate lightweight PNG/JPG fallbacks for backwards compatibility
function generateMinimalPng(filePath, r, g, b) {
  const width = 100, height = 60;
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const t = Buffer.from(type);
    
    // CRC calculation
    let c = 0xffffffff;
    const buf = Buffer.concat([t, data]);
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ ((c & 1) ? 0xedb88320 : 0);
      }
    }
    c ^= 0xffffffff;
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(c >>> 0, 0);
    return Buffer.concat([len, t, data, crc]);
  }

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 2; // RGB
  ihdrData[10] = 0; ihdrData[11] = 0; ihdrData[12] = 0;
  const ihdr = chunk('IHDR', ihdrData);

  const rowLen = width * 3 + 1;
  const raw = Buffer.alloc(rowLen * height);
  for (let y = 0; y < height; y++) {
    raw[y * rowLen] = 0;
    for (let x = 0; x < width; x++) {
      const idx = y * rowLen + 1 + x * 3;
      raw[idx] = r; raw[idx+1] = g; raw[idx+2] = b;
    }
  }
  const idat = chunk('IDAT', zlib.deflateSync(raw));
  const iend = chunk('IEND', Buffer.alloc(0));

  fs.writeFileSync(filePath, Buffer.concat([header, ihdr, idat, iend]));
}

// Write fallbacks
generateMinimalPng(path.join(imgDir, 'logo.png'), 99, 102, 241);
generateMinimalPng(path.join(imgDir, 'hero-dashboard.png'), 30, 27, 75);

for (let i = 1; i <= 10; i++) {
  // create article-i.jpg (can be valid PNG renamed or simple binary)
  generateMinimalPng(path.join(imgDir, `article-${i}.jpg`), 79, 70, 229);
  generateMinimalPng(path.join(imgDir, `article-${i}.png`), 79, 70, 229);
}

tutorials.forEach(t => {
  generateMinimalPng(path.join(imgDir, `tutorial-${t}.jpg`), 99, 102, 241);
});

console.log('Successfully generated all image assets and SVGs for bajiejichang.cfd');

