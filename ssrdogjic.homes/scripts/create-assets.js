const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'images');
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

// 1. Logo
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="50%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#6366f1" flood-opacity="0.4"/>
    </filter>
  </defs>
  <rect width="100" height="100" rx="24" fill="url(#logoGrad)" filter="url(#glow)"/>
  <!-- Dog Face / Rocket Stylized Shape -->
  <path d="M28 32 L38 20 C40 18 45 22 43 28 L50 25 L57 28 C55 22 60 18 62 20 L72 32 C78 40 76 56 68 68 C60 78 50 82 50 82 C50 82 40 78 32 68 C24 56 22 40 28 32 Z" fill="#ffffff" opacity="0.95"/>
  <!-- Ears & Detail -->
  <circle cx="39" cy="46" r="4.5" fill="#1e1b4b"/>
  <circle cx="61" cy="46" r="4.5" fill="#1e1b4b"/>
  <circle cx="40.5" cy="44.5" r="1.5" fill="#ffffff"/>
  <circle cx="62.5" cy="44.5" r="1.5" fill="#ffffff"/>
  <!-- Cute Nose / Jet nozzle -->
  <path d="M46 54 L54 54 C54 54 55 60 50 63 C45 60 46 54 46 54 Z" fill="#ec4899"/>
  <!-- Lightning flash forehead -->
  <polygon points="50,28 47,38 52,38 49,46 54,36 49,36" fill="#fbbf24"/>
