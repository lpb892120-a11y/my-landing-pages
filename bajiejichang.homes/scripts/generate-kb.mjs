import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { articles } from "../kb/articles.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const published = "2026-11-08";
const site = "https://bajiejichang.homes";

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  })[char]);
}

function plainText(article) {
  return [article.intro, ...article.sections.flatMap((section) => section.paragraphs)]
    .join(" ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s/g, "");
}

function articleSchema(article, count) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "inLanguage": "zh-CN",
    "datePublished": published,
    "dateModified": published,
    "wordCount": count,
    "mainEntityOfPage": site + "/kb/" + article.slug + ".html",
    "publisher": {
      "@type": "Organization",
      "name": "八戒机场知识库",
      "url": site
    }
  };
}

function renderArticle(article, index) {
  const count = plainText(article).length;
  const path = site + "/kb/" + article.slug + ".html";
  const toc = article.sections.map((section, sectionIndex) =>
    '<li><a href="#section-' + (sectionIndex + 1) + '">' + escapeHtml(section.heading) + "</a></li>"
  ).join("\n");
  const body = article.sections.map((section, sectionIndex) => [
    '<section id="section-' + (sectionIndex + 1) + '" class="prose-section">',
    "<h2>" + escapeHtml(section.heading) + "</h2>",
    ...section.paragraphs.map((paragraph) => "<p>" + paragraph + "</p>"),
    "</section>"
  ].join("\n")).join("\n");
  const related = [1, 2, 3].map((offset) => articles[(index + offset) % articles.length]);
  const relatedHtml = related.map((item) =>
    '<a href="' + item.slug + '.html">' + escapeHtml(item.title) + '<span aria-hidden="true">↗</span></a>'
  ).join("\n");
  const schema = JSON.stringify(articleSchema(article, count), null, 2).replaceAll("<", "\\u003c");

  return [
    "<!doctype html>",
    '<html lang="zh-CN">',
    "<head>",
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <meta name="theme-color" content="#f4faf7">',
    "  <title>" + escapeHtml(article.title) + "｜八戒机场知识库</title>",
    '  <meta name="description" content="' + escapeHtml(article.description) + '">',
    '  <meta name="keywords" content="' + escapeHtml(article.keyword) + ',八戒机场教程,网络工具指南">',
    '  <link rel="canonical" href="' + path + '">',
    '  <meta property="og:type" content="article">',
    '  <meta property="og:title" content="' + escapeHtml(article.title) + '">',
    '  <meta property="og:description" content="' + escapeHtml(article.description) + '">',
    '  <meta property="og:url" content="' + path + '">',
    '  <meta property="article:published_time" content="' + published + '">',
    '  <link rel="stylesheet" href="../css/kb.css">',
    '  <script type="application/ld+json">' + schema + "</script>",
    "</head>",
    '<body class="kb-article-page">',
    '  <header class="kb-header">',
    '    <a class="kb-brand" href="../index.html"><span class="kb-brand-mark" aria-hidden="true">八</span><span>八戒机场 <small>知识库</small></span></a>',
    '    <nav aria-label="文章导航"><a href="../index.html#knowledge">知识库首页</a><a href="../index.html#pricing">官方套餐入口 <span aria-hidden="true">↗</span></a></nav>',
    "  </header>",
    '  <main class="kb-main">',
    '    <nav class="kb-breadcrumb" aria-label="面包屑"><a href="../index.html">首页</a><span aria-hidden="true">/</span><a href="../knowledge-base.html">知识库与教程</a><span aria-hidden="true">/</span><span>' + escapeHtml(article.keyword.split(",")[0]) + "</span></nav>",
    '    <header class="kb-article-head">',
    '      <p class="kb-kicker">' + escapeHtml(article.keyword.split(",")[0]) + " · 使用指南</p>",
    "      <h1>" + escapeHtml(article.title) + "</h1>",
    '      <p class="kb-intro">' + article.intro + "</p>",
    '      <div class="kb-meta"><time datetime="' + published + '">' + published + "</time><span>约 " + count.toLocaleString("zh-CN") + " 字</span><span>八戒机场知识库</span></div>",
    "    </header>",
    '    <div class="kb-content-layout">',
    '      <article class="kb-prose">',
    '        <div class="kb-toc"><h2>本文目录</h2><ol>' + toc + "</ol></div>",
    body,
    '        <aside class="kb-note"><strong>信息说明</strong><p>本文为通用知识与配置思路，不构成服务性能承诺。价格、节点、设备限制及服务规则请以官方用户中心当前说明为准，并遵守所在地法律法规和相关平台条款。</p></aside>',
    "      </article>",
    '      <aside class="kb-side">',
    '        <div class="kb-side-block"><span class="kb-side-label">继续了解</span><a href="../index.html#nodes">节点状态与实时探测说明 <span>↗</span></a><a href="../index.html#pricing">套餐查询入口 <span>↗</span></a><a href="../faq.html">常见问题 <span>↗</span></a></div>',
    '        <div class="kb-side-block"><span class="kb-side-label">相关文章</span>' + relatedHtml + "</div>",
    "      </aside>",
    "    </div>",
    '    <nav class="kb-bottom-nav" aria-label="返回知识库"><a href="../knowledge-base.html">← 返回知识库目录</a><a href="../index.html">八戒机场首页 →</a></nav>',
    "  </main>",
    '  <footer class="kb-footer"><span>© 2026 八戒机场官网</span><a href="../sitemap.xml">XML Sitemap</a><a href="../privacy.html">隐私政策</a></footer>',
    "</body>",
    "</html>",
    ""
  ].join("\n");
}

