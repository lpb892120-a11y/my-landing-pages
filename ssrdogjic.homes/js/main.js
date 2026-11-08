// ssrdog 官方站点核心交互与动态特效脚本
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 移动端汉堡菜单切换
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 点击导航链接后关闭菜单
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. 导航栏滚动阴影与变色
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 40) {
                navbar.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                navbar.style.background = 'rgba(255, 255, 255, 0.92)';
            }
        });
    }

    // 3. 数字递增滚动动画
    const countUpElements = document.querySelectorAll('.count-up');
    function animateCountUp(element) {
        const target = parseInt(element.getAttribute('data-target'), 10) || 50000;
        const duration = 1800;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent === '0') {
                animateCountUp(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    countUpElements.forEach(element => {
        countObserver.observe(element);
    });

    // 4. FAQ 手风琴展开与收起（支持首页与文章页）
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            if (!faqItem) return;
            const isCurrentlyActive = faqItem.classList.contains('active');
            
            // 查找同级别的容器，只关闭同组
            const parentList = faqItem.closest('.faq-list') || faqItem.closest('.article-faq');
            if (parentList) {
                parentList.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
            }

            if (!isCurrentlyActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // 5. 计费周期切换 (月付 / 年付)
    const billingSwitch = document.getElementById('billingSwitch');
    if (billingSwitch) {
        const priceAmounts = document.querySelectorAll('.price-amount');
        const pricePeriods = document.querySelectorAll('.price-period');
        
        billingSwitch.addEventListener('click', function() {
            this.classList.toggle('active');
            const isYearly = this.classList.contains('active');
            
            priceAmounts.forEach(el => {
                const monthlyPrice = parseInt(el.getAttribute('data-monthly'), 10);
                const yearlyPrice = parseInt(el.getAttribute('data-yearly'), 10);
                if (isYearly && yearlyPrice) {
                    el.textContent = yearlyPrice;
                } else if (monthlyPrice) {
                    el.textContent = monthlyPrice;
                }
            });

            pricePeriods.forEach(el => {
                el.textContent = isYearly ? '/年' : '/月';
            });
        });
    }

    // 6. 教程选项卡切换 (Tutorial Tabs)
    const tabBtns = document.querySelectorAll('.tutorial-tab-btn');
    const tabPanes = document.querySelectorAll('.tutorial-pane');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                this.classList.add('active');
                const activePane = document.getElementById(targetTab);
                if (activePane) {
                    activePane.classList.add('active');
                }
            });
        });
    }

    // 7. 阅读进度条
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // 8. 悬浮返回顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. 动态 Toast 提示工具函数
    window.showToast = function(msg) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = '<span>⚡</span> ' + msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    };

    // 绑定一键复制订阅链接演示按钮
    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('data-copy') || 'https://vipmjj01.jlyvipaff.com/#/?code=hBq1VTw4';
            navigator.clipboard.writeText(textToCopy).then(() => {
                window.showToast('官网链接已复制到剪贴板，请在浏览器打开！');
            }).catch(() => {
                window.location.href = textToCopy;
            });
        });
    });

    // 10. AOS (Animate On Scroll) 简化实现
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // 11. 动态节点连线粒子 Canvas (Hero Background)
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        window.addEventListener('resize', () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        });

        const particles = [];
        const particleCount = Math.min(Math.floor(width / 25), 45);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                radius: Math.random() * 2 + 1.2
            });
        }

        function renderNetwork() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(99, 102, 241, 0.45)';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.25 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(renderNetwork);
        }
        renderNetwork();
    }
});