</svg>`;

// 2. Hero Dashboard
const heroDashboardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="50%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#6366f1" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Outer Window Frame -->
  <rect x="20" y="20" width="760" height="480" rx="16" fill="url(#bgGrad)" stroke="#334155" stroke-width="2" filter="url(#softGlow)"/>
  
  <!-- Window Header -->
  <rect x="20" y="20" width="760" height="46" rx="16" fill="#1e293b"/>
  <rect x="20" y="50" width="760" height="16" fill="#1e293b"/>
  <circle cx="50" cy="43" r="6" fill="#ef4444"/>
  <circle cx="70" cy="43" r="6" fill="#f59e0b"/>
  <circle cx="90" cy="43" r="6" fill="#10b981"/>
  <text x="400" y="48" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle" font-weight="600">ssrdog Client - 智能规则分流 (Rule Mode)</text>

  <!-- Left Sidebar -->
  <rect x="20" y="66" width="180" height="434" fill="#0f172a" opacity="0.7"/>
  <rect x="35" y="90" width="150" height="36" rx="8" fill="#312e81"/>
  <text x="60" y="113" fill="#ffffff" font-size="13" font-weight="600" font-family="system-ui">🚀 节点代理</text>
  <text x="60" y="155" fill="#94a3b8" font-size="13" font-family="system-ui">📋 订阅配置</text>
  <text x="60" y="195" fill="#94a3b8" font-size="13" font-family="system-ui">🌐 规则分流</text>
  <text x="60" y="235" fill="#94a3b8" font-size="13" font-family="system-ui">📊 实时测速</text>
  <text x="60" y="275" fill="#94a3b8" font-size="13" font-family="system-ui">⚙️ 系统设置</text>

  <!-- Main Content Dashboard -->
  <!-- Top Stat Cards -->
  <g transform="translate(220, 85)">
    <!-- Card 1 -->
    <rect x="0" y="0" width="160" height="80" rx="10" fill="url(#cardGrad)" stroke="#334155" stroke-width="1"/>
    <text x="16" y="28" fill="#94a3b8" font-size="11" font-family="system-ui">当前实时下载</text>
    <text x="16" y="58" fill="#38bdf8" font-size="20" font-weight="700" font-family="system-ui">48.6 MB/s</text>

    <!-- Card 2 -->
    <rect x="180" y="0" width="160" height="80" rx="10" fill="url(#cardGrad)" stroke="#334155" stroke-width="1"/>
    <text x="196" y="28" fill="#94a3b8" font-size="11" font-family="system-ui">专线平均延迟</text>
    <text x="196" y="58" fill="#4ade80" font-size="20" font-weight="700" font-family="system-ui">16 ms</text>

    <!-- Card 3 -->
    <rect x="360" y="0" width="170" height="80" rx="10" fill="url(#cardGrad)" stroke="#334155" stroke-width="1"/>
    <text x="376" y="28" fill="#94a3b8" font-size="11" font-family="system-ui">流媒体解锁状态</text>
    <text x="376" y="58" fill="#c084fc" font-size="16" font-weight="700" font-family="system-ui">4K HDR 全部解锁</text>
  </g>

  <!-- Middle Nodes List -->
  <g transform="translate(220, 185)">
    <text x="0" y="20" fill="#f8fafc" font-size="14" font-weight="700" font-family="system-ui">专线优质节点 (IPLC / IEPL 全球专线)</text>

    <!-- Node 1 -->
    <rect x="0" y="35" width="530" height="50" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/>
    <circle cx="25" cy="60" r="5" fill="#22c55e"/>
    <text x="45" y="65" fill="#ffffff" font-size="13" font-weight="600" font-family="system-ui">🇭🇰 香港 01 [IPLC 高速专线] - 8K YouTube/ChatGPT</text>
    <rect x="445" y="48" width="65" height="24" rx="12" fill="#065f46"/>
    <text x="477" y="64" fill="#6ee7b7" font-size="12" font-weight="700" font-family="system-ui" text-anchor="middle">14 ms</text>

    <!-- Node 2 -->
    <rect x="0" y="95" width="530" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <circle cx="25" cy="120" r="5" fill="#22c55e"/>
    <text x="45" y="125" fill="#e2e8f0" font-size="13" font-family="system-ui">🇯🇵 日本 02 [原生IP/低延迟] - Netflix / Disney+ / Claude</text>
    <rect x="445" y="108" width="65" height="24" rx="12" fill="#065f46"/>
    <text x="477" y="124" fill="#6ee7b7" font-size="12" font-weight="700" font-family="system-ui" text-anchor="middle">32 ms</text>

    <!-- Node 3 -->
    <rect x="0" y="155" width="530" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <circle cx="25" cy="180" r="5" fill="#22c55e"/>
    <text x="45" y="185" fill="#e2e8f0" font-size="13" font-family="system-ui">🇸🇬 新加坡 01 [跨境电商/Shopee/TikTok] - 极速专线</text>
    <rect x="445" y="168" width="65" height="24" rx="12" fill="#065f46"/>
    <text x="477" y="184" fill="#6ee7b7" font-size="12" font-weight="700" font-family="system-ui" text-anchor="middle">38 ms</text>

    <!-- Node 4 -->
    <rect x="0" y="215" width="530" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <circle cx="25" cy="240" r="5" fill="#22c55e"/>
    <text x="45" y="245" fill="#e2e8f0" font-size="13" font-family="system-ui">🇺🇸 美国 01 [ChatGPT/Sora/Midjourney 原生专线]</text>
    <rect x="445" y="228" width="65" height="24" rx="12" fill="#1e3a5f"/>
    <text x="477" y="244" fill="#38bdf8" font-size="12" font-weight="700" font-family="system-ui" text-anchor="middle">115 ms</text>
  </g>
</svg>`;