function renderDirectory() {
  const cards = articles.map((article, index) => {
    const count = plainText(article).length;
    return [
      '<article class="kb-index-item">',
      '  <div class="kb-index-meta"><span>' + String(index + 1).padStart(2, "0") + "</span><span>" + escapeHtml(article.keyword.split(",")[0]) + "</span><span>约 " + count.toLocaleString("zh-CN") + " 字</span></div>",
      '  <h2><a href="kb/' + article.slug + '.html">' + escapeHtml(article.title) + "</a></h2>",
      "  <p>" + escapeHtml(article.description) + "</p>",
      '  <a class="kb-index-link" href="kb/' + article.slug + '.html">阅读全文 <span aria-hidden="true">↗</span></a>',
      "</article>"
    ].join("\n");
  }).join("\n");
  const collection = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "八戒机场知识库与教程",
    "url": site + "/knowledge-base.html",
    "inLanguage": "zh-CN",
    "description": "围绕网络服务选择、客户端配置、隐私安全和网络排错整理的12篇入门文章。"
  }, null, 2);

  return [
    "<!doctype html>",
    '<html lang="zh-CN">',
    "<head>",
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <meta name="theme-color" content="#f4faf7">',
    "  <title>知识库与教程｜八戒机场官网</title>",
    '  <meta name="description" content="八戒机场知识库与教程目录，包含梯子推荐、科学上网指南、梯子科普、AI工具使用指南和节点排错等12篇长文。">',
    '  <meta name="keywords" content="梯子推荐,科学上网指南,梯子科普,AI工具使用指南,机场教程,网络工具知识库">',
    '  <link rel="canonical" href="' + site + '/knowledge-base.html">',
    '  <link rel="stylesheet" href="css/landing.css">',
    '  <link rel="stylesheet" href="css/kb.css">',
    '  <script type="application/ld+json">' + collection + "</script>",
    "</head>",
    '<body class="kb-index-page">',
    '  <header class="kb-header">',
    '    <a class="kb-brand" href="index.html"><span class="kb-brand-mark" aria-hidden="true">八</span><span>八戒机场 <small>知识库</small></span></a>',
    '    <nav aria-label="页面导航"><a href="index.html#knowledge">首页知识库</a><a href="index.html#faq">常见问题</a><a href="index.html#pricing">套餐入口 <span aria-hidden="true">↗</span></a></nav>',
    "  </header>",
    '  <main class="kb-directory">',
    '    <nav class="kb-breadcrumb" aria-label="面包屑"><a href="index.html">首页</a><span aria-hidden="true">/</span><span>知识库与教程</span></nav>',
    '    <header class="kb-directory-head"><p class="kb-kicker">KNOWLEDGE BASE · 12 ARTICLES</p><h1>知识库与教程</h1><p>从服务筛选和基础概念，到客户端配置、AI工具使用与连接排查。按主题阅读，所有价格与服务状态以官方页面为准。</p></header>',
    '    <div class="kb-index-grid">' + cards + "</div>",
    "  </main>",
    '  <footer class="kb-footer"><span>© 2026 八戒机场官网</span><a href="index.html">首页</a><a href="sitemap.xml">XML Sitemap</a><a href="privacy.html">隐私政策</a></footer>',
    "</body>",
    "</html>",
    ""
  ].join("\n");
}

function renderSitemap() {
  const paths = [
    "/",
    "/knowledge-base.html",
    "/faq.html",
    "/privacy.html",
    "/terms.html",
    "/disclaimer.html",
    ...articles.map((article) => "/kb/" + article.slug + ".html")
  ];
  const entries = paths.map((path) =>
    "  <url><loc>" + site + path + "</loc><lastmod>" + published + "</lastmod></url>"
  ).join("\n");
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</urlset>",
    ""
  ].join("\n");
}

await mkdir(join(root, "kb"), { recursive: true });
for (const [index, article] of articles.entries()) {
  await writeFile(join(root, "kb", article.slug + ".html"), renderArticle(article, index), "utf8");
}
await writeFile(join(root, "knowledge-base.html"), renderDirectory(), "utf8");
await writeFile(join(root, "sitemap.xml"), renderSitemap(), "utf8");
console.log("Generated " + articles.length + " articles, knowledge-base.html, and sitemap.xml.");
