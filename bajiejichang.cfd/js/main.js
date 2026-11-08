// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 点击导航链接后关闭移动菜单
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // 导航栏滚动效果
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // FAQ 手风琴效果
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // 关闭所有其他项
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // 如果当前项未激活，则激活它
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // 跳过外部链接和特殊锚点
            if (href === '#' || href.includes('terminal') || href.includes('local_')) {
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动动画 - 元素进入视口时淡入
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 为卡片元素添加淡入效果
    const animatedElements = document.querySelectorAll(
        '.advantage-card, .pricing-card, .node-card, .review-card, .tutorial-card, .faq-item'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 节点状态模拟更新（实际使用时应该从后端API获取）
    function updateNodeStatus() {
        const nodeCards = document.querySelectorAll('.node-card');

        nodeCards.forEach(card => {
            const latencyElement = card.querySelector('.info-item:first-child .value');
            const loadElement = card.querySelector('.info-item:last-child .value');

            if (latencyElement && loadElement) {
                // 模拟轻微的延迟波动
                const currentLatency = parseInt(latencyElement.textContent);
                const variation = Math.floor(Math.random() * 10) - 5;
                const newLatency = Math.max(20, currentLatency + variation);

                latencyElement.textContent = newLatency + 'ms';

                // 根据延迟更新颜色
                if (newLatency < 100) {
                    latencyElement.className = 'value good';
                } else if (newLatency < 200) {
                    latencyElement.className = 'value medium';
                } else {
                    latencyElement.className = 'value';
                }

                // 模拟负载变化
                const currentLoad = parseInt(loadElement.textContent);
                const loadVariation = Math.floor(Math.random() * 6) - 3;
                const newLoad = Math.max(10, Math.min(90, currentLoad + loadVariation));

                loadElement.textContent = newLoad + '%';

                if (newLoad < 50) {
                    loadElement.className = 'value good';
                } else if (newLoad < 70) {
                    loadElement.className = 'value medium';
                } else {
                    loadElement.className = 'value';
                }
            }
        });
    }

    // 每5分钟更新一次节点状态
    setInterval(updateNodeStatus, 300000);

    // 添加页面加载完成后的入场动画
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 为所有外部链接添加 noopener 和 noreferrer（安全性）
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        const rel = link.getAttribute('rel') || '';
        if (!rel.includes('noopener')) {
            link.setAttribute('rel', (rel + ' noopener').trim());
        }
    });

    // 统计用户点击行为（可选，用于分析）
    function trackEvent(category, action, label) {
        // 这里可以集成 Google Analytics 或其他分析工具
        console.log('Event:', category, action, label);
    }

    // 跟踪 CTA 按钮点击
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-register');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('CTA', 'Click', this.textContent);
        });
    });

    // 跟踪教程卡片点击
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    tutorialCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            trackEvent('Tutorial', 'Click', title);
        });
    });

    // 懒加载优化（为未来的图片准备）
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // 添加活跃导航链接高亮
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

        let currentSection = '';
        const navbarHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // 初始调用

    // 返回顶部按钮（可选功能）
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        z-index: 999;
    `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 防止页面快速刷新时的闪烁
    document.documentElement.style.scrollBehavior = 'smooth';

    // 性能优化：节流函数
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 使用节流优化滚动事件
    window.addEventListener('scroll', throttle(function() {
        highlightActiveSection();
    }, 100));

    console.log('八戒机场官网已加载完成 ✈️');
});
