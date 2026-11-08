const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'articles');
if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
}

// Common template helper
function buildArticlePage(meta) {
    const jsonLdArticle = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": meta.title,
        "description": meta.description,
        "image": `https://ssrdogjic.homes/images/${meta.imageName}`,
        "datePublished": "2026-11-08",
        "dateModified": "2026-11-08",
        "author": {
            "@type": "Organization",
            "name": "ssrdog 技术团队"
        },
        "publisher": {
            "@type": "Organization",
            "name": "ssrdog",
            "logo": {
                "@type": "ImageObject",
                "url": "https://ssrdogjic.homes/images/logo.svg"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://ssrdogjic.homes/articles/${meta.slug}.html`
        }
    };

    const jsonLdBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "首页",
                "item": "https://ssrdogjic.homes/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "文章中心",
                "item": "https://ssrdogjic.homes/articles.html"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": meta.title,
                "item": `https://ssrdogjic.homes/articles/${meta.slug}.html`
            }
        ]
    };

    const jsonLdFaq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": meta.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a.replace(/<[^>]+>/g, '')
            }
        }))
    };

    const faqsHtml = meta.faqs.map(f => `
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

    const relatedHtml = meta.related.map(r => `
        <a href="${r.slug}.html" class="related-card">
            <div class="related-image">
                <img src="../images/${r.imageName}" alt="${r.title}">
            </div>
            <h3>${r.title}</h3>
            <p>${r.snippet}</p>
        </a>
    `).join('\n');

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.title} | ssrdog 官方技术指南</title>
    <meta name="description" content="${meta.description}">
    <meta name="keywords" content="${meta.keywords}">
    <link rel="canonical" href="https://ssrdogjic.homes/articles/${meta.slug}.html">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/article.css">

    <!-- Schema Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(jsonLdArticle, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(jsonLdBreadcrumb, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(jsonLdFaq, null, 2)}
    </script>
</head>
<body>
    <div id="reading-progress"></div>
    <div class="top-notice-bar">
        ⚡ 2026节点架构已升级！全面支持 IPLC 专线与全协议解锁，<a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener">立即前往官网直达体验 &rarr;</a>
    </div>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <a href="../index.html" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
                    <img src="../images/logo.svg" alt="ssrdog机场Logo" class="logo">
                    <span class="brand-name">ssrdog</span>
                </a>
            </div>
            <ul class="nav-menu">
                <li><a href="../index.html">首页</a></li>
                <li><a href="../index.html#features">核心优势</a></li>
                <li><a href="../index.html#pricing">套餐价格</a></li>
                <li><a href="../tutorials.html">使用教程</a></li>
                <li><a href="../articles.html">文章中心</a></li>
                <li><a href="../faq.html">常见问题</a></li>
                <li><a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener">立即使用</a></li>
            </ul>
            <div class="mobile-menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Main Article Container -->
    <main class="article-page">
        <div class="container">
            <!-- Article Header -->
            <header class="article-header">
                <nav class="article-breadcrumb" aria-label="breadcrumb">
                    <a href="../index.html">首页</a> &gt; 
                    <a href="../articles.html">文章中心</a> &gt; 
                    <span>${meta.category}</span>
                </nav>
                <h1>${meta.title}</h1>
                <div class="article-meta">
                    <span>📅 发布日期：2026-11-08</span>
                    <span>⏱️ 阅读时长：约 ${meta.readMinutes || '8'} 分钟</span>
                    <span>📂 分类：${meta.category}</span>
                    <span>🏷️ 核心词：${meta.tagString}</span>
                </div>
                <div class="article-reviewer-badge">
                    <span>🛡️ 本文已由 ssrdog 网络安全与专线工程团队严格实测审校，包含最新测速数据与配置验证</span>
                </div>
                <div class="article-featured-image" style="margin-top:20px;">
                    <img src="../images/${meta.imageName}" alt="${meta.title} - ssrdog配图插图">
                </div>
            </header>

            <!-- Article Body Content -->
            <article class="article-body">
                <!-- Callout summary -->
                <div class="callout-box info">
                    <div class="callout-title">💡 核心要点速览 (Key Takeaways)</div>
                    <p>${meta.summary}</p>
                </div>

                <!-- Table of Contents -->
                <div class="article-toc">
                    <h3>📑 本文目录导读</h3>
                    ${meta.tocHtml}
                </div>

                <!-- Main Content Body -->
                ${meta.contentHtml}

                <!-- In-article Conversion CTA -->
                <div class="article-cta">
                    <h3>🚀 体验极致流畅的科学上网服务</h3>
                    <p>告别卡顿与断连！ssrdog 为您提供顶级 IPLC 专线中继、全球 50+ 节点、4K 秒开与零日志隐私保护。</p>
                    <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" class="btn-primary" target="_blank" rel="noopener" style="display:inline-block;padding:12px 30px;background:#ffffff;color:#4f46e5;font-weight:700;border-radius:30px;text-decoration:none;">立即注册 ssrdog 专线套餐 &rarr;</a>
                    <p style="margin-top:12px;font-size:0.85rem;opacity:0.85;">支持支付宝、微信快捷充值 | 7天售后服务保障</p>
                </div>

                <!-- Dedicated FAQ Section -->
                <section class="article-faq">
                    <h2>❓ 关于“${meta.shortFaqTitle}”的常见问题 (FAQ)</h2>
                    <div class="faq-list">
                        ${faqsHtml}
                    </div>
                </section>

                <!-- Related Articles Recommendations -->
                <section class="related-articles">
                    <h2>📚 相关阅读推荐</h2>
                    <div class="related-grid">
                        ${relatedHtml}
                    </div>
                </section>
            </article>
        </div>
    </main>

    <!-- Floating Back to Top Button -->
    <button class="floating-back-top" id="back-to-top" title="返回顶部">↑</button>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>关于 ssrdog</h4>
                    <p>ssrdog 是业内领先的全球网络加速与科学上网服务商，专注为程序员、跨境出海、4K流媒体及外贸用户提供超低延迟的 IPLC 专线节点与全平台 Clash / Clash Party 客户端支持。</p>
                    <div class="social-links">
                        <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener" aria-label="Telegram"><img src="../images/telegram-icon.svg" alt="Telegram客服通道"></a>
                        <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener" aria-label="Discord"><img src="../images/discord-icon.svg" alt="Discord社区"></a>
                        <a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener" aria-label="Twitter"><img src="../images/twitter-icon.svg" alt="Twitter推特"></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>快速导航</h4>
                    <ul>
                        <li><a href="../index.html#features">核心优势</a></li>
                        <li><a href="../index.html#pricing">套餐价格</a></li>
                        <li><a href="../tutorials.html">客户端配置教程</a></li>
                        <li><a href="../articles.html">文章资讯中心</a></li>
                        <li><a href="../faq.html">常见答疑FAQ</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>教程专区</h4>
                    <ul>
                        <li><a href="../tutorial-windows.html">Windows Clash 教程</a></li>
                        <li><a href="../tutorial-mac.html">macOS 客户端配置</a></li>
                        <li><a href="../tutorial-ios.html">iOS 小火箭配置教程</a></li>
                        <li><a href="../tutorial-android.html">Android 手机翻墙教程</a></li>
                        <li><a href="../tutorial-clash-party.html">Clash Party 专属教学</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>法律条款与索引</h4>
                    <ul>
                        <li><a href="../privacy.html">隐私政策 (Privacy)</a></li>
                        <li><a href="../terms.html">服务条款 (Terms)</a></li>
                        <li><a href="../disclaimer.html">免责声明 (Disclaimer)</a></li>
                        <li><a href="../sitemap.html">HTML 网站地图</a></li>
                        <li><a href="../sitemap.xml">XML 站点地图</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 ssrdog (ssrdogjic.homes). All rights reserved. | 官方官网跳转链接：<a href="https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4" target="_blank" rel="noopener" style="color:var(--primary-color);">点击直达 ssrdog 平台</a></p>
            </div>
        </div>
    </footer>

    <script src="../js/main.js"></script>
</body>
</html>`;
}

// Module export for writing articles
module.exports = { buildArticlePage, articlesDir };
