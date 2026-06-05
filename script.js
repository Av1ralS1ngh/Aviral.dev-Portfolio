// Theme toggle — persists choice, reflects active state on the text buttons.
(function () {
  const root = document.documentElement;
  const opts = document.querySelectorAll('[data-set-theme]');

  function sync(theme) {
    opts.forEach(function (btn) {
      btn.setAttribute('data-active', String(btn.dataset.setTheme === theme));
    });
  }

  // Carry the active theme on internal links so it survives navigation
  // (localStorage isn't reliable across file:// pages).
  function propagateTheme(theme) {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || /^(https?:|mailto:|tel:|#)/i.test(href)) return;
      var base = href.split('?')[0].split('#')[0];
      a.setAttribute('href', base + '?theme=' + theme);
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    sync(theme);
    propagateTheme(theme);
  }

  function setTheme(theme) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Cross-fade the whole page (gradient + grid included) where supported.
    if (typeof document.startViewTransition === 'function' && !reduce) {
      document.startViewTransition(function () { applyTheme(theme); });
    } else {
      applyTheme(theme);
    }
  }

  // Reflect whatever the inline head script already applied, and seed links.
  var current = root.getAttribute('data-theme') || 'light';
  sync(current);
  propagateTheme(current);

  opts.forEach(function (btn) {
    btn.addEventListener('click', function () { setTheme(btn.dataset.setTheme); });
  });

  // Follow the OS theme only while the user hasn't made an explicit choice.
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', (e) => {
    try {
      if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
    } catch (err) {}
  });
})();
