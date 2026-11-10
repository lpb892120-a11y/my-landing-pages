/**
 * 一元机场官网 (xn--4gq62f52gdssq71dsob.com)
 * 交互脚本：轻量响应、趣味互动、平滑导航与价格切换
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 导航栏滚动效果
  const navbar = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // 2. 移动端汉堡菜单折叠
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const spans = menuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'translateY(8.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // 点击链接后自动收起菜单
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          menuToggle.click();
        }
      });
    });
  }

  // 3. FAQ 手风琴折叠效果
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // 关闭其他
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
          }
        });
        // 切换当前
        item.classList.toggle('active', !isOpen);
      });
    }
  });

  // 4. 套餐周期切换 (月付 / 季付 / 年付)
  const pricingTabs = document.querySelectorAll('.pricing-tab');
  const priceAmounts = document.querySelectorAll('[data-price-month]');
  const pricePeriods = document.querySelectorAll('[data-period-text]');

  pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pricingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cycle = tab.dataset.cycle; // 'month', 'quarter', 'year'

      priceAmounts.forEach(el => {
        const pMonth = el.dataset.priceMonth;
        const pQuarter = el.dataset.priceQuarter;
        const pYear = el.dataset.priceYear;

        if (cycle === 'month') {
          el.textContent = pMonth;
        } else if (cycle === 'quarter') {
          el.textContent = pQuarter;
        } else if (cycle === 'year') {
          el.textContent = pYear;
        }
      });

      pricePeriods.forEach(el => {
        if (cycle === 'month') {
          el.textContent = '/月';
        } else if (cycle === 'quarter') {
          el.textContent = '/季度 (优惠8折)';
        } else if (cycle === 'year') {
          el.textContent = '/年 (省下近半)';
        }
      });
    });
  });

  // 5. 趣味互动：速度仪表盘数值动态微幅跳动（体现真实测速感）
  const speedDisplay = document.querySelector('.speed-number');
  if (speedDisplay) {
    let baseSpeed = 982;
    setInterval(() => {
      const delta = (Math.random() * 8 - 4).toFixed(1);
      const current = (baseSpeed + parseFloat(delta)).toFixed(0);
      speedDisplay.textContent = current;
    }, 2500);
  }

  // 6. 趣味互动：光标微光跟随体验（浅色光感）
  const heroCard = document.querySelector('.hero-visual-card');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroCard.style.setProperty('--mouse-x', `${x}px`);
      heroCard.style.setProperty('--mouse-y', `${y}px`);
    });
  }
});

