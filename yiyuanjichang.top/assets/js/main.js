/**
 * 一元机场官网 - 核心交互与动态效果
 * 包含：动态粒子连线背景、手风琴问答、导航高亮、实时延迟模拟
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 移动端菜单切换
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // 点击链接后自动收起菜单
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. 导航栏滚动阴影
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // 3. 常见问题手风琴效果 (FAQ Accordion)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // 关闭其他项
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherAns = other.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        // 切换当前项
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // 4. 动态背景粒子与连线 (Dynamic Ambient Dot Canvas)
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor(width / 32), 45); // 自适应数量

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        color: i % 3 === 0 ? 'rgba(37, 99, 235, 0.35)' : (i % 3 === 1 ? 'rgba(124, 58, 237, 0.3)' : 'rgba(6, 182, 212, 0.3)')
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      // 绘制粒子与连线
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

  // 5. 模拟实时节点低延迟微动 (增强真实感与科技质感)
  const pingDoms = document.querySelectorAll('.live-ping');
  if (pingDoms.length > 0) {
    setInterval(() => {
      pingDoms.forEach(el => {
        const base = parseInt(el.getAttribute('data-base') || '20', 10);
        const jitter = Math.floor(Math.random() * 5) - 2;
        const current = Math.max(12, base + jitter);
        el.textContent = `${current} ms`;
      });
    }, 3000);
  }
});

  // 6. �ײͼ۸��ǩҳ�л� (Pricing Tabs)
  const tabBtns = document.querySelectorAll('.pricing-tab-btn');
  const tabContents = document.querySelectorAll('.pricing-tab-content');

  if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.classList.add('active');
      });
    });
  }
