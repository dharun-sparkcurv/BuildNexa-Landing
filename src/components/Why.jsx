export default function Why() {
  return (
    <>
      {/* ============ WHY ============ */}
      <section className="section why" id="why" aria-labelledby="why-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="section-index">05</span>
              <p className="eyebrow eyebrow--dark" data-reveal>Why choose us</p>
              <h2 id="why-title" className="section-title" data-split>Built different, <em>on purpose.</em></h2>
            </div>
            <p className="section-lead" data-reveal>Designed around how EPC and construction businesses actually move money, material and progress.</p>
          </div>
      
          <div className="bento">
            <article className="bento__item bento__item--wide" data-reveal data-spot>
              <span className="bento__k">Connected</span>
              <h3>One field ties progress to money.</h3>
              <p>Every PO, GRN and work-order line can carry a WBS item. That single link keeps the Materials and Construction DPR accurate without double entry.</p>
              <div className="bento__viz bento__viz--pulse" aria-hidden="true"><i></i><i></i><i></i></div>
            </article>
            <article className="bento__item" data-reveal style={{ "--d": ".08s" }} data-spot>
              <span className="bento__k">Integrity</span>
              <h3>Checked every night.</h3>
              <p>Nine automated checks tie journals, stock, GRIR, AR and AP back to the ledger, and the audit log records every create, approve, post and cancel.</p>
            </article>
            <article className="bento__item" data-reveal style={{ "--d": ".12s" }} data-spot>
              <span className="bento__k">Configurable</span>
              <h3>Your rules, codified.</h3>
              <p>Approval workflows, numbering series like PO/FY2627/0001, tax codes and reusable WBS templates.</p>
            </article>
            <article className="bento__item" data-reveal style={{ "--d": ".16s" }} data-spot>
              <span className="bento__k">Alerts</span>
              <h3>Problems surface themselves.</h3>
              <p>Overdue drawings, POs, deliveries and construction, low stock, legal expiries and hearings raise alerts automatically.</p>
              <div className="bento__viz bento__viz--speed" aria-hidden="true"><span></span></div>
            </article>
            <article className="bento__item bento__item--dark" data-reveal style={{ "--d": ".2s" }} data-spot>
              <span className="bento__k">Day one</span>
              <h3>Start from your spreadsheets.</h3>
              <p>Workbook Import brings existing Excel DPR trackers — WBS, weightages, quantities and dates — into a project.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
