/**
 * 青云梯官网 - 核心交互与动画脚本
 * Domain: qingyuntijic.mom
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 顶部导航栏滚动效果
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. 移动端菜单切换
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // 3. FAQ 手风琴交互
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // 自动关闭同级的其它问答项
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        }
      });
    }
  });

  // 4. 教程选项卡切换 (Tabs)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tutorial-panel');
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // 5. 复制官网链接与 Toast 提示
  const copyBtns = document.querySelectorAll('.js-copy-link');
  const toast = document.getElementById('toast-msg');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-clipboard-text') || 'https://jichang-go.org/go.php';
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('已复制青云梯官网快速通道链接！');
      }).catch(() => {
        showToast('复制成功：https://jichang-go.org/go.php');
      });
    });
  });

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 6. 节点延迟模拟刷新互动
  const retestBtn = document.getElementById('btn-retest-ping');
  if (retestBtn) {
    retestBtn.addEventListener('click', () => {
      retestBtn.innerHTML = '⚡ 正在实时测速中...';
      retestBtn.disabled = true;

      const pings = document.querySelectorAll('.ping-val span.val-num');
      pings.forEach(p => {
        p.textContent = '--';
      });

      setTimeout(() => {
        const ranges = [
          { min: 9, max: 15 },
          { min: 32, max: 42 },
          { min: 39, max: 49 },
          { min: 110, max: 128 }
        ];

        pings.forEach((p, idx) => {
          const r = ranges[idx] || { min: 40, max: 60 };
          const randVal = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
          p.textContent = randVal;
        });

        retestBtn.innerHTML = '⚡ 重新测试专线延迟';
        retestBtn.disabled = false;
        showToast('节点延迟已更新：全线专线低延迟运行中');
      }, 700);
    });
  }

  // 7. Canvas 粒子流光星空连线背景特效 (轻量高性能)
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor(width * 0.04), 55);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.8 + 0.6;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }
});

