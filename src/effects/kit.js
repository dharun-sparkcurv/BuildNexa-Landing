/* ==========================================================================
   BuildNexa — UI kit behaviour
   Vanilla ports of React Bits (DecryptedText, ScrollVelocity),
   Aceternity (Lamp in-view) and shadcn/ui (Accordion, Toast, Command).
   ========================================================================== */
function block1() {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasIO = "IntersectionObserver" in window;

  const onceInView = (els, fn, opts = { threshold: 0.3 }) => {
    if (!hasIO) { els.forEach(fn); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); }
    }), opts);
    els.forEach((el) => io.observe(el));
  };

  /* ----------------------------------------------------------------------
     [shadcn] Toast — window.bnToast(title, { description, type })
     ---------------------------------------------------------------------- */
  const toaster = $("[data-toaster]");
  const ICONS = { success: "✓", error: "!", info: "i" };
  function toast(title, { description = "", type = "success", duration = 5000 } = {}) {
    if (!toaster) return;
    const li = document.createElement("li");
    li.className = `toast toast--${type}`;
    li.setAttribute("role", type === "error" ? "alert" : "status");
    li.innerHTML = `<span class="toast__dot" aria-hidden="true">${ICONS[type] || ICONS.info}</span>
      <div><p class="toast__title"></p>${description ? '<p class="toast__desc"></p>' : ""}</div>
      <button class="toast__close" aria-label="Dismiss notification">×</button>`;
    $(".toast__title", li).textContent = title;
    if (description) $(".toast__desc", li).textContent = description;
    const dismiss = () => {
      if (li.classList.contains("is-leaving")) return;
      li.classList.add("is-leaving");
      setTimeout(() => li.remove(), reduceMotion ? 0 : 350);
    };
    $(".toast__close", li).addEventListener("click", dismiss);
    let timer = setTimeout(dismiss, duration);
    li.addEventListener("pointerenter", () => clearTimeout(timer));
    li.addEventListener("pointerleave", () => (timer = setTimeout(dismiss, 2000)));
    toaster.prepend(li);
    while (toaster.children.length > 3) toaster.lastElementChild.remove();
  }
  window.bnToast = toast;

  /* ----------------------------------------------------------------------
     [React Bits] DecryptedText — mono labels scramble into place
     ---------------------------------------------------------------------- */
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*+<>";
  function decrypt(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node = null;
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (n.textContent.trim() && (!node || n.textContent.length > node.textContent.length)) node = n;
    }
    if (!node) return;
    const final = node.textContent;
    const total = 22;
    let frame = 0;
    const tick = () => {
      frame++;
      const revealed = Math.floor((frame / total) * final.length);
      node.textContent = final.split("").map((ch, i) =>
        i < revealed || ch === " " || ch === "·" ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join("");
      if (frame < total) setTimeout(tick, 32);
      else node.textContent = final;
    };
    tick();
  }
  if (!reduceMotion) {
    const labels = $$(".eyebrow, .section-index, .sol-step__k, .bento__k");
    labels.forEach((el) => { if (!el.hasAttribute("aria-label")) el.setAttribute("aria-label", el.textContent.trim()); });
    // Wait for the loader to clear so the hero label is visible when it scrambles
    const start = () => onceInView(labels, decrypt, { threshold: 0.6 });
    document.body.classList.contains("is-loading") ? setTimeout(start, 1700) : start();
  }

  /* ----------------------------------------------------------------------
     [Aceternity] Lamp — light up when in view
     ---------------------------------------------------------------------- */
  onceInView($$("[data-inview]"), (el) => el.classList.add("is-in"), { threshold: 0.25 });

  /* ----------------------------------------------------------------------
     [React Bits] ScrollVelocity — marquee speeds up & flips with scroll
     ---------------------------------------------------------------------- */
  const marquee = $(".marquee");
  if (marquee && !reduceMotion) {
    const track = $(".marquee__track", marquee);
    const list = $(".marquee__list", marquee);
    marquee.classList.add("is-velocity");
    let x = 0, dir = 1, vel = 0, lastY = window.scrollY, lastT = performance.now(), running = false, visible = false, hover = false;
    const BASE = 50; // px per second
    const loop = (now) => {
      if (!visible) { running = false; return; }
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      vel += (dy / Math.max(dt, 0.001) - vel) * 0.1; // smoothed px/s
      if (Math.abs(dy) > 0.5) dir = dy > 0 ? 1 : -1;
      const boost = 1 + Math.min(Math.abs(vel) / 220, 6);
      x -= BASE * boost * dir * dt * (hover ? 0.15 : 1);
      const w = list.offsetWidth;
      if (x <= -w) x += w;
      if (x > 0) x -= w;
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      requestAnimationFrame(loop);
    };
    marquee.addEventListener("pointerenter", () => (hover = true));
    marquee.addEventListener("pointerleave", () => (hover = false));
    if (hasIO) {
      new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !running) { running = true; lastT = performance.now(); lastY = window.scrollY; requestAnimationFrame(loop); }
      }).observe(marquee);
    }
  }

  /* ----------------------------------------------------------------------
     [shadcn] Accordion — <details name="faq"> with height animation
     ---------------------------------------------------------------------- */
  $$(".acc").forEach((d) => {
    const summary = $("summary", d);
    const body = $(".acc__body", d);
    summary.addEventListener("click", (e) => {
      if (reduceMotion || !body.animate) return; // native toggle
      e.preventDefault();
      if (d.open) {
        const h = body.offsetHeight;
        body.animate([{ height: h + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" })
          .onfinish = () => d.removeAttribute("open");
      } else {
        // close siblings in the same group (exclusive accordion)
        $$(`.acc[name="${d.getAttribute("name")}"][open]`).forEach((o) => o !== d && $("summary", o).click());
        d.setAttribute("open", "");
        const h = body.offsetHeight;
        body.animate([{ height: "0px", opacity: 0 }, { height: h + "px", opacity: 1 }], { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" });
      }
    });
  });

  /* ----------------------------------------------------------------------
     [shadcn] Command palette — Ctrl/⌘ + K
     ---------------------------------------------------------------------- */
  const cmdk = $("[data-cmdk]");
  if (cmdk) {
    const input = $(".cmdk__input", cmdk);
    const listEl = $(".cmdk__list", cmdk);
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    $$("[data-kbd-mod]").forEach((k) => (k.textContent = isMac ? "⌘" : "Ctrl"));

    const go = (hash) => () => (window.bnScrollTo ? window.bnScrollTo(hash) : document.querySelector(hash)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }));
    const ITEMS = [
      { g: "Navigate", k: "01", label: "About BuildNexa", run: go("#about") },
      { g: "Navigate", k: "02", label: "Services", run: go("#services") },
      { g: "Navigate", k: "03", label: "Solutions & capabilities", run: go("#solutions") },
      { g: "Navigate", k: "04", label: "Built for every role", run: go("#roles") },
      { g: "Navigate", k: "—", label: "GST, RA billing & integrations", run: go("#local-title") },
      { g: "Navigate", k: "05", label: "Why choose us", run: go("#why") },
      { g: "Navigate", k: "06", label: "Our process", run: go("#process") },
      { g: "Navigate", k: "07", label: "Cost of the old way · calculator", run: go("#compare") },
      { g: "Navigate", k: "08", label: "Featured projects", run: go("#work") },
      { g: "Navigate", k: "09", label: "FAQ", run: go("#faq") },
      { g: "Navigate", k: "10", label: "Contact", run: go("#contact") },
      { g: "Actions", k: "→", label: "Start a project", run: () => { go("#contact")(); setTimeout(() => $("#f-name")?.focus({ preventScroll: true }), 800); } },
      { g: "Actions", k: "@", label: "Email hello@buildnexa.io", run: () => (window.location.href = "mailto:hello@buildnexa.io") },
      { g: "Actions", k: "⎘", label: "Copy email address", run: () => navigator.clipboard?.writeText("hello@buildnexa.io").then(() => toast("Email copied", { description: "hello@buildnexa.io", type: "info" })) },
      { g: "Actions", k: "↑", label: "Back to top", run: go("#top") },
    ];
    let filtered = ITEMS, active = 0;

    const render = () => {
      const q = input.value.trim().toLowerCase();
      filtered = ITEMS.filter((it) => it.label.toLowerCase().includes(q));
      active = Math.min(active, Math.max(filtered.length - 1, 0));
      if (!filtered.length) { listEl.innerHTML = `<p class="cmdk__empty">No results found.</p>`; input.removeAttribute("aria-activedescendant"); return; }
      let html = "", group = "";
      filtered.forEach((it, i) => {
        if (it.g !== group) { group = it.g; html += `<p class="cmdk__group" role="presentation">${group}</p>`; }
        html += `<div class="cmdk__item" role="option" id="cmdk-${i}" data-i="${i}" aria-selected="${i === active}"><span>${it.k}</span>${it.label}</div>`;
      });
      listEl.innerHTML = html;
      input.setAttribute("aria-activedescendant", "cmdk-" + active);
      $(`#cmdk-${active}`)?.scrollIntoView({ block: "nearest" });
    };
    const open = () => { input.value = ""; active = 0; render(); cmdk.showModal(); input.focus(); };
    const choose = (i) => { const it = filtered[i]; if (!it) return; cmdk.close(); it.run(); };

    $$("[data-cmdk-open]").forEach((b) => b.addEventListener("click", open));
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmdk.open ? cmdk.close() : open(); }
    });
    input.addEventListener("input", () => { active = 0; render(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % Math.max(filtered.length, 1); render(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = (active - 1 + filtered.length) % Math.max(filtered.length, 1); render(); }
      else if (e.key === "Enter") { e.preventDefault(); choose(active); }
    });
    listEl.addEventListener("click", (e) => { const item = e.target.closest(".cmdk__item"); if (item) choose(+item.dataset.i); });
    listEl.addEventListener("pointermove", (e) => {
      const item = e.target.closest(".cmdk__item");
      if (item && +item.dataset.i !== active) { active = +item.dataset.i; render(); }
    });
    cmdk.addEventListener("click", (e) => { if (e.target === cmdk) cmdk.close(); });
  }
}

