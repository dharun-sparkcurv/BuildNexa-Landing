export default function Modules() {
  return (
    <>
      {/* ============ SERVICES ============ */}
      <section className="section services" id="services" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="section-index">02</span>
            <p className="eyebrow" data-reveal>Platform modules</p>
            <h2 id="services-title" className="section-title" data-split>Everything a construction business runs on, <em>in one place.</em></h2>
            <span className="divider divider--center" aria-hidden="true"></span>
            <p className="section-lead" data-reveal>Module groups on one shared ledger — the same names your teams will see in the app’s sidebar.</p>
          </div>
      
          <div className="service-grid">
            <article className="service-card" data-reveal style={{ "--d": "0s" }}>
              <figure className="service-card__media"><img src="/assets/img/svc-cranes.webp" width="800" height="500" loading="lazy" decoding="async" alt="Tower cranes against an evening sky over a construction site"/></figure>
              <div className="service-card__body">
                <span className="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21h18"/><rect x="5" y="10" width="4" height="11"/><rect x="10" y="6" width="4" height="15"/><rect x="15" y="3" width="4" height="18"/></svg></span>
                <h3>Projects &amp; DPR</h3>
                <p>WBS &amp; weightages, Engineering, Materials and Construction DPR, Plan vs Actual, Master Schedule, Project 360 and daily progress reports.</p>
                <a className="service-card__link" href="#contact" aria-label="Ask about Projects &amp; DPR">Learn more <svg aria-hidden="true"><use href="#i-arrow-ur"/></svg></a>
              </div>
            </article>
            <article className="service-card" data-reveal style={{ "--d": "0.06s" }}>
              <figure className="service-card__media"><img src="/assets/img/svc-laptop.webp" width="800" height="500" loading="lazy" decoding="async" alt="Laptop on a job site showing a 3D structural model"/></figure>
              <div className="service-card__body">
                <span className="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11M9 8h6M9 11h4"/></svg></span>
                <h3>Finance &amp; Accounting</h3>
                <p>Chart of accounts, journals, periods &amp; year-end, inter-company loans, financial statements, aging and Tally-compatible ledger export.</p>
                <a className="service-card__link" href="#contact" aria-label="Ask about Finance &amp; Accounting">Learn more <svg aria-hidden="true"><use href="#i-arrow-ur"/></svg></a>
              </div>
            </article>
            <article className="service-card" data-reveal style={{ "--d": "0.12s" }}>
              <figure className="service-card__media"><img src="/assets/img/svc-team.webp" width="800" height="500" loading="lazy" decoding="async" alt="Site team in hard hats reviewing work together"/></figure>
              <div className="service-card__body">
                <span className="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11h10.2L20 8H7"/><circle cx="9" cy="19" r="1.6"/><circle cx="17" cy="19" r="1.6"/></svg></span>
                <h3>Procurement</h3>
                <p>Materials: Indent → Requisition → RFQ → PO → GRN → Bill → Payment. Subcontracts: Service Requisition → Work Order → JMR → Service Bill.</p>
                <a className="service-card__link" href="#contact" aria-label="Ask about Procurement">Learn more <svg aria-hidden="true"><use href="#i-arrow-ur"/></svg></a>
              </div>
            </article>
            <article className="service-card" data-reveal style={{ "--d": "0s" }}>
              <figure className="service-card__media"><img src="/assets/img/svc-blueprints.webp" width="800" height="500" loading="lazy" decoding="async" alt="Laptop and construction drawings on a desk"/></figure>
              <div className="service-card__body">
                <span className="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg></span>
                <h3>Clients &amp; Billing</h3>
                <p>Leads, tenders, proposals and contracts through to RA bills, client advances, client payments and the client ledger.</p>
                <a className="service-card__link" href="#contact" aria-label="Ask about Clients &amp; Billing">Learn more <svg aria-hidden="true"><use href="#i-arrow-ur"/></svg></a>
              </div>
            </article>
            <article className="service-card" data-reveal style={{ "--d": "0.06s" }}>
              <figure className="service-card__media"><img src="/assets/img/svc-city-cranes.webp" width="800" height="500" loading="lazy" decoding="async" alt="City skyline with several tower cranes at work"/></figure>
              <div className="service-card__body">
                <span className="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V9l6 4V9l6 4V5h4v16z"/><path d="M8 17h2M14 17h2"/></svg></span>
                <h3>Assets, Plant &amp; Production</h3>
                <p>Asset register and depreciation, equipment logbook, hire orders, weighbridge, plants &amp; BOM, production runs and dispatches.</p>
                <a className="service-card__link" href="#contact" aria-label="Ask about Assets, Plant &amp; Production">Learn more <svg aria-hidden="true"><use href="#i-arrow-ur"/></svg></a>
              </div>
            </article>
            <article className="service-card" data-reveal style={{ "--d": "0.12s" }}>
              <figure className="service-card__media"><img src="/assets/img/svc-field.webp" width="800" height="500" loading="lazy" decoding="async" alt="Site engineer in a white hard hat and high-visibility vest"/></figure>
              <div className="service-card__body">
                <span className="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></svg></span>
                <h3>Inventory &amp; Stores</h3>
                <p>Warehouses, receipts, goods issues, store returns, adjustments and transfers — every movement costed and tied to the ledger.</p>
                <a className="service-card__link" href="#contact" aria-label="Ask about Inventory &amp; Stores">Learn more <svg aria-hidden="true"><use href="#i-arrow-ur"/></svg></a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
