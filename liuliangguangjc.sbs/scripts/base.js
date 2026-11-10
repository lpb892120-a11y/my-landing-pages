const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'articles');
if (!fs.existsSync(articlesDir)) fs.mkdirSync(articlesDir, { recursive: true });

const DOMAIN = 'https://liuliangguangjc.sbs';
const TARGET_URL = 'https://jichang-go.org/go.php';

// 共同通用导航模板
function getHeader(activeTab = 'blog') {
  return `
  <header class="site-header">
    <div class="container header-inner">
      <a href="../index.html" class="brand-logo">
        <img src="../images/logo.svg" alt="流量光官网Logo" width="36" height="36" />
        <span>流量光官网</span>
        <span class="brand-badge">PRO</span>
      </a>
      <ul class="nav-menu">
        <li><a href="../index.html" class="nav-link">官网首页</a></li>
        <li><a href="../tutorials.html" class="nav-link">使用教程</a></li>
        <li><a href="../articles/index.html" class="nav-link active">SEO文章库</a></li>
        <li><a href="../faq.html" class="nav-link">常见问题</a></li>
        <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="nav-link" style="color: #38bdf8;">用户中心</a></li>
      </ul>
      <div class="nav-actions">
        <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="btn btn-primary">
          <span>进入流量光官网</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <button class="mobile-toggle" aria-label="展开导航菜单">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </header>`;
}

function getFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="../index.html" class="brand-logo">
            <img src="../images/logo.svg" alt="流量光Logo" width="32" height="32" />
            <span>流量光官网</span>
          </a>
          <p>流量光（Liuliangguang）专注于提供高速稳定、抗封锁且隐私安全的全球网络加速中继服务。全节点支持 Clash、Clash Party、Shadowrocket 等主流客户端，智能分流秒开 4K，助力跨境出海与科研办公。</p>
          <div style="margin-top: 1rem;">
            <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="btn btn-primary" style="padding: 8px 18px; font-size: 0.88rem;">获取专属高速节点</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>产品与服务</h4>
          <ul class="footer-links">
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">高速节点套餐</a></li>
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">企业跨境专线定制</a></li>
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">ChatGPT/AI 原生节点</a></li>
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">4K/8K 流媒体解锁节点</a></li>
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">最新节点状态监测</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>教程与支持</h4>
          <ul class="footer-links">
            <li><a href="../tutorials.html">新手配置全套教程</a></li>
            <li><a href="clash-party-tutorial.html">Clash Party 客户端教程</a></li>
            <li><a href="mobile-clash-ios-android.html">iOS / 安卓配置指南</a></li>
            <li><a href="../faq.html">常见问题知识库</a></li>
            <li><a href="${TARGET_URL}" target="_blank" rel="noopener nofollow">在线工单客服</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>网站导航与法规</h4>
          <ul class="footer-links">
            <li><a href="../sitemap.xml">网站地图 (XML)</a></li>
            <li><a href="../articles/index.html">文章专栏总览</a></li>
            <li><a href="../privacy.html">隐私政策</a></li>
            <li><a href="../terms.html">服务条款</a></li>
            <li><a href="../disclaimer.html">免责声明</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>&copy; 2026 流量光官网 (Liuliangguang). 保留所有权利。全球分布式专线加速网络。</div>
        <div class="footer-legal-links">
          <a href="../privacy.html">隐私权协议</a>
          <a href="../terms.html">用户协议</a>
          <a href="../disclaimer.html">合规免责声明</a>
        </div>
      </div>
    </div>
  </footer>
  
  <a href="${TARGET_URL}" target="_blank" rel="noopener nofollow" class="floating-cta" aria-label="立即前往流量光官网">
    <span>⚡ 立即获取高速稳定节点</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </a>`;
}

// 导出模块给后续生成
module.exports = {
  DOMAIN,
  TARGET_URL,
  getHeader,
  getFooter,
  articlesDir
};
console.log('Base article module prepared.');
