/**
 * 学习路径推荐器 — 事件委托实现
 * 不依赖 DOMContentLoaded，兼容 MkDocs Material instant navigation
 */
(function () {
  document.addEventListener('click', function (e) {
    // 找到最近的 [data-role] 按钮
    var btn = e.target.closest('[data-role]');
    if (!btn) return;

    var finder = btn.closest('.path-finder');
    if (!finder) return;

    var role = btn.getAttribute('data-role');

    // 按钮激活态
    var buttons = finder.querySelectorAll('[data-role]');
    buttons.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    // 显示对应的结果
    var panel = finder.querySelector('.path-result');
    var results = panel.querySelectorAll('[data-result]');
    results.forEach(function (r) {
      r.style.display = r.getAttribute('data-result') === role ? 'block' : 'none';
    });
    panel.style.display = 'block';
  });
})();
