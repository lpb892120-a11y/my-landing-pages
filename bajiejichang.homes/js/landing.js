document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');

  if (!toggle || !nav) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开导航菜单');
    nav.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? '打开导航菜单' : '关闭导航菜单');
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (nav.classList.contains('is-open') && !nav.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });
});
