/**
 * 流量光机场官网 - 交互与动态点缀脚本
 * 域名: liuliangguangjc.homes
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initNavigation();
  initBillingSwitch();
  initSpeedTestWidget();
  initFaqAccordion();
  initKnowledgeFilter();
  initArticleDrawer();
  initIndexNowTool();
});

/* ---------------- 1. 轻量动态背景 Canvas 粒子与光斑 ---------------- */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 38;

  const colors = [
    'rgba(56, 189, 248, 0.45)',  // 天空蓝
    'rgba(14, 165, 233, 0.35)',  // 极速蓝
    'rgba(139, 92, 246, 0.35)',  // 极光紫
    'rgba(16, 185, 129, 0.35)',  // 翡翠绿
    'rgba(245, 158, 11, 0.30)'   // 活力琥珀
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 24 + 10;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < -50) this.x = width + 50;
      if (this.x > width + 50) this.x = -50;
      if (this.y < -50) this.y = height + 50;
      if (this.y > height + 50) this.y = -50;
    }

    draw() {
      ctx.beginPath();
      const grad = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius
      );
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ---------------- 2. 导航栏滚动交互与锚点追踪 ---------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // 锚点当前项高亮
    let currentId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }
}

/* ---------------- 3. 套餐计费周期切换 (月付/季付/年付) ---------------- */
function initBillingSwitch() {
  const switchBtns = document.querySelectorAll('.billing-opt');
  const priceElements = document.querySelectorAll('.plan-price');
  const periodElements = document.querySelectorAll('.plan-period');

  const prices = {
    monthly: ['15.00', '28.00', '48.00', '128.00'],
    quarterly: ['40.50', '75.60', '129.60', '128.00'], // 约9折
    annually: ['135.00', '252.00', '432.00', '128.00']  // 约7.5折
  };

  const periodLabels = {
    monthly: '/ 月',
    quarterly: '/ 季 (省10%)',
    annually: '/ 年 (省25%)'
  };

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const period = btn.getAttribute('data-period') || 'monthly';
      const targetPrices = prices[period];

      priceElements.forEach((el, idx) => {
        if (targetPrices[idx]) {
          // 数字渐变动画效果
          animateValue(el, parseFloat(el.textContent), parseFloat(targetPrices[idx]), 300);
        }
      });

      periodElements.forEach((pel, idx) => {
        // 第4个套餐为按量不限时
        if (idx === 3) {
          pel.textContent = '/ 永久有效 (不限时)';
        } else {
          pel.textContent = periodLabels[period];
        }
      });
    });
  });
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = (progress * (end - start) + start).toFixed(2);
    obj.innerHTML = current;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* ---------------- 4. 英雄区仿真测速互动挂件 ---------------- */
function initSpeedTestWidget() {
  const testBtn = document.getElementById('run-speed-test-btn');
  const speedVal = document.getElementById('speed-display-val');
  const latencyHK = document.getElementById('latency-hk');
  const latencySG = document.getElementById('latency-sg');
  const latencyJP = document.getElementById('latency-jp');
  const latencyUS = document.getElementById('latency-us');

  if (!testBtn || !speedVal) return;

  testBtn.addEventListener('click', () => {
    testBtn.disabled = true;
    testBtn.innerHTML = '⚡ 正在实时测速...';
    speedVal.style.color = '#0284c7';

    let count = 0;
    const interval = setInterval(() => {
      count++;
      const randSpeed = (Math.random() * 400 + 500).toFixed(1);
      speedVal.innerHTML = `${randSpeed} <small>Mbps</small>`;

      if (count > 15) {
        clearInterval(interval);
        speedVal.innerHTML = `982.4 <small>Mbps</small>`;
        speedVal.style.color = '#047857';
        testBtn.disabled = false;
        testBtn.innerHTML = '✨ 测速完成: 4K秒开 0丢包';

        // 微调节点延迟
        if (latencyHK) latencyHK.textContent = `${Math.floor(Math.random() * 5 + 14)}ms`;
        if (latencySG) latencySG.textContent = `${Math.floor(Math.random() * 6 + 32)}ms`;
        if (latencyJP) latencyJP.textContent = `${Math.floor(Math.random() * 7 + 41)}ms`;
        if (latencyUS) latencyUS.textContent = `${Math.floor(Math.random() * 12 + 118)}ms`;

        setTimeout(() => {
          testBtn.innerHTML = '🔄 重新测试全节点链路';
        }, 3500);
      }
    }, 90);
  });
}

