/* ==========================================================================
   BuildNexa — Depth / immersive parallax
   Hero fly-through, layered skyline, drifting section numerals, staggered
   card drift, scale-in slabs and a 3D tilt-up console. Uses the CSS
   `translate` / `scale` properties so it composes with existing transforms
   (tilt, reveal, magnetic). Disabled entirely for reduced motion.
   ========================================================================== */
function block1() {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const desktop = window.matchMedia("(min-width: 901px)");
  let vh = window.innerHeight;

  /* ---------- Skyline (generated SVG, seeded so it's stable) ---------- */
  const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  function skylineSVG(seed, { minH, maxH, fill, stroke, lit, crane }) {
    const r = rng(seed);
    const W = 1600, H = 300;
    let x = -10, rects = "", lights = "";
    while (x < W) {
      const w = 46 + ((r() * 90) | 0);
      const h = minH + ((r() * (maxH - minH)) | 0);
      rects += `<rect x="${x}" y="${H - h}" width="${w}" height="${h}" fill="url(#win${seed})" stroke="${stroke}" stroke-width="1"/>`;
      if (r() < 0.3) rects += `<rect x="${x + w / 2 - 1}" y="${H - h - 18}" width="2" height="18" fill="${stroke}"/>`; // antenna
      if (lit) for (let i = 0; i < 4; i++) if (r() < 0.55) {
        lights += `<rect x="${x + 4 + ((r() * (w - 12)) | 0)}" y="${H - h + 8 + ((r() * (h - 20)) | 0)}" width="5" height="7" fill="${lit}"/>`;
      }
      x += w + ((r() * 8) | 0);
    }
    if (crane) {
      const cx = crane, top = 40;
      rects += `<g stroke="${lit || stroke}" stroke-width="2" fill="none" opacity=".9">
        <path d="M${cx} ${H} V${top} M${cx - 6} ${H} V${top + 10} M${cx} ${top} H${cx + 260} M${cx} ${top} H${cx - 80} M${cx} ${top - 30} L${cx + 260} ${top} M${cx} ${top - 30} L${cx - 80} ${top} M${cx} ${top - 30} V${top}"/>
        <path d="M${cx + 190} ${top} V${top + 90}" stroke-width="1"/><rect x="${cx + 180}" y="${top + 90}" width="20" height="14" fill="${lit || stroke}"/>
        <rect x="${cx - 78}" y="${top}" width="34" height="18" fill="${stroke}"/></g>`;
    }
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs><pattern id="win${seed}" width="14" height="18" patternUnits="userSpaceOnUse">
        <rect width="14" height="18" fill="${fill}"/><rect x="4" y="5" width="5" height="7" fill="rgba(254,254,254,.045)"/></pattern></defs>
      ${rects}${lights}</svg>`;
  }

  const hero = $(".hero");
  const heroContent = $(".hero__content");
  const heroMeta = $(".hero__meta");
  const heroFloat = $(".hero__float");
  // The hero photo is the far layer; the generated skyline is only used when no photo is present.
  const heroMedia = $(".hero__media");
  let skyBack, skyFront;
  if (hero && !heroMedia) {
    skyBack = document.createElement("div");
    skyBack.className = "skyline skyline--back";
    skyBack.innerHTML = skylineSVG(7, { minH: 90, maxH: 270, fill: "#2F3540", stroke: "rgba(254,254,254,.1)" });
    skyFront = document.createElement("div");
    skyFront.className = "skyline skyline--front";
    skyFront.innerHTML = skylineSVG(19, { minH: 40, maxH: 170, fill: "#2F3540", stroke: "rgba(154,1,41,.4)", lit: "rgba(154,1,41,.75)", crane: 1080 });
    hero.prepend(skyBack, skyFront);
  }

  /* ---------- Giant outlined section numerals ---------- */
  const numerals = [];
  $$("main section").forEach((sec) => {
    const idx = $(".section-index", sec);
    if (!idx || sec.hasAttribute("data-hscroll")) return;
    const n = document.createElement("span");
    n.className = "depth-num";
    n.setAttribute("aria-hidden", "true");
    n.textContent = idx.textContent.replace(/\D/g, "");
    sec.prepend(n);
    numerals.push({ el: n, ref: sec });
  });

  /* ---------- Staggered card drift (masonry feel) ---------- */
  // Speed is assigned per *column* so cards stacked in one column never collide.
  const SPEEDS = [0.06, -0.02, 0.1];
  // Column drift is off: the design calls for even card heights and restrained motion.
  // Add selectors (e.g. ".project") here to bring it back.
  const drifters = [].flatMap((sel) => $$(sel).map((el) => ({ el, ref: el.parentElement, speed: 0 })));
  function assignColumns() {
    const groups = new Map();
    drifters.forEach((d) => {
      const key = d.ref;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(d);
    });
    groups.forEach((items) => {
      const lefts = [...new Set(items.map((d) => Math.round(d.el.offsetLeft)))].sort((a, b) => a - b);
      items.forEach((d) => (d.speed = SPEEDS[lefts.indexOf(Math.round(d.el.offsetLeft)) % SPEEDS.length]));
    });
  }
  assignColumns();
  window.addEventListener("load", assignColumns);

  const slabs = $$(".why .bento, .faq .acc-list, .form, .quick__grid");
  const solutions = $("#solutions");
  const consoleEl = $(".console");

  /* ---------- Pointer for skyline ---------- */
  let mx = 0, smx = 0;
  hero?.addEventListener("pointermove", (e) => { mx = e.clientX / window.innerWidth - 0.5; request(); });

  /* ---------- Frame ---------- */
  let ticking = false;
  function frame() {
    ticking = false;
    const y = window.scrollY;
    const isDesk = desktop.matches;
    smx += (mx - smx) * 0.12;
    if (Math.abs(mx - smx) > 0.001) request(); // keep easing toward the pointer

    // Hero fly-through: far layers lag, near layers rush past
    if (hero) {
      const hh = hero.offsetHeight;
      if (y < hh * 1.2) {
        const p = clamp(y / hh, 0, 1);
        if (heroMedia) heroMedia.style.translate = `${(smx * -14).toFixed(1)}px ${(y * 0.4).toFixed(1)}px`;
        if (skyBack) skyBack.style.translate = `${(smx * -18).toFixed(1)}px ${(y * 0.32).toFixed(1)}px`;
        if (skyFront) skyFront.style.translate = `${(smx * -42).toFixed(1)}px ${(y * 0.12).toFixed(1)}px`;
        heroContent.style.translate = `0 ${(y * 0.28).toFixed(1)}px`;
        heroContent.style.opacity = (1 - p * 1.25).toFixed(3);
        heroContent.style.filter = p > 0.02 ? `blur(${(p * 8).toFixed(2)}px)` : "";
        heroContent.style.scale = (1 - p * 0.08).toFixed(4);
        heroMeta.style.opacity = (1 - p * 2.5).toFixed(3);
        if (heroFloat) heroFloat.style.translate = `0 ${(y * -0.35).toFixed(1)}px`;
      }
    }

    // Numerals drift against the scroll
    numerals.forEach(({ el, ref }) => {
      const r = ref.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      el.style.translate = `0 ${((r.top + r.height / 2 - vh / 2) * -0.3).toFixed(1)}px`;
    });

    // Card drift (desktop only — stacked mobile layouts stay put)
    drifters.forEach(({ el, ref, speed }) => {
      if (!isDesk || ref.closest("[data-hscroll]")) { el.style.translate = ""; return; }
      const r = ref.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      el.style.translate = `0 ${clamp((r.top + r.height / 2 - vh / 2) * speed, -60, 60).toFixed(1)}px`;
    });

    // Slabs scale in as they arrive
    slabs.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) return;
      const p = easeOut(clamp((vh - r.top) / (vh * 0.75), 0, 1));
      el.style.scale = (0.92 + 0.08 * p).toFixed(4);
    });

    // Console tilts up from the floor (container-scroll)
    if (solutions && consoleEl) {
      if (!isDesk) { consoleEl.style.transform = ""; }
      else {
        const r = solutions.getBoundingClientRect();
        const p = easeOut(clamp((vh - r.top) / (vh * 1.1), 0, 1));
        consoleEl.style.transform = `rotateX(${((1 - p) * 26).toFixed(2)}deg) scale(${(0.84 + 0.16 * p).toFixed(4)})`;
      }
    }
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", () => { vh = window.innerHeight; assignColumns(); request(); });
  desktop.addEventListener("change", request);
  request();
}

export default function init() {
  block1();
}
