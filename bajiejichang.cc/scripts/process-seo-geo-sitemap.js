const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Recursive file finder
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
console.log(`Found ${htmlFiles.length} HTML files.`);

// Helper to determine clean URL for any HTML file
function getCleanUrl(filePath) {
  let rel = path.relative(rootDir, filePath).replace(/\\/g, '/');
  if (rel === 'index.html') {
    return 'https://bajiejichang.cc/';
  }
  if (rel.endsWith('.html')) {
    rel = rel.substring(0, rel.length - 5);
  }
  return `https://bajiejichang.cc/${rel}`;
}

// 2. Process each HTML file
const processedUrls = [];

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  const cleanUrl = getCleanUrl(filePath);
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');

  processedUrls.push({
    file: relPath,
    url: cleanUrl,
    isArticle: relPath.startsWith('articles/') || relPath.startsWith('kb/') || relPath.startsWith('tutorial-')
  });

  // Ensure <html lang="zh-CN">
  content = content.replace(/<html(?:\s+[^>]*?)?>/i, '<html lang="zh-CN">');

  // Extract title
  let title = '八戒机场 - 稳定快速的Clash机场推荐 | 科学上网首选';
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  // Extract description
  let description = '八戒机场提供稳定安全的Clash节点服务，支持Clash Party，价格实惠，全球加速，适合科学上网、翻墙出海。提供详细的Clash使用教程和专业技术支持。';
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (descMatch) {
    description = descMatch[1].trim();
  }

  // 1) Remove existing canonical, alternate hreflang, geo tags, og tags, twitter tags
  content = content.replace(/<link\s+[^>]*?rel=["']canonical["'][^>]*?>\s*/gi, '');
  content = content.replace(/<link\s+[^>]*?rel=["']alternate["'][^>]*?>\s*/gi, '');
  content = content.replace(/<meta\s+[^>]*?name=["']geo\.[^"']+["'][^>]*?>\s*/gi, '');
  content = content.replace(/<meta\s+[^>]*?name=["']ICBM["'][^>]*?>\s*/gi, '');
  content = content.replace(/<meta\s+[^>]*?http-equiv=["']content-language["'][^>]*?>\s*/gi, '');
  content = content.replace(/<meta\s+[^>]*?property=["']og:[^"']+["'][^>]*?>\s*/gi, '');
  content = content.replace(/<meta\s+[^>]*?name=["']twitter:[^"']+["'][^>]*?>\s*/gi, '');

  // 2) Prepare SEO, GEO, OG, Twitter block
  const isArticle = relPath.startsWith('articles/') || relPath.startsWith('kb/') || relPath.startsWith('tutorial-');
  const ogType = isArticle ? 'article' : 'website';

  const seoGeoBlock = `    <link rel="canonical" href="${cleanUrl}">
    <link rel="alternate" hreflang="zh-CN" href="${cleanUrl}">
    <link rel="alternate" hreflang="x-default" href="${cleanUrl}">

    <!-- GEO Tags (Region & Location Targeting) -->
    <meta name="geo.region" content="CN">
    <meta name="geo.placename" content="China">
    <meta name="geo.position" content="39.9042;116.4074">
    <meta name="ICBM" content="39.9042, 116.4074">
    <meta http-equiv="content-language" content="zh-CN">

    <!-- Open Graph Meta Tags -->
    <meta property="og:site_name" content="八戒机场">
    <meta property="og:type" content="${ogType}">
    <meta property="og:title" content="${title.replace(/"/g, '&quot;')}">
    <meta property="og:description" content="${description.replace(/"/g, '&quot;')}">
    <meta property="og:url" content="${cleanUrl}">
    <meta property="og:image" content="https://bajiejichang.cc/images/hero-dashboard.png">
    <meta property="og:locale" content="zh_CN">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}">
    <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}">
    <meta name="twitter:image" content="https://bajiejichang.cc/images/hero-dashboard.png">`;

  // Insert after </title> or <meta name="description"...>
  if (content.match(/<meta\s+name=["']description["'][^>]*?>/i)) {
    content = content.replace(/(<meta\s+name=["']description["'][^>]*?>)/i, `$1\n${seoGeoBlock}`);
  } else if (content.match(/<\/title>/i)) {
    content = content.replace(/(<\/title>)/i, `$1\n${seoGeoBlock}`);
  } else {
    content = content.replace(/<head>/i, `<head>\n${seoGeoBlock}`);
  }

  // 3) Clean up JSON-LD URLs: convert any https://bajiejichang.cc/xxx.html to clean URL https://bajiejichang.cc/xxx
  content = content.replace(/https:\/\/bajiejichang\.cc\/([a-zA-Z0-9_\-\/]+)\.html/g, 'https://bajiejichang.cc/$1');

  // Fix JSON-LD dates to 2026-11-09 if present
  content = content.replace(/"dateModified":\s*"[^"]+"/g, '"dateModified": "2026-11-09"');

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log(`Updated all ${htmlFiles.length} files with Clean Canonical, GEO, OpenGraph, and Twitter tags.`);

// 3. Generate sitemap.xml with Clean URLs (matching Canonical 100%)
// Determine priority and changefreq based on page type
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Sort URLs: Home first, then Hubs, then Tutorials, then Articles/KB, then Legal/Sitemap
processedUrls.sort((a, b) => {
  if (a.url === 'https://bajiejichang.cc/') return -1;
  if (b.url === 'https://bajiejichang.cc/') return 1;
  return a.url.localeCompare(b.url);
});

for (const p of processedUrls) {
  let priority = '0.8';
  let changefreq = 'weekly';

  if (p.url === 'https://bajiejichang.cc/') {
    priority = '1.0';
    changefreq = 'daily';
  } else if (p.url.endsWith('/articles') || p.url.endsWith('/knowledge-base')) {
    priority = '0.9';
    changefreq = 'daily';
  } else if (p.url.includes('/tutorial-') || p.url.endsWith('/faq')) {
    priority = '0.85';
    changefreq = 'weekly';
  } else if (p.url.includes('/articles/') || p.url.includes('/kb/')) {
    priority = '0.8';
    changefreq = 'weekly';
  } else if (p.url.endsWith('/sitemap')) {
    priority = '0.6';
    changefreq = 'daily';
  } else if (p.url.endsWith('/privacy') || p.url.endsWith('/terms') || p.url.endsWith('/disclaimer')) {
    priority = '0.3';
    changefreq = 'monthly';
  }

  sitemapXml += `  <url>
    <loc>${p.url}</loc>
    <lastmod>2026-11-09</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
}

sitemapXml += `</urlset>\n`;

const sitemapPath = path.join(rootDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`Successfully generated sitemap.xml with ${processedUrls.length} clean URLs.`);

// 4. Update robots.txt
const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://bajiejichang.cc/sitemap.xml

# Crawl Rules
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Baiduspider
Allow: /
`;

const robotsPath = path.join(rootDir, 'robots.txt');
fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
console.log('Successfully updated robots.txt.');
