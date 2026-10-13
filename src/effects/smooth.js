/* ==========================================================================
   BuildNexa — Smooth transitions
   Wheel, touch and keyboard scrolling are left native (no inertia) so the
   page never lags behind input. Only nav-link jumps are eased, plus a
   sliding nav pill. Reduced motion jumps instantly.
   ========================================================================== */
function block1() {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const maxScroll = () => root.scrollHeight - window.innerHeight;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const easeInOutExpo = (t) => (t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2);

  root.style.scrollBehavior = "auto"; // the eased jump below drives the scroll; CSS smooth would fight it
  let running = false, tween = null;

  function loop(now) {
    const t = clamp((now - tween.start) / tween.dur, 0, 1);
    window.scrollTo(0, tween.from + (tween.to - tween.from) * easeInOutExpo(t));
    if (t < 1) requestAnimationFrame(loop);
    else { tween = null; running = false; }
  }
  const start = () => { if (!running) { running = true; requestAnimationFrame(loop); } };

  /* Eased navigation — exposed for other modules (command menu, modal CTA) */
  function scrollToTarget(dest, { duration = 1.2 } = {}) {
    const el = typeof dest === "string" ? document.querySelector(dest) : dest;
    const y = typeof dest === "number" ? dest
      : el ? el.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(root).scrollPaddingTop) || 0) : null;
    if (y == null) return;
    const to = clamp(y, 0, maxScroll());
    if (reduceMotion) { window.scrollTo(0, to); return; }
    const from = window.scrollY;
    const dist = Math.abs(to - from);
    tween = { from, to, start: performance.now(), dur: Math.min(1530, Math.max(510, dist * 0.3)) * (duration / 1.2) };
    start();
  }
  window.bnScrollTo = scrollToTarget;

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    const hash = a.getAttribute("href");
    if (hash === "#" ) return;
    const el = hash === "#top" ? 0 : document.querySelector(hash);
    if (el == null) return;
    e.preventDefault();
    scrollToTarget(el === 0 ? 0 : el);
    history.replaceState(null, "", hash);
    if (el && el !== 0) setTimeout(() => el.focus?.({ preventScroll: true }), 50);
  });

  /* Sliding nav pill */
  const list = document.querySelector(".nav__list");
  if (list) {
    const pill = document.createElement("span");
    pill.className = "nav__pill";
    pill.setAttribute("aria-hidden", "true");
    list.prepend(pill);
    const move = () => {
      const active = list.querySelector(".nav__link.is-active");
      if (!active) { pill.style.opacity = "0"; return; }
      pill.style.opacity = "1";
      pill.style.width = active.offsetWidth + "px";
      pill.style.translate = `${active.offsetLeft}px 0`;
    };
    new MutationObserver(move).observe(list, { subtree: true, attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", move);
    if (document.fonts) document.fonts.ready.then(move);
  }
}

export default function init() {
  block1();
}