// Feature & platform icons
const icons = {
  'icon-speed.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-zap" color="#6366f1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  'icon-security.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-shield" color="#10b981"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
  'icon-devices.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="#3b82f6"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
  'icon-support.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="#f59e0b"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
  'icon-price.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="#ec4899"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 6v12"></path></svg>`,
  'icon-global.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="#8b5cf6"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
  'icon-unblock.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="#06b6d4"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
  'icon-line.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="#10b981"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,

  'windows-icon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0078d4"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>`,
  'mac-icon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1e293b"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.88c.63-.76 1.06-1.82.95-2.88-.91.04-2.02.61-2.67 1.37-.58.67-1.09 1.75-.95 2.79 1.02.08 2.04-.52 2.67-1.28z"/></svg>`,
  'ios-icon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
  'android-icon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3ddc84"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.0664 12 8.0664c-1.8534 0-3.5902.3452-5.1368.8833L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/></svg>`,
  'clash-party-icon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  'router-icon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="14" width="20" height="8" rx="2"></rect><path d="M6 18h.01"></path><path d="M10 18h.01"></path><path d="M6 14V8"></path><path d="M18 14V4"></path><path d="M14 14V6"></path></svg>`,

  'telegram-icon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0088cc"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>`,
  'discord-icon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  'twitter-icon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1DA1F2"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>`
};

