const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const DOMAIN = 'https://bajiejichang.cfd';

function getAllHtmlFiles(dir, list = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.git' && item.name !== 'scripts') {
        getAllHtmlFiles(full, list);
      }
    } else if (item.name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const htmlFiles = getAllHtmlFiles(rootDir);
console.log(`Processing ${htmlFiles.length} HTML files...`);

for (const file of htmlFiles) {
  let raw = fs.readFileSync(file);
  let content = (raw[0] === 0xff && raw[1] === 0xfe) ? raw.toString('utf16le') : raw.toString('utf8');
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);

  // Compute clean URL path
  const rel = path.relative(rootDir, file).replace(/\\/g, '/');
  let cleanPath = rel.replace(/\.html$/, '');
  let targetCleanUrl = (cleanPath === 'index') ? `${DOMAIN}/` : `${DOMAIN}/${cleanPath}`;

  // 1. Remove any old canonical tag
  content = content.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');
  // Remove any old hreflang
  content = content.replace(/<link\s+rel=["']alternate["']\s+hreflang=[^>]*>/gi, '');

  // 2. Add proper clean canonical tag and hreflang right before </head> or after <title>
  const canonicalBlock = `    <link rel="canonical" href="${targetCleanUrl}">\n    <link rel="alternate" hreflang="zh-CN" href="${targetCleanUrl}">\n    <link rel="alternate" hreflang="x-default" href="${targetCleanUrl}">`;

  if (content.includes('</head>')) {
    content = content.replace('</head>', `${canonicalBlock}\n</head>`);
  }

  // 3. Clean up JSON-LD URLs: replace https://bajiejichang.cfd/...html with clean url
  content = content.replace(/https:\/\/bajiejichang\.cfd\/([a-zA-Z0-9_\-\/]+)\.html/g, 'https://bajiejichang.cfd/$1');

  // 4. Fix specific broken links
  content = content.replace(/clash-vs-vpn\.html/g, 'vpn-proxy-knowledge.html');
  content = content.replace(/scientific-internet-guide\.html/g, 'scientific-internet-complete-guide.html');
  content = content.replace(/stable-airport-selection\.html/g, 'airport-selection-guide.html');
  content = content.replace(/clash-party-tutorial\.html/g, 'tutorial-clash-party.html');
  content = content.replace(/clash-rules-configuration\.html/g, 'router-proxy-setup.html');
  content = content.replace(/vpn-vs-proxy-comparison\.html/g, 'vpn-proxy-knowledge.html');

  // In faq.html: replace any reference to sitemap.html with working link
  // Ensure image fallbacks
  content = content.replace(/src=["'](\.\.\/)?images\/logo\.png["']/g, 'src="$1images/logo.svg"');

  // 5. Write back in pure UTF-8 without BOM
  fs.writeFileSync(file, content, 'utf8');
}

console.log('Successfully standardized canonical tags, hreflang, and links across all HTML files!');

