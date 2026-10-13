export default function Hero() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__media" aria-hidden="true">
          {/* Clips play in order (js/main.js); reduce-motion and data-saver users see the poster only */}
          <video className="hero__video" data-hero-video muted playsInline preload="none"
                 poster="/assets/img/hero-video-poster.webp" width="1280" height="720"
                 data-clips="/assets/video/hero-1-city.mp4 /assets/video/hero-2-engineers.mp4 /assets/video/hero-3-tower.mp4 /assets/video/hero-4-site.mp4 /assets/video/hero-5-sitelead.mp4 /assets/video/hero-6-solar.mp4" data-clip-seconds="6"></video>
        </div>
        <div className="hero__overlay" aria-hidden="true"></div>
        <div className="slash slash--hero" aria-hidden="true"></div>
        <button className="hero__pause" type="button" data-hero-pause aria-pressed="false" aria-label="Pause background video" hidden></button>
      
        <div className="container hero__content">
          <div className="hero__panel">
            <p className="badge" data-reveal>Construction ERP platform</p>
            <h1 className="hero__title" id="hero-title" data-split>Build smarter. <em>Control every site.</em></h1>
            <p className="hero__lead" data-reveal style={{ "--d": ".45s" }}>
              One system of record for construction and solar EPC delivery — WBS and daily progress, procure-to-pay, stores, client billing and the general ledger, all connected.
            </p>
            <div className="hero__actions" data-reveal style={{ "--d": ".6s" }}>
              <a href="#contact" className="btn btn--primary" data-magnetic>
                <span>Request a demo</span><svg className="btn__icon" aria-hidden="true"><use href="#i-arrow"/></svg>
              </a>
              <a href="#work" className="btn btn--ghost" data-magnetic><span>Explore projects</span></a>
            </div>
            <ul className="hero__trust" data-reveal style={{ "--d": ".75s" }} aria-label="Platform highlights">
              <li>Solar EPC &amp; construction</li><li>Every document tied to the ledger</li><li>Tally-compatible export</li>
            </ul>
          </div>
        </div>
        <div className="hero__meta container" aria-hidden="true"></div>
      </section>
      
      {/* ============ QUICK ACCESS ============ */}
      <nav className="quick" aria-label="Quick access">
        <div className="container">
          <div className="quick__grid">
            <a className="quick__item" href="#work">
              <span className="quick__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-5-5-8 9"/></svg></span>
              <span><b>Projects</b><span>See how solar EPC, building and subcontract-heavy teams run on BuildNexa.</span></span>
            </a>
            <a className="quick__item" href="#faq">
              <span className="quick__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9.8 9.5a2.3 2.3 0 0 1 4.4.8c0 1.6-2.2 2-2.2 3.2"/><path d="M12 16.2h.01"/></svg></span>
              <span><b>FAQs</b><span>Answers on Excel import, Tally, RA billing, corrections and access.</span></span>
            </a>
            <a className="quick__item quick__item--accent" href="#contact">
              <span className="quick__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg></span>
              <span><b>Contact</b><span>Have a project in mind? Talk to us about a walkthrough for your team.</span></span>
            </a>
          </div>
        </div>
      </nav>
      
      {/* Marquee */}
      <div className="marquee" aria-label="Who BuildNexa is for">
        <div className="marquee__track">
          <ul className="marquee__list">
            <li>General Contractors</li><li>Real Estate Developers</li><li>Infrastructure</li><li>Solar EPC</li><li>Engineering Firms</li><li>Subcontractors</li><li>Industrial Projects</li><li>Multi-company Groups</li>
          </ul>
          <ul className="marquee__list" aria-hidden="true">
            <li>General Contractors</li><li>Real Estate Developers</li><li>Infrastructure</li><li>Solar EPC</li><li>Engineering Firms</li><li>Subcontractors</li><li>Industrial Projects</li><li>Multi-company Groups</li>
          </ul>
        </div>
      </div>
    </>
  );
}