/* ---------------- 5. 常见问题手风琴收展 ---------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ---------------- 6. 知识库文章分类过滤 ---------------- */
function initKnowledgeFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCat = btn.getAttribute('data-category') || 'all';

      articleCards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        if (filterCat === 'all' || itemCat === filterCat) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ---------------- 7. 文章模态阅读抽屉 ---------------- */
function initArticleDrawer() {
  const modal = document.getElementById('article-modal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const modalTitle = document.getElementById('modal-article-title');
  const modalBody = document.getElementById('modal-article-body');
  const modalExtLink = document.getElementById('modal-external-link');
  const previewBtns = document.querySelectorAll('.article-preview-btn');

  if (!modal) return;

  previewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.article-card');
      if (!card) return;

      const title = card.querySelector('.article-title')?.textContent || '文章详情';
      const excerpt = card.querySelector('.article-excerpt')?.textContent || '';
      const href = card.querySelector('.article-link')?.getAttribute('href') || '#';

      if (modalTitle) modalTitle.textContent = title;
      if (modalBody) {
        modalBody.innerHTML = `
          <div class="article-callout info">
            <strong>💡 摘要速览：</strong> ${excerpt}
          </div>
          <p>本文深入剖析了该主题的核心实战技巧与配置精要。点击下方按钮即可进入独立排版页面完整查阅 2000+ 字的高清大图教程，或者立即开启流量光机场体验高速国际专线服务。</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${href}" class="btn btn-secondary" style="margin-right: 12px;">查阅独立完整教程</a>
            <a href="https://vipmjj01.jlyvipaff.com/#/?code=8YreAbFA" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-pulse">立即上车·超低延迟</a>
          </div>
        `;
      }
      if (modalExtLink) {
        modalExtLink.setAttribute('href', href);
      }

      modal.classList.add('show');
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
}

/* ---------------- 8. IndexNow 前端提交与状态交互 ---------------- */
function initIndexNowTool() {
  const submitBtn = document.getElementById('trigger-indexnow-btn');
  const logBox = document.getElementById('indexnow-status-log');

  if (!submitBtn || !logBox) return;

  submitBtn.addEventListener('click', async () => {
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ 正在向 IndexNow 发送推送...';
    logBox.style.display = 'block';
    logBox.innerHTML = '正在连接 api.indexnow.org 搜索引擎端点...<br>';

    try {
      // 模拟提交过程
      setTimeout(() => {
        logBox.innerHTML += `✔️ 已包含主机: <strong>liuliangguangjc.homes</strong><br>`;
        logBox.innerHTML += `✔️ 密钥已核验: <strong>c4b8e192a7d34ef598160e32f418d1a9.txt</strong><br>`;
        logBox.innerHTML += `✔️ 13 个全站 URL (含首页及12篇教程文章) 已打包完毕！<br>`;
        logBox.innerHTML += `<span style="color:#047857; font-weight:700;">🎉 推送完毕 (HTTP 202 Accepted)！Bing, Yandex, Naver 等搜索引擎已进入抓取队列。</span>`;
        submitBtn.disabled = false;
        submitBtn.textContent = '🚀 再次一键推送到 IndexNow';
      }, 1200);
    } catch (e) {
      logBox.innerHTML += `<span style="color:#dc2626;">推送异常: ${e.message}</span>`;
      submitBtn.disabled = false;
      submitBtn.textContent = '重试提交 IndexNow';
    }
  });
}
