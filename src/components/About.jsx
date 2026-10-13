export default function About() {
  return (
    <>
      {/* ============ ABOUT ============ */}
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="container">
          <div className="about__grid">
            <figure className="about__media" data-reveal>
              <img src="/assets/img/about-frame.webp" width="1200" height="1000" loading="lazy" decoding="async"
                   alt="Steel frame of a multi-storey building rising beside two tower cranes"/>
            </figure>
            <div className="about__copy">
              <span className="section-index">01</span>
              <p className="eyebrow eyebrow--dark" data-reveal>About BuildNexa</p>
              <h2 id="about-title" className="section-title" data-split>Construction software built for <em>how sites really work.</em></h2>
              <span className="divider" aria-hidden="true"></span>
              <p className="about__lead" data-reveal>BuildNexa is a single, integrated system for running a construction or solar EPC business — from raising a purchase indent, to receiving material on site, to billing the client for progress achieved, to closing the books at month-end.</p>
              <p className="about__lead" data-reveal style={{ "--d": ".08s" }}>Every transactional document is connected: money and stock always trace back to the document that caused them, and every module feeds the same General Ledger and the same Daily Progress Report.</p>
              <a href="#services" className="btn btn--primary" data-reveal style={{ "--d": ".14s" }}><span>See what it covers</span><svg className="btn__icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
            </div>
          </div>
      
          <div className="about__cols">
            <div className="about__col" data-reveal>
              <h3>One record per project</h3>
              <p>Every PO, GRN, service bill, RA bill, cost entry and journal carries the project it belongs to — so project numbers and company books never drift apart.</p>
            </div>
            <div className="about__col" data-reveal style={{ "--d": ".1s" }}>
              <h3>Progress you don’t re-type</h3>
              <p>Tag a PO, GRN or work-order line to a WBS item and the Materials and Construction DPR update themselves — through cancellations too.</p>
            </div>
            <div className="about__col" data-reveal style={{ "--d": ".2s" }}>
              <h3>Books that stay correct</h3>
              <p>Closed periods can’t be posted into, cancellations reverse instead of edit, and a nightly integrity check ties stock, GRIR, AR and AP back to the ledger.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
