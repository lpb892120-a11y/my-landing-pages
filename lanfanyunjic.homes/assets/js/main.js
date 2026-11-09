/**
 * 蓝帆云机场官网交互脚本 (Playful & Lightweight JS)
 * 域名: lanfanyunjic.homes
 * 跳转外链: https://vipmjj01.jlyvipaff.com/#/?code=8YreAbFA
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 顶部导航栏滚动背景变化与移动端菜单
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isOpen = navLinks.classList.contains('mobile-open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // 点击链接后自动关闭移动端菜单
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        if (mobileToggle) mobileToggle.innerHTML = '☰';
      });
    });
  }

  // 2. 导航栏锚点平滑滚动与当前活动项高亮
  const navItems = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  });

  // 3. 英雄区延迟测试趣味模拟器 (Live Ping Simulator)
  const pingValEl = document.getElementById('livePingVal');
  const pingNodeEls = document.querySelectorAll('.ping-node-item');

  if (pingValEl) {
    let basePing = 19;
    setInterval(() => {
      // 产生16ms到24ms之间的真实轻微物理抖动
      const jitter = (Math.random() * 6 - 3).toFixed(0);
      const currentPing = Math.max(14, basePing + parseInt(jitter, 10));
      pingValEl.innerHTML = `${currentPing}<small>ms</small>`;
    }, 2400);
  }

  // 4. 套餐价格按月/按年周期切换
  const priceToggle = document.getElementById('priceToggle');
  const labelMonthly = document.getElementById('labelMonthly');
  const labelYearly = document.getElementById('labelYearly');
  const priceAmounts = document.querySelectorAll('.price-amount');
  const pricePeriods = document.querySelectorAll('.price-period');

  // 月付与年付数据配置（按年享受大额折扣）
  const pricingData = {
    monthly: [
      { price: '15.9', period: '/月' },
      { price: '28.8', period: '/月' },
      { price: '48.0', period: '/月' }
    ],
    yearly: [
      { price: '12.8', period: '/月 (年付¥153)' },
      { price: '22.8', period: '/月 (年付¥273)' },
      { price: '38.0', period: '/月 (年付¥456)' }
    ]
  };

  let isYearly = false;

  function updatePricing(yearly) {
    isYearly = yearly;
    if (priceToggle) {
      priceToggle.classList.toggle('yearly', isYearly);
    }
    if (labelMonthly) labelMonthly.classList.toggle('active', !isYearly);
    if (labelYearly) labelYearly.classList.toggle('active', isYearly);

    const data = isYearly ? pricingData.yearly : pricingData.monthly;
    priceAmounts.forEach((el, index) => {
      if (data[index]) {
        el.textContent = data[index].price;
      }
    });
    pricePeriods.forEach((el, index) => {
      if (data[index]) {
        el.textContent = data[index].period;
      }
    });
  }

  if (priceToggle) {
    priceToggle.addEventListener('click', () => {
      updatePricing(!isYearly);
    });
  }
  if (labelMonthly) {
    labelMonthly.addEventListener('click', () => updatePricing(false));
  }
  if (labelYearly) {
    labelYearly.addEventListener('click', () => updatePricing(true));
  }

  // 5. 常见问题 (FAQ) 手风琴展开与收起
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const isActive = parent.classList.contains('active');

      // 关闭同级其他打开的
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // 6. 文章目录滚动高亮监听 (针对文章页)
  const articleHeadings = document.querySelectorAll('.article-body h2, .article-body h3');
  const tocLinks = document.querySelectorAll('.toc-link');

  if (articleHeadings.length > 0 && tocLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let activeHeadingId = '';
      const scrollY = window.scrollY + 120;

      articleHeadings.forEach(heading => {
        if (heading.offsetTop <= scrollY) {
          activeHeadingId = heading.getAttribute('id');
        }
      });

      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (activeHeadingId && link.getAttribute('href') === `#${activeHeadingId}`) {
          link.classList.add('active');
        }
      });
    });
  }
});

