export default function Solutions() {
  return (
    <>
      {/* ============ SOLUTIONS ============ */}
      <section className="section solutions" id="solutions" aria-labelledby="solutions-title">
        <div className="container">
          <div className="section-head">
            <span className="section-index">03</span>
            <p className="eyebrow" data-reveal>How it connects</p>
            <h2 id="solutions-title" className="section-title" data-split>The links that keep <em>every number honest.</em></h2>
          </div>
      
          <div className="solutions__layout">
            <div className="solutions__steps">
              <article className="sol-step is-active" data-step="0">
                <span className="sol-step__k">01 — Materials</span>
                <h3>A Materials DPR that updates itself.</h3>
                <p>Tag a purchase-order line to a WBS item. When the PO is approved, quantity ordered fills in; when stores post the GRN, quantity received does too — and cancellations recompute it back.</p>
                <ul className="ticks"><li>PO lines carry the WBS item</li><li>GRN updates stock and the DPR together</li><li>Purchase bill 3-way matched to the GRN</li></ul>
              </article>
              <article className="sol-step" data-step="1">
                <span className="sol-step__k">02 — Subcontracts</span>
                <h3>Subcontract work billed on measured quantity.</h3>
                <p>Work orders carry WBS items too. Site records a contractor JMR — capped at the work-order quantity plus 10% — and the service bill raised on it books the cost and moves the Construction DPR.</p>
                <ul className="ticks"><li>JMR capped at work-order quantity + 10%</li><li>Retention and TDS split on posting</li><li>Cost entry booked to the project</li></ul>
              </article>
              <article className="sol-step" data-step="2">
                <span className="sol-step__k">03 — Control</span>
                <h3>Books you can close with confidence.</h3>
                <p>Every night the platform checks journal balance, stock against the ledger, GRIR clearing, postings after period lock, AR/AP tie-outs and duplicate postings — and alerts admins if anything is off.</p>
                <ul className="ticks"><li>9 automated integrity checks</li><li>Period lock &amp; year-end</li><li>Cancel guard with reversal entries</li></ul>
              </article>
            </div>
      
            <div className="solutions__stage" aria-hidden="true">
              <div className="console">
                <div className="console__bar"><i></i><i></i><i></i><span>buildnexa / materials-dpr</span></div>
                <div className="console__body">
                  {/* state 0 */}
                  <div className="cstate is-active" data-state="0">
                    <div className="cstate__row">
                      <div className="kpi"><span>Qty ordered</span><b>1,240 t</b></div>
                      <div className="kpi"><span>Qty received</span><b>980 t</b></div>
                      <div className="kpi kpi--blue"><span>Pending</span><b>260 t</b></div>
                    </div>
                    <div className="chart">
                      <svg viewBox="0 0 300 120" preserveAspectRatio="none">
                        <path className="chart__area" d="M0 110 L30 95 L60 98 L90 80 L120 84 L150 62 L180 66 L210 45 L240 50 L270 30 L300 26 L300 120 L0 120Z"/>
                        <path className="chart__line" d="M0 110 L30 95 L60 98 L90 80 L120 84 L150 62 L180 66 L210 45 L240 50 L270 30 L300 26"/>
                        <path className="chart__line chart__line--muted" d="M0 112 L30 104 L60 100 L90 94 L120 90 L150 84 L180 78 L210 72 L240 68 L270 60 L300 56"/>
                      </svg>
                    </div>
                  </div>
                  {/* state 1 */}
                  <div className="cstate" data-state="1">
                    <div className="flow">
                      <div className="flow__node is-done"><b>Service requisition</b><span>Site</span></div>
                      <div className="flow__link"></div>
                      <div className="flow__node is-done"><b>Work order</b><span>Procurement</span></div>
                      <div className="flow__link"></div>
                      <div className="flow__node is-now"><b>Contractor JMR</b><span>Site</span></div>
                      <div className="flow__link flow__link--wait"></div>
                      <div className="flow__node"><b>Service bill</b><span>Accounts</span></div>
                    </div>
                    <div className="cstate__note"><span className="status-dot"></span> JMR within work-order quantity + 10%</div>
                  </div>
                  {/* state 2 */}
                  <div className="cstate" data-state="2">
                    <div className="sites">
                      <div className="site"><span>Journal balance</span><div className="meter"><span style={{ "--w": "100%" }}></span></div></div>
                      <div className="site"><span>Stock ties to ledger</span><div className="meter"><span style={{ "--w": "100%" }}></span></div></div>
                      <div className="site"><span>GRIR clearing</span><div className="meter"><span style={{ "--w": "100%" }}></span></div></div>
                      <div className="site"><span>No posting after period lock</span><div className="meter"><span style={{ "--w": "100%" }}></span></div></div>
                      <div className="site"><span>AR / AP control tie-out</span><div className="meter"><span style={{ "--w": "100%" }}></span></div></div>
                    </div>
                    <div className="cstate__note"><span className="status-dot"></span> Nightly integrity check · all passed</div>
                  </div>
                </div>
              </div>
              <div className="stage-orbit" data-parallax="-0.12"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