/* ==========================================================================
   Buyer-research sections — [shadcn] Tabs, Toggle group, Slider
   ========================================================================== */
function block2() {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Slide an indicator under the active control
  const slide = (ind, btn) => { if (!ind || !btn) return; ind.style.width = btn.offsetWidth + "px"; ind.style.translate = btn.offsetLeft + "px 0"; };

  /* ---------- Roles: accessible tabs (arrow keys, Home/End) ---------- */
  const tablist = $(".roles__tabs");
  if (tablist) {
    const tabs = $$('[role="tab"]', tablist);
    const ind = $(".roles__ind", tablist);
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      slide(ind, tab);
      if (focus) tab.focus();
      tab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
    };
    tabs.forEach((t) => t.addEventListener("click", () => select(t)));
    tablist.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (next == null) return;
      e.preventDefault();
      select(tabs[(next + tabs.length) % tabs.length], true);
    });
    const sync = () => slide(ind, tabs.find((t) => t.getAttribute("aria-selected") === "true"));
    window.addEventListener("resize", sync);
    if (document.fonts) document.fonts.ready.then(sync);
    sync();
  }

  /* ---------- Compare: before / after toggle (auto-flips once in view) ---------- */
  const cmp = $("[data-compare]");
  if (cmp) {
    const btns = $$("[data-cmp]", cmp);
    const ind = $(".seg__ind", cmp);
    let touched = false;
    const set = (mode) => {
      cmp.classList.toggle("is-after", mode === "after");
      btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cmp === mode)));
      slide(ind, btns.find((b) => b.dataset.cmp === mode));
    };
    btns.forEach((b) => b.addEventListener("click", () => { touched = true; set(b.dataset.cmp); }));
    window.addEventListener("resize", () => slide(ind, btns.find((b) => b.getAttribute("aria-pressed") === "true")));
    if (document.fonts) document.fonts.ready.then(() => set(cmp.classList.contains("is-after") ? "after" : "before"));
    set("before");
    if ("IntersectionObserver" in window && !reduceMotion) {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setTimeout(() => { if (!touched) set("after"); }, 1400);
      }, { threshold: 0.5 });
      io.observe($(".cmp", cmp));
    }
  }

  /* ---------- Leakage calculator ---------- */
  const calc = $("[data-calc]");
  if (calc) {
    const fmt = (cr) => (cr >= 1 ? `₹${cr.toFixed(cr >= 100 ? 0 : 1).replace(/\.0$/, "")} Cr` : `₹${Math.round(cr * 100)} L`);
    const outs = { value: (v) => `₹${v} Cr`, leak: (v) => `${v}%`, rec: (v) => `${v}%` };
    const animateTo = (el, to) => {
      const from = parseFloat(el.dataset.v || to);
      el.dataset.v = to;
      if (reduceMotion) { el.textContent = fmt(to); return; }
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / 400, 1);
        el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const update = () => {
      const v = Object.fromEntries($$("input", calc).map((i) => {
        i.style.setProperty("--fill", ((i.value - i.min) / (i.max - i.min)) * 100 + "%");
        $(`[data-out="${i.name}"]`, calc).textContent = outs[i.name](i.value);
        return [i.name, parseFloat(i.value)];
      }));
      const leak = v.value * (v.leak / 100);
      animateTo($('[data-res="leak"]', calc), leak);
      animateTo($('[data-res="rec"]', calc), leak * (v.rec / 100));
    };
    calc.addEventListener("input", update);
    update();
  }
}

export default function init() {
  block1();
  block2();
}