// Function to generate thematic article SVG
function generateArticleSvg(title, subtitle, tag, color1, color2, iconType) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
    <defs>
      <linearGradient id="bg_${color1.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
      <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.8"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.08"/>
      </pattern>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="450" fill="url(#bg_${color1.replace('#','')})"/>
    <rect width="800" height="450" fill="url(#grid)"/>
    <rect width="800" height="450" fill="url(#overlay)"/>
    
    <!-- Decorative dynamic circles -->
    <circle cx="700" cy="100" r="160" fill="#ffffff" fill-opacity="0.05"/>
    <circle cx="120" cy="380" r="120" fill="#ffffff" fill-opacity="0.04"/>
    
    <!-- Tag Pill -->
    <rect x="60" y="60" width="${tag.length * 18 + 40}" height="34" rx="17" fill="#ffffff" fill-opacity="0.2"/>
    <text x="75" y="82" fill="#ffffff" font-size="14" font-weight="700" font-family="-apple-system, BlinkMacSystemFont, sans-serif">${tag}</text>
    <text x="720" y="82" fill="#e2e8f0" font-size="14" font-weight="600" font-family="sans-serif" text-anchor="end">ssrdog 权威技术指南</text>

    <!-- Center Icon Graphic Badge -->
    <circle cx="700" cy="220" r="60" fill="#ffffff" fill-opacity="0.15" stroke="#ffffff" stroke-width="2" stroke-opacity="0.3"/>
    <text x="700" y="235" fill="#ffffff" font-size="40" text-anchor="middle">${iconType}</text>

    <!-- Main Title Lines -->
    <text x="60" y="190" fill="#ffffff" font-size="34" font-weight="800" font-family="-apple-system, BlinkMacSystemFont, 'Microsoft YaHei', sans-serif">
      ${title}
    </text>
    
    <!-- Subtitle -->
    <text x="60" y="245" fill="#e2e8f0" font-size="18" font-family="-apple-system, BlinkMacSystemFont, 'Microsoft YaHei', sans-serif">
      ${subtitle}
    </text>

    <!-- Feature Dots Bar -->
    <g transform="translate(60, 350)">
      <rect x="0" y="0" width="680" height="48" rx="10" fill="#0f172a" fill-opacity="0.6" stroke="#ffffff" stroke-opacity="0.1"/>
      <circle cx="25" cy="24" r="4" fill="#10b981"/>
      <text x="38" y="29" fill="#f8fafc" font-size="13" font-weight="600" font-family="sans-serif">高速专线</text>
      
      <circle cx="145" cy="24" r="4" fill="#38bdf8"/>
      <text x="158" y="29" fill="#f8fafc" font-size="13" font-weight="600" font-family="sans-serif">零日志隐私</text>

      <circle cx="285" cy="24" r="4" fill="#a855f7"/>
      <text x="298" y="29" fill="#f8fafc" font-size="13" font-weight="600" font-family="sans-serif">Clash / Clash Party</text>

      <text x="660" y="29" fill="#fbbf24" font-size="13" font-weight="700" font-family="sans-serif" text-anchor="end">2026 最新评测标准 ★★★★★</text>
    </g>
  </svg>`;
}

// 10 Article banners
const articles = [
  {
    filename: 'article-1.svg',
    title: '2026年稳定Clash机场推荐指南',
    subtitle: '如何挑选高速稳定、安全好用的科学上网节点？',
    tag: '机场选购评测',
    color1: '#4f46e5',
    color2: '#06b6d4',
    icon: '⚡'
  },
  {
    filename: 'article-2.svg',
    title: '便宜机场推荐避坑手册',
    subtitle: '高性价比科学上网魔法梯子选购实测',
    tag: '性价比与避坑',
    color1: '#059669',
    color2: '#10b981',
    icon: '💰'
  },
  {
    filename: 'article-3.svg',
    title: 'Clash Party 客户端新手完整配置教程',
    subtitle: '现代化UI与节点订阅一键导入深度解析',
    tag: '客户端实战教学',
    color1: '#7c3aed',
    color2: '#db2777',
    icon: '🚀'
  },
  {
    filename: 'article-4.svg',
    title: '外贸出海与跨境电商独立站加速指南',
    subtitle: '安全稳定不跳IP的科学上网机场选购方案',
    tag: '跨境出海方案',
    color1: '#0284c7',
    color2: '#2563eb',
    icon: '🌐'
  },
  {
    filename: 'article-5.svg',
    title: '4K/8K流媒体与ChatGPT解锁方案',
    subtitle: '低延迟高带宽稳定节点推荐与分流配置',
    tag: '流媒体与AI',
    color1: '#dc2626',
    color2: '#f59e0b',
    icon: '🎬'
  },
  {
    filename: 'article-6.svg',
    title: 'Clash节点订阅更新失败与报错排查',
    subtitle: '端口冲突/无法联网/403/SSL错误全排查手册',
    tag: '故障排查全集',
    color1: '#d97706',
    color2: '#b45309',
    icon: '🛠️'
  },
  {
    filename: 'article-7.svg',
    title: '什么是IPLC/IEPL内网专线？',
    subtitle: '深度拆解为什么高端科学上网机场推荐专线节点',
    tag: '专线网络硬核科普',
    color1: '#4338ca',
    color2: '#6d28d9',
    icon: '🔌'
  },
  {
    filename: 'article-8.svg',
    title: '全平台科学上网与魔法梯子客户端合集',
    subtitle: 'Windows / Mac / iOS / Android 客户端配置实战',
    tag: '全平台终端教程',
    color1: '#0d9488',
    color2: '#0891b2',
    icon: '💻'
  },
  {
    filename: 'article-9.svg',
    title: '畅享ChatGPT与Claude等AI工具',
    subtitle: 'AI开发者安全机场选购与原生IP节点实测',
    tag: 'AI大模型加速',
    color1: '#9333ea',
    color2: '#4f46e5',
    icon: '🤖'
  },
  {
    filename: 'article-10.svg',
    title: 'Clash机场与传统VPN有什么区别？',
    subtitle: '科学上网速度、安全与分流机制深度全对比',
    tag: '技术原理深度对比',
    color1: '#1e293b',
    color2: '#334155',
    icon: '⚖️'
  }
];

// Write files
fs.writeFileSync(path.join(imgDir, 'logo.svg'), logoSvg);
fs.writeFileSync(path.join(imgDir, 'hero-dashboard.svg'), heroDashboardSvg);

for (const [name, content] of Object.entries(icons)) {
  fs.writeFileSync(path.join(imgDir, name), content);
}

for (const art of articles) {
  const svg = generateArticleSvg(art.title, art.subtitle, art.tag, art.color1, art.color2, art.icon);
  fs.writeFileSync(path.join(imgDir, art.filename), svg);
}

console.log('Successfully generated all image assets in /images');
