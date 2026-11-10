const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

// 1. Hero banner illustration
const heroBannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 480" width="100%" height="auto" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#070b14" />
    </linearGradient>
    <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.1" />
      <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#818cf8" stop-opacity="0.2" />
    </linearGradient>
    <linearGradient id="hudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="1000" height="480" rx="20" fill="url(#bgGrad)" stroke="#1e293b" stroke-width="2"/>

  <!-- Grid Lines -->
  <g stroke="#334155" stroke-width="1" opacity="0.25">
    <line x1="100" y1="0" x2="100" y2="480" />
    <line x1="250" y1="0" x2="250" y2="480" />
    <line x1="400" y1="0" x2="400" y2="480" />
    <line x1="550" y1="0" x2="550" y2="480" />
    <line x1="700" y1="0" x2="700" y2="480" />
    <line x1="850" y1="0" x2="850" y2="480" />
    <line x1="0" y1="80" x2="1000" y2="80" />
    <line x1="0" y1="180" x2="1000" y2="180" />
    <line x1="0" y1="280" x2="1000" y2="280" />
    <line x1="0" y1="380" x2="1000" y2="380" />
  </g>

  <!-- Global Topology Paths -->
  <path d="M120 340 C 280 180, 420 400, 580 220 S 780 120, 900 240" stroke="url(#cyanLine)" stroke-width="4" fill="none" filter="url(#glow)"/>
  <path d="M140 180 C 320 280, 520 120, 680 320 S 840 200, 920 300" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="8 6" opacity="0.6" fill="none"/>

  <!-- Nodes -->
  <g filter="url(#glow)">
    <circle cx="120" cy="340" r="9" fill="#38bdf8" />
    <circle cx="280" cy="220" r="7" fill="#60a5fa" />
    <circle cx="440" cy="300" r="8" fill="#818cf8" />
    <circle cx="580" cy="220" r="11" fill="#38bdf8" stroke="#fff" stroke-width="2"/>
    <circle cx="750" cy="160" r="8" fill="#a78bfa" />
    <circle cx="900" cy="240" r="9" fill="#34d399" />
  </g>

  <!-- Labels on Nodes -->
  <text x="120" y="375" fill="#94a3b8" font-size="13" font-family="sans-serif" text-anchor="middle">香港 HKG-01 (18ms)</text>
  <text x="280" y="195" fill="#94a3b8" font-size="13" font-family="sans-serif" text-anchor="middle">东京 TYO-02 (42ms)</text>
  <text x="580" y="260" fill="#38bdf8" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">流量光 IEPL专线中继枢纽</text>
  <text x="750" y="135" fill="#94a3b8" font-size="13" font-family="sans-serif" text-anchor="middle">新加坡 SIN-01 (35ms)</text>
  <text x="900" y="275" fill="#34d399" font-size="13" font-family="sans-serif" text-anchor="middle">洛杉矶 SJC-03 (125ms)</text>

  <!-- Floating HUD Card 1 -->
  <rect x="70" y="60" width="220" height="90" rx="12" fill="#0f172a" fill-opacity="0.85" stroke="#38bdf8" stroke-width="1.2"/>
  <circle cx="95" cy="88" r="6" fill="#10b981"/>
  <text x="110" y="93" fill="#f8fafc" font-size="14" font-weight="bold" font-family="sans-serif">全节点低延迟监控</text>
  <text x="95" y="125" fill="#38bdf8" font-size="20" font-weight="bold" font-family="monospace">99.98% 连通率</text>

  <!-- Floating HUD Card 2 -->
  <rect x="710" y="330" width="230" height="95" rx="12" fill="#0f172a" fill-opacity="0.85" stroke="#8b5cf6" stroke-width="1.2"/>
  <text x="730" y="365" fill="#a78bfa" font-size="13" font-weight="bold" font-family="sans-serif">⚡ 全球 BGP / 跨境专线</text>
  <text x="730" y="398" fill="#f8fafc" font-size="22" font-weight="bold" font-family="monospace">10,000 Mbps</text>
</svg>`;
fs.writeFileSync(path.join(imagesDir, 'hero-banner.svg'), heroBannerSvg);

// 2. Tutorial Previews
const clashSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="100%" height="auto" fill="none">
  <rect width="600" height="360" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
  <rect x="20" y="20" width="560" height="40" rx="8" fill="#1e293b"/>
  <circle cx="45" cy="40" r="6" fill="#ef4444"/>
  <circle cx="65" cy="40" r="6" fill="#f59e0b"/>
  <circle cx="85" cy="40" r="6" fill="#10b981"/>
  <text x="300" y="45" fill="#94a3b8" font-size="13" font-family="sans-serif" text-anchor="middle">Clash Verge Rev / Clash 控制面板</text>

  <rect x="30" y="80" width="160" height="250" rx="10" fill="#141e33" stroke="#334155"/>
  <text x="50" y="115" fill="#38bdf8" font-size="14" font-weight="bold" font-family="sans-serif">节点选择</text>
  <rect x="45" y="135" width="130" height="32" rx="6" fill="#0ea5e9" fill-opacity="0.2" stroke="#38bdf8"/>
  <text x="60" y="156" fill="#fff" font-size="12" font-family="sans-serif">🇭🇰 香港 IEPL 专线 01</text>
  <rect x="45" y="177" width="130" height="32" rx="6" fill="#1e293b"/>
  <text x="60" y="198" fill="#94a3b8" font-size="12" font-family="sans-serif">🇯🇵 日本 02 [流媒体解锁]</text>
  <rect x="45" y="219" width="130" height="32" rx="6" fill="#1e293b"/>
  <text x="60" y="240" fill="#94a3b8" font-size="12" font-family="sans-serif">🇺🇸 美国 01 [ChatGPT/Claude]</text>

  <rect x="210" y="80" width="360" height="250" rx="10" fill="#141e33" stroke="#334155"/>
  <text x="230" y="115" fill="#f8fafc" font-size="15" font-weight="bold" font-family="sans-serif">流量光 智能分流规则 (Rule Mode)</text>
  <rect x="230" y="135" width="320" height="42" rx="6" fill="#1e293b"/>
  <text x="245" y="161" fill="#e2e8f0" font-size="13" font-family="sans-serif">国内域名 (Bilibili / 百度 / 微信) ➔ 直连 (Direct)</text>
  <rect x="230" y="190" width="320" height="42" rx="6" fill="#1e293b"/>
  <text x="245" y="216" fill="#38bdf8" font-size="13" font-family="sans-serif">海外站点 (Google / YouTube / GitHub) ➔ 专线节点</text>
  <rect x="230" y="245" width="320" height="42" rx="6" fill="#1e293b"/>
  <text x="245" y="271" fill="#a78bfa" font-size="13" font-family="sans-serif">AI 工具 (OpenAI / Claude / Copilot) ➔ 原生专线</text>
</svg>`;
fs.writeFileSync(path.join(imagesDir, 'clash-preview.svg'), clashSvg);

const clashPartySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="100%" height="auto" fill="none">
  <defs>
    <linearGradient id="partyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>
  </defs>
  <rect width="600" height="360" rx="16" fill="#0b0f19" stroke="#1e293b" stroke-width="2"/>
  <rect x="20" y="20" width="560" height="40" rx="8" fill="#1e293b"/>
  <text x="40" y="45" fill="#38bdf8" font-weight="bold" font-size="14" font-family="sans-serif">Clash Party 新一代全平台客户端</text>
  
  <rect x="30" y="80" width="540" height="100" rx="12" fill="#111827" stroke="#374151"/>
  <text x="50" y="115" fill="#9ca3af" font-size="13" font-family="sans-serif">当前订阅源配置状态</text>
  <text x="50" y="145" fill="#34d399" font-size="18" font-weight="bold" font-family="sans-serif">● 流量光官网 VIP 订阅 [已同步更新]</text>
  <text x="430" y="145" fill="#94a3b8" font-size="12" font-family="sans-serif">剩余流量: 480G / 500G</text>

  <rect x="30" y="200" width="255" height="130" rx="12" fill="#111827" stroke="#374151"/>
  <text x="50" y="235" fill="#f8fafc" font-size="15" font-weight="bold" font-family="sans-serif">极简一键直连</text>
  <rect x="50" y="255" width="215" height="48" rx="8" fill="url(#partyGrad)"/>
  <text x="157" y="285" fill="#fff" font-size="15" font-weight="bold" font-family="sans-serif" text-anchor="middle">已开启代理守护</text>

  <rect x="315" y="200" width="255" height="130" rx="12" fill="#111827" stroke="#374151"/>
  <text x="335" y="235" fill="#f8fafc" font-size="15" font-weight="bold" font-family="sans-serif">实时测速与健康检查</text>
  <text x="335" y="265" fill="#38bdf8" font-size="13" font-family="sans-serif">延迟测试: 全部节点正常 (平均 26ms)</text>
  <text x="335" y="295" fill="#a78bfa" font-size="13" font-family="sans-serif">协议: Hysteria2 / Shadowsocks / Vless</text>
</svg>`;
fs.writeFileSync(path.join(imagesDir, 'clash-party-preview.svg'), clashPartySvg);

// 3. 10 Articles SVG Covers
const articlesData = [
  { id: 1, title: 'Clash Party 客户端教程', tag: '新手上手', icon: '🚀', color1: '#0ea5e9', color2: '#38bdf8' },
  { id: 2, title: '便宜机场与稳定节点避坑', tag: '选购指南', icon: '🛡️', color1: '#6366f1', color2: '#8b5cf6' },
  { id: 3, title: '翻墙出海与全球加速指南', tag: '4K/游戏加速', icon: '⚡', color1: '#ec4899', color2: '#f43f5e' },
  { id: 4, title: 'AI 专线与原生 IP 挑选', tag: 'ChatGPT/Claude', icon: '🤖', color1: '#10b981', color2: '#34d399' },
  { id: 5, title: '跨境电商与外贸防封攻略', tag: '外贸出海', icon: '🌐', color1: '#f59e0b', color2: '#fbbf24' },
  { id: 6, title: 'Shadowsocks/Trojan/Hy2对比', tag: '协议解析', icon: '⚙️', color1: '#06b6d4', color2: '#22d3ee' },
  { id: 7, title: 'Clash 停更替代品横评', tag: '内核进阶', icon: '💻', color1: '#8b5cf6', color2: '#c084fc' },
  { id: 8, title: 'iOS与Android多端协同', tag: '移动端指南', icon: '📱', color1: '#3b82f6', color2: '#60a5fa' },
  { id: 9, title: '安全防踩雷：防日志泄露', tag: '隐私保护', icon: '🔒', color1: '#ef4444', color2: '#f87171' },
  { id: 10, title: '免费梯子 vs 付费机场实测', tag: '深度科普', icon: '📊', color1: '#14b8a6', color2: '#2dd4bf' }
];

articlesData.forEach(item => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="100%" height="auto" fill="none">
    <defs>
      <linearGradient id="grad${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${item.color1}" />
        <stop offset="100%" stop-color="${item.color2}" />
      </linearGradient>
      <pattern id="gridPattern${item.id}" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" stroke-width="1" stroke-opacity="0.4"/>
      </pattern>
    </defs>
    <rect width="640" height="360" fill="#090d16"/>
    <rect width="640" height="360" fill="url(#gridPattern${item.id})"/>
    <circle cx="530" cy="100" r="140" fill="${item.color1}" fill-opacity="0.12" filter="blur(40px)"/>
    <circle cx="100" cy="280" r="100" fill="${item.color2}" fill-opacity="0.1" filter="blur(40px)"/>
    
    <!-- Badge -->
    <rect x="40" y="40" width="120" height="30" rx="15" fill="rgba(255,255,255,0.06)" stroke="${item.color1}" stroke-width="1.2"/>
    <text x="100" y="60" fill="${item.color2}" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">${item.tag}</text>

    <!-- Main Title -->
    <text x="40" y="160" fill="#ffffff" font-size="28" font-weight="bold" font-family="sans-serif">${item.title}</text>
    <text x="40" y="200" fill="#94a3b8" font-size="15" font-family="sans-serif">流量光官网 · 权威极速实测与高品质节点专栏</text>

    <!-- Graphic element -->
    <g transform="translate(480, 200)">
      <circle cx="0" cy="0" r="50" fill="url(#grad${item.id})" fill-opacity="0.2" stroke="${item.color1}" stroke-width="2"/>
      <text x="0" y="14" font-size="38" text-anchor="middle">${item.icon}</text>
    </g>

    <!-- Footer meta -->
    <line x1="40" y1="290" x2="600" y2="290" stroke="#1e293b" stroke-width="1"/>
    <text x="40" y="325" fill="#64748b" font-size="13" font-family="sans-serif">Liuliangguang Official Blog · 1800+ 字全攻略</text>
    <text x="590" y="325" fill="${item.color2}" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="end">阅读文章 →</text>
  </svg>`;
  fs.writeFileSync(path.join(imagesDir, `article-${item.id}.svg`), svg);
});

console.log('All SVG assets generated successfully!');
