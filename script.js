// Theme toggle — persists choice, reflects active state on the segmented control.
(function () {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('[data-set-theme]');

  function sync(theme) {
    buttons.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.setTheme === theme));
    });
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    sync(theme);
  }

  // Reflect whatever the inline head script already applied.
  sync(root.getAttribute('data-theme') || 'light');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => setTheme(btn.dataset.setTheme));
  });

  // Follow the OS theme only while the user hasn't made an explicit choice.
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', (e) => {
    try {
      if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
    } catch (err) {}
  });
})();
