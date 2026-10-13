export default function Projects() {
  return (
    <>
      {/* ============ WORK ============ */}
      {/* Describes who BuildNexa is for. Add real, client-approved case studies here when available. */}
      <section className="section work" id="work" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="section-index">08</span>
              <p className="eyebrow" data-reveal>Projects</p>
              <h2 id="work-title" className="section-title" data-split>Built for the work <em>you actually do.</em></h2>
            </div>
            <p className="section-lead" data-reveal>How different construction businesses put BuildNexa to work — open a card for the modules involved.</p>
          </div>
      
          <div className="work-grid">
            <button className="project" type="button" data-project="0" data-cursor data-reveal style={{ "--d": "0s" }} aria-haspopup="dialog">
              <div className="project__media"><div className="pv__inner" data-parallax-inner>
                <img src="/assets/img/work-solar.webp" width="1200" height="750" loading="lazy" decoding="async" alt="Rows of solar panels installed on a large rooftop"/>
              </div></div>
              <div className="project__info">
                <span className="project__cat">Solar EPC</span>
                <h3>Solar EPC developers</h3>
                <p>Capacity-based WBS templates, DPR by category and RA billing on % complete.</p>
              </div>
            </button>
      
            <button className="project" type="button" data-project="1" data-cursor data-reveal style={{ "--d": "0.08s" }} aria-haspopup="dialog">
              <div className="project__media"><div className="pv__inner" data-parallax-inner>
                <img src="/assets/img/work-highrise.webp" width="1200" height="750" loading="lazy" decoding="async" alt="High-rise building under construction beside a tower crane"/>
              </div></div>
              <div className="project__info">
                <span className="project__cat">Construction</span>
                <h3>Building &amp; infrastructure contractors</h3>
                <p>Several projects and companies with procurement, stores and the ledger in one place.</p>
              </div>
            </button>
      
            <button className="project" type="button" data-project="2" data-cursor data-reveal style={{ "--d": "0s" }} aria-haspopup="dialog">
              <div className="project__media"><div className="pv__inner" data-parallax-inner>
                <img src="/assets/img/work-framing.webp" width="1200" height="750" loading="lazy" decoding="async" alt="Worker in a hard hat on the timber frame of a building"/>
              </div></div>
              <div className="project__info">
                <span className="project__cat">Subcontracting</span>
                <h3>Subcontract-heavy delivery</h3>
                <p>Work orders, contractor JMRs and service bills tied to the Construction DPR.</p>
              </div>
            </button>
      
            <button className="project" type="button" data-project="3" data-cursor data-reveal style={{ "--d": "0.08s" }} aria-haspopup="dialog">
              <div className="project__media"><div className="pv__inner" data-parallax-inner>
                <img src="/assets/img/work-steel.webp" width="1200" height="750" loading="lazy" decoding="async" alt="Steel reinforcement bars stacked on warehouse shelving"/>
              </div></div>
              <div className="project__info">
                <span className="project__cat">Production</span>
                <h3>In-house manufacturing</h3>
                <p>Plants &amp; BOM, production runs and dispatches that land stock back on site.</p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
