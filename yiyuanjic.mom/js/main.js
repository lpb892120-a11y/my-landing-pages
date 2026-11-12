/* ===================================================================
   一元机场官网 (yiyuanjic.mom) - 核心交互脚本
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 移动端菜单切换
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const isExpanded = navMenu.classList.contains('show');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // 点击菜单项后自动关闭
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }

  // 2. FAQ 手风琴折叠交互
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // 可选：关闭其他展开的FAQ
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // 切换当前
        item.classList.toggle('active');
        questionBtn.setAttribute('aria-expanded', !isActive);
      });
    }
  });

  // 3. 价格周期切换 (月付 / 年付)
  const billingMonthly = document.getElementById('billingMonthly');
  const billingYearly = document.getElementById('billingYearly');
  const pricingCards = document.querySelectorAll('.pricing-card');

  const pricingData = {
    monthly: [
      { price: '1.0', period: '/月', desc: '轻度体验，适合新手测试' },
      { price: '3.0', period: '/月', desc: '极速标准版，日常翻墙无忧' },
      { price: '6.0', period: '/月', desc: '大流量追剧首选，4K秒开' },
      { price: '15.0', period: '/月', desc: '团队与重度下载，专线中转' }
    ],
    yearly: [
      { price: '11.0', period: '/年', desc: '折合不足1元/月，最省心之选' },
      { price: '33.0', period: '/年', desc: '经典畅销爆款，全平台秒速解析' },
      { price: '66.0', period: '/年', desc: '大流量大杯，流媒体与AI极速畅享' },
      { price: '158.0', period: '/年', desc: '独立专线负载均衡，全天晚高峰无阻' }
    ]
  };

  function updatePricing(type) {
    if (!pricingCards.length) return;
    const currentData = pricingData[type];
    
    pricingCards.forEach((card, index) => {
      if (currentData[index]) {
        const amountEl = card.querySelector('.amount');
        const periodEl = card.querySelector('.period');
        const descEl = card.querySelector('.plan-desc');

        if (amountEl) amountEl.textContent = currentData[index].price;
        if (periodEl) periodEl.textContent = currentData[index].period;
        if (descEl) descEl.textContent = currentData[index].desc;
      }
    });
  }

  if (billingMonthly && billingYearly) {
    billingMonthly.addEventListener('click', () => {
      billingMonthly.classList.add('active');
      billingYearly.classList.remove('active');
      updatePricing('monthly');
    });

    billingYearly.addEventListener('click', () => {
      billingYearly.classList.add('active');
      billingMonthly.classList.remove('active');
      updatePricing('yearly');
    });
  }

  // 4. 导航栏滚动高亮与阴影微动
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 5. 动态模拟测速与节点Ping值波动展示（增强科技感与真实信任度）
  const pingValueEl = document.getElementById('livePingValue');
  if (pingValueEl) {
    setInterval(() => {
      // 模拟28ms ~ 39ms之间健康波动
      const base = 28;
      const variation = Math.floor(Math.random() * 10);
      pingValueEl.textContent = (base + variation) + 'ms';
    }, 3500);
  }
});

