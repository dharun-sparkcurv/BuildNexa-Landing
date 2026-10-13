/* ==========================================================================
   BuildNexa — Smooth transitions
   Inertial scrolling (Lenis-style, on native scroll so sticky/pinned
   sections keep working), eased anchor navigation and a sliding nav pill.
   Touch devices keep native momentum; reduced motion keeps native scroll.
   ========================================================================== */
function block1() {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const root = document.documentElement;
  const maxScroll = () => root.scrollHeight - window.innerHeight;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const easeInOutExpo = (t) => (t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2);

  let current = window.scrollY, target = current, running = false, tween = null;
  const locked = () => document.body.style.overflow === "hidden" || document.querySelector("dialog[open]");

  function loop(now) {
    if (tween) {
      const t = clamp((now - tween.start) / tween.dur, 0, 1);
      current = target = tween.from + (tween.to - tween.from) * easeInOutExpo(t);
      if (t >= 1) tween = null;
    } else {
      current += (target - current) * 0.118; // inertia: lower = heavier (0.1 felt like 8/10, this is ~6.8/10)
      if (Math.abs(target - current) < 0.5) current = target;
    }
    window.scrollTo(0, current);
    if (tween || current !== target) requestAnimationFrame(loop);
    else running = false;
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
    current = window.scrollY;
    const dist = Math.abs(to - current);
    tween = { from: current, to, start: performance.now(), dur: Math.min(1530, Math.max(510, dist * 0.3)) * (duration / 1.2) };
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

  /* Inertial wheel + keyboard (desktop only) */
  if (!reduceMotion && finePointer) {
    root.style.scrollBehavior = "auto"; // CSS smooth would fight the loop

    window.addEventListener("wheel", (e) => {
      if (e.ctrlKey || locked()) return;
      // let inner scrollers (textarea, lists, dialogs) handle their own wheel
      for (let n = e.target; n && n !== document.body; n = n.parentElement) {
        if (n.scrollHeight > n.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(n).overflowY)) return;
      }
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      tween = null;
      if (!running) current = window.scrollY;
      target = clamp(target + e.deltaY * unit, 0, maxScroll());
      start();
    }, { passive: false });

    window.addEventListener("keydown", (e) => {
      if (locked() || e.altKey || e.ctrlKey || e.metaKey) return;
      const tag = (e.target.tagName || "").toLowerCase();
      if (/(input|textarea|select)/.test(tag) || e.target.isContentEditable) return;
      if (e.key === " " && (tag === "button" || tag === "a" || tag === "summary")) return;
      const page = window.innerHeight * 0.85;
      const delta = { ArrowDown: 120, ArrowUp: -120, PageDown: page, PageUp: -page, " ": e.shiftKey ? -page : page }[e.key];
      if (e.key === "Home") { e.preventDefault(); scrollToTarget(0); return; }
      if (e.key === "End") { e.preventDefault(); scrollToTarget(maxScroll()); return; }
      if (delta == null) return;
      e.preventDefault();
      tween = null;
      if (!running) current = window.scrollY;
      target = clamp(target + delta, 0, maxScroll());
      start();
    });

    // Scrollbar drag, find-in-page, etc.: resync when scroll changes without us
    window.addEventListener("scroll", () => {
      if (!running) current = target = window.scrollY;
    }, { passive: true });
    window.addEventListener("resize", () => { target = clamp(target, 0, maxScroll()); });
  }

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
