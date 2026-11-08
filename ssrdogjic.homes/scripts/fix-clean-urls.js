const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Update sitemap.xml
const sitemapPath = path.join(rootDir, 'sitemap.xml');
const urls = [
  'https://ssrdogjic.homes/',
  'https://ssrdogjic.homes/tutorials',
  'https://ssrdogjic.homes/tutorial-windows',
  'https://ssrdogjic.homes/tutorial-mac',
  'https://ssrdogjic.homes/tutorial-ios',
  'https://ssrdogjic.homes/tutorial-android',
  'https://ssrdogjic.homes/tutorial-clash-party',
  'https://ssrdogjic.homes/articles',
  'https://ssrdogjic.homes/articles/clash-airport-recommendation-guide',
  'https://ssrdogjic.homes/articles/cheap-reliable-airport-selection',
  'https://ssrdogjic.homes/articles/clash-party-beginner-tutorial',
  'https://ssrdogjic.homes/articles/foreign-trade-cross-border-airport',
  'https://ssrdogjic.homes/articles/streaming-4k-netflix-airport',
  'https://ssrdogjic.homes/articles/clash-node-subscription-troubleshooting',
  'https://ssrdogjic.homes/articles/iplc-iepl-dedicated-line-airport',
  'https://ssrdogjic.homes/articles/mobile-pc-cross-platform-clash-guide',
  'https://ssrdogjic.homes/articles/ai-tools-chatgpt-claude-airport-nodes',
  'https://ssrdogjic.homes/articles/clash-vs-traditional-vpn-comparison',
  'https://ssrdogjic.homes/faq',
  'https://ssrdogjic.homes/privacy',
  'https://ssrdogjic.homes/terms',
  'https://ssrdogjic.homes/disclaimer',
  'https://ssrdogjic.homes/sitemap'
];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (const u of urls) {
  let priority = '0.8';
  let changefreq = 'weekly';
  if (u === 'https://ssrdogjic.homes/') {
    priority = '1.0';
    changefreq = 'daily';
  } else if (u.endsWith('/tutorials') || u.endsWith('/articles')) {
    priority = '0.9';
    changefreq = 'daily';
  } else if (u.includes('tutorial-')) {
    priority = '0.85';
  } else if (u.endsWith('/privacy') || u.endsWith('/terms') || u.endsWith('/disclaimer')) {
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

fs.writeFileSync(sitemapPath, sitemapXml);
console.log('Updated sitemap.xml with 23 clean URLs (no .html)');

// 2. Helper to scan and update canonicals in all HTML files
function getAllHtmlFiles(dir, list = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== 'scripts') {
        getAllHtmlFiles(full, list);
      }
    } else if (item.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const htmlFiles = getAllHtmlFiles(rootDir);
console.log('Found', htmlFiles.length, 'HTML files to update canonical and JSON-LD.');

for (const f of htmlFiles) {
  let content = fs.readFileSync(f, 'utf8');

  // Replace canonical tag: e.g. https://ssrdogjic.homes/something.html -> https://ssrdogjic.homes/something
  content = content.replace(/<link\s+rel=["']canonical["']\s+href=["']https:\/\/ssrdogjic\.homes\/([^"'>]+)\.html["']/gi, (m, p1) => {
    return `<link rel="canonical" href="https://ssrdogjic.homes/${p1}"`;
  });

  // Replace JSON-LD URLs: "item": "https://ssrdogjic.homes/...html" or "@id": "https://ssrdogjic.homes/...html"
  content = content.replace(/https:\/\/ssrdogjic\.homes\/([a-zA-Z0-9_\-\/]+)\.html/g, 'https://ssrdogjic.homes/$1');

  fs.writeFileSync(f, content, 'utf8');
}

console.log('Successfully updated canonical tags and structured data URLs across all HTML files.');
