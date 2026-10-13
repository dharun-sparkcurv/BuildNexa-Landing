/* ==========================================================================
   BuildNexa — Interactions
   Vanilla JS, no dependencies. Every scroll-linked effect runs through one
   requestAnimationFrame loop so we never do layout work on each scroll event.
   ========================================================================== */
function block1() {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const lerp = (a, b, t) => a + (b - a) * t;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const desktopMQ = window.matchMedia("(min-width: 901px)");

  let vw = window.innerWidth;
  let vh = window.innerHeight;
  const heroPointer = { x: 0, y: 0 }; // shared between pointer handler and hero canvas

  /* ----------------------------------------------------------------------
     Split text into masked words (keeps <em> and other inline elements)
     ---------------------------------------------------------------------- */
  function splitWords(el) {
    let i = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
            const outer = document.createElement("span");
            outer.className = "split-word";
            const inner = document.createElement("span");
            inner.textContent = p;
            inner.style.setProperty("--i", i++);
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child);
        }
      });
    };
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    walk(el);
    $$(".split-word", el).forEach((w) => w.setAttribute("aria-hidden", "true"));
  }
  $$("[data-split]").forEach(splitWords);

  /* Scrub text: each word brightens as the statement scrolls through view */
  const scrubBlocks = $$("[data-scrub-text]").map((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute("aria-label", words.join(" "));
    el.innerHTML = words.map((w) => `<span class="scrub-word" aria-hidden="true">${w}</span>`).join(" ");
    return { el, words: $$(".scrub-word", el) };
  });

  /* ----------------------------------------------------------------------
     Loader → then start reveals
     ---------------------------------------------------------------------- */
  const loader = $(".loader");
  const countEl = $("[data-loader-count]");
  function finishLoading() {
    document.body.classList.remove("is-loading");
    setTimeout(startReveals, reduceMotion ? 0 : 350);
  }
  if (reduceMotion || !loader) {
    finishLoading();
  } else {
    const duration = 1100;
    const t0 = performance.now();
    let fontsReady = false;
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => (fontsReady = true));
    setTimeout(() => (fontsReady = true), 2500); // never wait forever on fonts
    const tick = (now) => {
      const p = clamp((now - t0) / duration, 0, fontsReady ? 1 : 0.92);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = Math.round(eased * 100);
      countEl.textContent = String(n).padStart(2, "0");
      loader.style.setProperty("--p", n + "%");
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(finishLoading, 150);
    };
    requestAnimationFrame(tick);
  }

  /* ----------------------------------------------------------------------
     Reveal on scroll + counters
     ---------------------------------------------------------------------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    if (reduceMotion) { el.textContent = target.toFixed(decimals); return; }
    const dur = 1800;
    const t0 = performance.now();
    const step = (now) => {
      const p = clamp((now - t0) / dur, 0, 1);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = (target * e).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function startReveals() {
    const targets = $$("[data-reveal], [data-split]");
    const counters = $$("[data-count]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      counters.forEach(animateCount);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    targets.forEach((el) => io.observe(el));

    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ----------------------------------------------------------------------
     Header: transparent → glass, hide on scroll down, show on scroll up
     ---------------------------------------------------------------------- */
  const header = $("[data-header]");
  const progressBar = $(".scroll-progress");
  let lastY = window.scrollY;

  function updateHeader(y) {
    header.classList.toggle("is-scrolled", y > 20);
    const menuOpen = document.body.classList.contains("menu-open");
    if (!menuOpen && y > lastY + 4 && y > vh * 0.6) header.classList.add("is-hidden");
    else if (y < lastY - 4 || y < vh * 0.6) header.classList.remove("is-hidden");
    lastY = y;
  }

  /* Active nav link */
  const navLinks = $$(".nav__link");
  if ("IntersectionObserver" in window) {
    const nio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach((s) => nio.observe(s));
  }

  /* ----------------------------------------------------------------------
     Scroll-linked effects (single rAF loop)
     ---------------------------------------------------------------------- */
  const parallaxEls = $$("[data-parallax]").map((el) => ({ el, speed: parseFloat(el.dataset.parallax) || 0, ref: el.parentElement }));
  const parallaxInner = $$("[data-parallax-inner]").map((el) => ({ el, ref: el.parentElement }));

  // Horizontal pinned process
  const hs = $("[data-hscroll]");
  const hsTrack = $("[data-hscroll-track]");
  const hsBar = $("[data-hscroll-bar]");
  let hsDistance = 0;
  function measureHScroll() {
    if (!hs || !hsTrack) return;
    if (!desktopMQ.matches) { hs.style.removeProperty("--hs-height"); hsTrack.style.transform = ""; hsDistance = 0; return; }
    hsDistance = Math.max(0, hsTrack.scrollWidth - vw);
    hs.style.setProperty("--hs-height", vh + hsDistance + "px");
  }

  let ticking = false;
  function onScrollFrame() {
    ticking = false;
    const y = window.scrollY;
    const docH = document.documentElement.scrollHeight - vh;
    const sp = docH > 0 ? (y / docH).toFixed(4) : 0;
    progressBar.style.setProperty("--sp", sp);
    document.documentElement.style.setProperty("--scroll", sp); // drives the ambient light field
    updateHeader(y);

    if (!reduceMotion) {
      parallaxEls.forEach(({ el, speed, ref }) => {
        const r = ref.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      parallaxInner.forEach(({ el, ref }) => {
        const r = ref.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
        el.style.setProperty("--py", (p * -10).toFixed(2) + "%");
      });
    }

    scrubBlocks.forEach(({ el, words }) => {
      const r = el.getBoundingClientRect();
      const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3), 0, 1);
      const n = words.length;
      words.forEach((w, i) => w.style.setProperty("--o", clamp(p * n * 1.15 - i, 0, 1).toFixed(2)));
    });

    if (hs && hsDistance > 0) {
      const r = hs.getBoundingClientRect();
      const p = clamp(-r.top / hsDistance, 0, 1);
      hsTrack.style.transform = `translate3d(${(-p * hsDistance).toFixed(1)}px, 0, 0)`;
      if (hsBar) hsBar.parentElement.style.setProperty("--hp", p.toFixed(4));
    }
  }
  const requestFrame = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScrollFrame); } };
  window.addEventListener("scroll", requestFrame, { passive: true });

  function onResize() {
    vw = window.innerWidth;
    vh = window.innerHeight;
    measureHScroll();
    requestFrame();
  }
  let resizeT;
  window.addEventListener("resize", () => { clearTimeout(resizeT); resizeT = setTimeout(onResize, 120); });
  window.addEventListener("load", onResize);
  onResize();

  /* ----------------------------------------------------------------------
     Solutions scrollytelling
     ---------------------------------------------------------------------- */
  const steps = $$(".sol-step");
  const states = $$(".cstate");
  if (steps.length && "IntersectionObserver" in window) {
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = entry.target.dataset.step;
        steps.forEach((s) => s.classList.toggle("is-active", s === entry.target));
        states.forEach((s) => s.classList.toggle("is-active", s.dataset.state === idx));
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach((s) => sio.observe(s));
  }

  /* ----------------------------------------------------------------------
     Pointer interactions (desktop only)
     ---------------------------------------------------------------------- */
  if (finePointer && !reduceMotion) {
    // 3D tilt + spotlight on service cards
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.classList.add("is-tilting");
        card.style.setProperty("--try", ((px - 0.5) * 8).toFixed(2) + "deg");
        card.style.setProperty("--trx", ((0.5 - py) * 8).toFixed(2) + "deg");
        card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      });
      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-tilting");
        card.style.setProperty("--try", "0deg");
        card.style.setProperty("--trx", "0deg");
      });
    });

    // Spotlight on bento items
    $$("[data-spot]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });

    // Magnetic buttons
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate3d(${x * 0.25}px, ${y * 0.35}px, 0)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transition += ", transform .6s cubic-bezier(.22,1,.36,1)";
        el.style.transform = "";
        setTimeout(() => (el.style.transition = ""), 600);
      });
    });

    // "View" cursor on project cards
    const dot = $(".cursor-dot");
    let cx = -200, cy = -200, tx = -200, ty = -200, cursorRunning = false;
    const cursorLoop = () => {
      cx = lerp(cx, tx, 0.2);
      cy = lerp(cy, ty, 0.2);
      dot.style.setProperty("--cx", cx.toFixed(1) + "px");
      dot.style.setProperty("--cy", cy.toFixed(1) + "px");
      if (Math.abs(cx - tx) > 0.2 || Math.abs(cy - ty) > 0.2) requestAnimationFrame(cursorLoop);
      else cursorRunning = false;
    };
    $$("[data-cursor]").forEach((el) => {
      el.addEventListener("pointerenter", (e) => { cx = tx = e.clientX; cy = ty = e.clientY; dot.classList.add("is-on"); });
      el.addEventListener("pointerleave", () => dot.classList.remove("is-on"));
      el.addEventListener("pointermove", (e) => {
        tx = e.clientX; ty = e.clientY;
        if (!cursorRunning) { cursorRunning = true; requestAnimationFrame(cursorLoop); }
      });
    });

    // Hero floating cards: mouse depth
    const hero = $(".hero");
    const floats = $$("[data-depth]");
    let mx = 0, my = 0, smx = 0, smy = 0, floatRunning = false;
    const floatLoop = () => {
      smx = lerp(smx, mx, 0.08);
      smy = lerp(smy, my, 0.08);
      floats.forEach((f) => {
        const d = parseFloat(f.dataset.depth);
        f.style.setProperty("--fx", (smx * 40 * d).toFixed(1) + "px");
        f.style.setProperty("--fy", (smy * 30 * d).toFixed(1) + "px");
        f.style.setProperty("--ry", (smx * 10 * d).toFixed(2) + "deg");
        f.style.setProperty("--rx", (-smy * 10 * d).toFixed(2) + "deg");
      });
      if (Math.abs(smx - mx) > 0.001 || Math.abs(smy - my) > 0.001) requestAnimationFrame(floatLoop);
      else floatRunning = false;
    };
    hero.addEventListener("pointermove", (e) => {
      mx = e.clientX / vw - 0.5;
      my = e.clientY / vh - 0.5;
      heroPointer.x = mx; heroPointer.y = my;
      if (!floatRunning) { floatRunning = true; requestAnimationFrame(floatLoop); }
    });
  }

  /* ----------------------------------------------------------------------
     Hero canvas: perspective grid floor + connected nodes
     ---------------------------------------------------------------------- */

  (function heroCanvas() {
    const canvas = $("[data-hero-canvas]");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = 1, nodes = [], running = false, visible = true, t = 0;
    let camX = 0, camY = 0;

    const NODE_COUNT = () => (w < 700 ? 34 : 70);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: NODE_COUNT() }, () => ({
        x: Math.random() * w, y: Math.random() * h * 0.62,
        z: 0.3 + Math.random() * 0.7,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.12,
      }));
      if (reduceMotion) draw();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      camX = lerp(camX, heroPointer.x, 0.04);
      camY = lerp(camY, heroPointer.y, 0.04);

      // Perspective floor
      const horizon = h * (0.6 + camY * 0.04);
      const vx = w * (0.62 - camX * 0.08);
      const lines = 18;
      const speed = reduceMotion ? 0 : (t * 0.0035) % 1;
      ctx.lineWidth = 1;
      for (let i = 0; i < lines; i++) {
        const p = (i + speed) / lines;
        const yy = horizon + (h - horizon) * p * p;
        ctx.strokeStyle = `rgba(154,1,41,${(p * 0.22).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(w, yy); ctx.stroke();
      }
      const cols = 26;
      for (let i = 0; i <= cols; i++) {
        const bx = vx + (i - cols / 2) * (w / cols) * 3.2;
        const g = ctx.createLinearGradient(0, horizon, 0, h);
        g.addColorStop(0, "rgba(154,1,41,0)");
        g.addColorStop(1, "rgba(154,1,41,0.16)");
        ctx.strokeStyle = g;
        ctx.beginPath(); ctx.moveTo(vx, horizon); ctx.lineTo(bx, h); ctx.stroke();
      }
      // Horizon glow
      const hg = ctx.createRadialGradient(vx, horizon, 0, vx, horizon, w * 0.5);
      hg.addColorStop(0, "rgba(154,1,41,0.22)");
      hg.addColorStop(1, "rgba(154,1,41,0)");
      ctx.fillStyle = hg;
      ctx.fillRect(0, 0, w, h);

      // Nodes
      const maxD = w < 700 ? 110 : 150;
      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h * 0.62; if (n.y > h * 0.62) n.y = -20;
        }
        n.sx = n.x - camX * 40 * n.z;
        n.sy = n.y - camY * 30 * n.z;
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.sx - b.sx, dy = a.sy - b.sy;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD * maxD) {
            const o = (1 - Math.sqrt(d2) / maxD) * 0.22 * Math.min(a.z, b.z);
            ctx.strokeStyle = `rgba(212,226,233,${o.toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(254,254,254,${(0.25 + n.z * 0.6).toFixed(2)})`;
        ctx.beginPath(); ctx.arc(n.sx, n.sy, n.z * 1.8, 0, Math.PI * 2); ctx.fill();
      }
    }

    function loop() {
      if (!visible || document.hidden) { running = false; return; }
      t++;
      draw();
      requestAnimationFrame(loop);
    }
    function start() { if (!running && !reduceMotion) { running = true; requestAnimationFrame(loop); } }

    resize();
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(canvas);
    }
    document.addEventListener("visibilitychange", () => { if (!document.hidden) start(); });
    start();
  })();

  /* ----------------------------------------------------------------------
     Mobile menu
     ---------------------------------------------------------------------- */
  const menuBtn = $("[data-menu-toggle]");
  const menu = $("[data-mobile-menu]");
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      menu.hidden = false;
      header.classList.remove("is-hidden");
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add("is-open")));
      setTimeout(() => $("a", menu).focus({ preventScroll: true }), 300);
    } else {
      menu.classList.remove("is-open");
      setTimeout(() => { if (!menu.classList.contains("is-open")) menu.hidden = true; }, reduceMotion ? 0 : 800);
    }
  }
  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); }
  });
  desktopMQ.addEventListener("change", (e) => { if (e.matches && document.body.classList.contains("menu-open")) setMenu(false); });

  /* ----------------------------------------------------------------------
     Project modal
     Describes how each type of business uses BuildNexa (features taken from
     the live product). No client names or results — add real, approved case
     studies here when available.
     ---------------------------------------------------------------------- */
  // Order matches the cards in index.html (data-project="0..3").
  const projects = [
    {
      cat: "Solar EPC", title: "Solar EPC developers",
      desc: "Capture DC/AC capacity on the project and reuse WBS templates from the Setup Library. Engineering, Procurement and Construction progress roll up by weightage into overall % complete, which drives RA billing.",
      stats: [["WBS", "Setup Library templates"], ["DPR", "Eng · Mat · Con"], ["RA", "On % complete"]],
      tags: ["Solar EPC", "WBS & weightages", "Plan vs Actual", "RA bills"],
    },
    {
      cat: "Construction", title: "Building & infrastructure contractors",
      desc: "Run several projects and companies on one ledger: indents to payments, warehouse and site stock, cost entries against estimates and budgets, and cost-to-completion forecasts.",
      stats: [["Multi", "Company & project"], ["GL", "One ledger"], ["CTC", "Cost to completion"]],
      tags: ["Procurement", "Inventory", "Estimates & budgets", "Cost to completion"],
    },
    {
      cat: "Subcontracting", title: "Subcontract-heavy delivery",
      desc: "Raise service requisitions and work orders against WBS items, record contractor JMRs capped at the work-order quantity plus 10%, and post service bills that split retention and TDS and update the Construction DPR.",
      stats: [["WO", "Work orders"], ["JMR", "WO qty + 10% cap"], ["Bill", "Retention & TDS"]],
      tags: ["Service requisitions", "Work orders", "Contractor JMRs", "Service bills"],
    },
    {
      cat: "Production", title: "In-house manufacturing",
      desc: "Define plants and bills of materials, run production that consumes raw stock and receives finished goods at weighted-average cost, then dispatch to site — back into the same inventory ledger.",
      stats: [["BOM", "Plants & BOM"], ["Runs", "Weighted-avg cost"], ["Dispatch", "To site"]],
      tags: ["Plants & BOM", "Production runs", "Dispatches", "Inventory"],
    },
  ];

  const modal = $("[data-modal]");
  let lastTrigger = null;
  function openProject(i, trigger) {
    const p = projects[i];
    if (!p || !modal) return;
    lastTrigger = trigger;
    $("[data-modal-cat]", modal).textContent = p.cat;
    $("[data-modal-title]", modal).textContent = p.title;
    $("[data-modal-desc]", modal).textContent = p.desc;
    $("[data-modal-stats]", modal).innerHTML = p.stats.map(([v, l]) => `<div><dt>${l}</dt><dd>${v}</dd></div>`).join("");
    $("[data-modal-tags]", modal).innerHTML = p.tags.map((t) => `<li>${t}</li>`).join("");
    const media = $("[data-modal-media]", modal);
    const source = $(".project__media", trigger);
    media.className = source.className.replace("project__media", "modal__media");
    media.innerHTML = source.innerHTML;
    $(".pv__inner", media).removeAttribute("data-parallax-inner");
    $(".pv__inner", media).style.removeProperty("--py");
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    document.body.style.overflow = "hidden";
    $(".cursor-dot").classList.remove("is-on");
  }
  function closeProject() {
    if (modal.open) modal.close();
  }
  if (modal) {
    $$("[data-project]").forEach((btn) => btn.addEventListener("click", () => openProject(+btn.dataset.project, btn)));
    $("[data-modal-close]", modal).addEventListener("click", closeProject);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeProject(); });
    modal.addEventListener("close", () => {
      document.body.style.overflow = "";
      if (lastTrigger) lastTrigger.focus({ preventScroll: true });
    });
    $("[data-modal-cta]", modal).addEventListener("click", (e) => {
      e.preventDefault();
      closeProject();
      const service = $("#f-service");
      const title = $("[data-modal-title]", modal).textContent;
      const msg = $("#f-msg");
      if (msg && !msg.value) msg.value = `We're interested in a project similar to ${title}.`;
      if (service && !service.value) service.value = "Not sure yet";
      if (window.bnScrollTo) window.bnScrollTo("#contact"); else $("#contact").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      setTimeout(() => $("#f-name").focus({ preventScroll: true }), reduceMotion ? 0 : 900);
    });
  }

  /* ----------------------------------------------------------------------
     Contact form
     ---------------------------------------------------------------------- */
  const form = $("[data-contact-form]");
  if (form) {
    const status = $("[data-form-status]", form);
    const label = $("[data-submit-label]", form);
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const rules = {
      name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
      email: (v) => (emailRe.test(v.trim()) ? "" : "Please enter a valid email address."),
      phone: (v) => (!v.trim() || /^\+?[\d\s()-]{8,18}$/.test(v.trim()) ? "" : "Please enter a valid phone number, or leave it blank."),
      service: (v) => (v ? "" : "Please choose what you're interested in."),
      message: (v) => (v.trim().length >= 10 ? "" : "Tell us a little more (at least 10 characters)."),
      consent: (_, el) => (el.checked ? "" : "Please confirm we may contact you."),
    };

    function validateField(el) {
      const rule = rules[el.name];
      if (!rule) return true;
      const msg = rule(el.value, el);
      const errEl = $("#" + el.id + "-err");
      const wrap = el.closest(".field");
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      if (errEl) { errEl.textContent = msg; el.setAttribute("aria-describedby", errEl.id); }
      if (wrap) wrap.classList.toggle("has-error", !!msg);
      return !msg;
    }

    Object.keys(rules).forEach((name) => {
      const el = form.elements[name];
      el.addEventListener("blur", () => { if (el.value || el.type === "checkbox") validateField(el); });
      el.addEventListener("input", () => { if (el.getAttribute("aria-invalid") === "true") validateField(el); });
      el.addEventListener("change", () => { if (el.getAttribute("aria-invalid") === "true") validateField(el); });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form__status";
      status.textContent = "";
      const fields = Object.keys(rules).map((n) => form.elements[n]);
      const results = fields.map(validateField);
      if (results.includes(false)) {
        fields[results.indexOf(false)].focus();
        status.classList.add("is-err");
        status.textContent = "Please check the highlighted fields.";
        window.bnToast?.("A few details are missing", { description: "Please check the highlighted fields.", type: "error" });
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      if (data.website) { form.reset(); return; } // honeypot tripped: silently drop
      delete data.website;

      const endpoint = form.dataset.endpoint;
      form.classList.add("is-sending");
      label.textContent = "Sending…";
      try {
        if (endpoint) {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error("Request failed: " + res.status);
          status.classList.add("is-ok");
          status.textContent = "Thank you — your message has been sent. We'll be in touch soon.";
          window.bnToast?.("Message sent", { description: "Thanks for reaching out — we'll get back to you soon." });
          form.reset();
        } else {
          // No backend configured: hand off to the visitor's email client.
          const subject = `Project enquiry — ${data.service}`;
          const body = [
            `Name: ${data.name}`, `Email: ${data.email}`, `Company: ${data.company || "-"}`,
            `Phone: ${data.phone || "-"}`, `Interested in: ${data.service}`,
            `Preferred contact: ${data.contact_pref || "-"}`, "", data.message,
          ].join("\n");
          window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          status.classList.add("is-ok");
          status.textContent = "Opening your email app with your message ready to send…";
          window.bnToast?.("Almost there", { description: "Your email app is opening with the message ready to send.", type: "info" });
        }
      } catch (err) {
        status.classList.add("is-err");
        window.bnToast?.("Message not sent", { description: "Please try again or email hello@buildnexa.io.", type: "error" });
        status.innerHTML = `Something went wrong. Please email us at <a href="mailto:${form.dataset.mailto}">${form.dataset.mailto}</a>.`;
      } finally {
        form.classList.remove("is-sending");
        label.textContent = "Send message";
      }
    });
  }

  /* Newsletter */
  const nl = $("[data-newsletter]");
  if (nl) {
    const msg = $("[data-newsletter-msg]");
    nl.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("input", nl);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
        msg.textContent = "Please enter a valid email address.";
        input.focus();
        return;
      }
      window.location.href = `mailto:hello@buildnexa.io?subject=${encodeURIComponent("Newsletter subscription")}&body=${encodeURIComponent("Please subscribe " + input.value.trim() + " to BuildNexa updates.")}`;
      msg.textContent = "Opening your email app to confirm your subscription…";
      window.bnToast?.("Thanks for subscribing", { description: "Confirm in the email that's opening now.", type: "info" });
      nl.reset();
    });
  }

  /* ----------------------------------------------------------------------
     Hero video reel — two stacked <video> layers crossfade, so the next clip
     is already loaded and playing underneath (no background gap between clips).
     Reduce-motion and data-saver users keep the poster frame.
     ---------------------------------------------------------------------- */
  const heroVideo = $("[data-hero-video]");
  const saveData = navigator.connection && navigator.connection.saveData;
  if (heroVideo && !reduceMotion && !saveData) {
    const clips = heroVideo.dataset.clips.split(" ");
    const clipSeconds = parseFloat(heroVideo.dataset.clipSeconds) || Infinity;
    const pauseBtn = $("[data-hero-pause]");
    const back = heroVideo.cloneNode(false);
    back.removeAttribute("poster");
    back.removeAttribute("data-hero-video");
    back.preload = "auto";
    back.classList.add("is-hidden");
    heroVideo.after(back);
    // React sets `muted` as a property, not an attribute, so the clone isn't muted.
    // Unmuted video can't autoplay — mute both layers explicitly.
    [heroVideo, back].forEach((v) => { v.muted = true; v.playsInline = true; });

    let front = heroVideo, standby = back, clip = 0, advancing = false;
    const load = (video, i) => { video.src = clips[i % clips.length]; video.load(); };

    const nextClip = () => {
      if (advancing) return;
      advancing = true;
      const incoming = standby, outgoing = front;
      incoming.currentTime = 0;
      incoming.play().then(() => {
        clip = (clip + 1) % clips.length;
        incoming.style.zIndex = 2;           // fade the new clip in on top…
        outgoing.style.zIndex = 1;
        incoming.classList.remove("is-hidden");
        setTimeout(() => {                    // …then retire the old one underneath
          outgoing.pause();
          outgoing.classList.add("is-hidden");
          front = incoming;
          standby = outgoing;
          load(standby, clip + 1);
          advancing = false;
        }, 700);
      }).catch(() => {
        advancing = false; // couldn't start the next clip: keep the current one on screen and playing
      });
    };
    // Each clip plays for data-clip-seconds (or to its end if shorter)
    [heroVideo, back].forEach((v) => {
      v.addEventListener("ended", () => v === front && nextClip());
      v.addEventListener("timeupdate", () => v === front && v.currentTime >= clipSeconds && nextClip());
    });

    // Pause control: required for motion that runs longer than 5 seconds (WCAG 2.2.2)
    pauseBtn.hidden = false;
    pauseBtn.addEventListener("click", () => {
      const pausing = !front.paused;
      if (pausing) front.pause();
      else front.play().catch(() => {});
      pauseBtn.setAttribute("aria-pressed", String(pausing));
      pauseBtn.setAttribute("aria-label", pausing ? "Play background video" : "Pause background video");
    });

    load(front, 0);
    front.play().catch(() => {}); // autoplay can still be blocked; the poster stays
    load(standby, 1);
  }

  /* Footer year */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
}

export default function init() {
  block1();
}
