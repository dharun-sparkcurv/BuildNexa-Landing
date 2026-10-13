export default function Compare() {
  return (
    <>
      {/* ============ COMPARE ============ */}
      <section className="section compare" id="compare" aria-labelledby="compare-title" data-compare>
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="section-index">07</span>
              <p className="eyebrow" data-reveal>The real cost of the old way</p>
              <h2 id="compare-title" className="section-title" data-split>Spreadsheets break at <em>three sites.</em></h2>
            </div>
            <p className="section-lead" data-reveal>Most growing contractors run on Excel, registers and WhatsApp — until margins quietly leak between the cracks.</p>
          </div>
      
          <div className="compare__grid">
            <div className="compare__list" data-reveal>
              <div className="seg" role="group" aria-label="Compare">
                <span className="seg__ind" aria-hidden="true"></span>
                <button type="button" className="seg__btn" aria-pressed="true" data-cmp="before">Spreadsheets &amp; WhatsApp</button>
                <button type="button" className="seg__btn" aria-pressed="false" data-cmp="after">With BuildNexa</button>
              </div>
              <ul className="cmp" aria-live="polite">
                <li className="cmp__row" style={{ "--i": "0" }}><span className="cmp__icon" aria-hidden="true"></span><span className="cmp__txt"><span className="cmp__before">Job costs known only after month-end close</span><span className="cmp__after">Live cost by project and cost code, every day</span></span></li>
                <li className="cmp__row" style={{ "--i": "1" }}><span className="cmp__icon" aria-hidden="true"></span><span className="cmp__txt"><span className="cmp__before">Site updates scattered across WhatsApp and calls</span><span className="cmp__after">Daily progress logged per site and activity</span></span></li>
                <li className="cmp__row" style={{ "--i": "2" }}><span className="cmp__icon" aria-hidden="true"></span><span className="cmp__txt"><span className="cmp__before">Stock counted in paper registers at each site</span><span className="cmp__after">Multi-site stock, transfers and GRNs in one place</span></span></li>
                <li className="cmp__row" style={{ "--i": "3" }}><span className="cmp__icon" aria-hidden="true"></span><span className="cmp__txt"><span className="cmp__before">RA bills assembled manually in Excel</span><span className="cmp__after">RA bills from contract value × % complete</span></span></li>
                <li className="cmp__row" style={{ "--i": "4" }}><span className="cmp__icon" aria-hidden="true"></span><span className="cmp__txt"><span className="cmp__before">Subcontractor bills checked line by line</span><span className="cmp__after">Bills matched to work-order terms automatically</span></span></li>
                <li className="cmp__row" style={{ "--i": "5" }}><span className="cmp__icon" aria-hidden="true"></span><span className="cmp__txt"><span className="cmp__before">Approvals waiting days for a signature</span><span className="cmp__after">Configurable approval workflows with full history</span></span></li>
              </ul>
            </div>
      
            <form className="calc" data-calc data-reveal style={{ "--d": ".1s" }} onSubmit={(e) => e.preventDefault()}>
              <h3>What could leakage be costing you?</h3>
              <label className="calc__field"><span>Annual project value <output data-out="value">₹100 Cr</output></span>
                <input type="range" name="value" min="10" max="1000" step="10" value="100"/></label>
              <label className="calc__field"><span>Cost leakage (rework, idle stock, missed billing) <output data-out="leak">3%</output></span>
                <input type="range" name="leak" min="1" max="8" step="0.5" value="3"/></label>
              <label className="calc__field"><span>Share you could recover with live controls <output data-out="rec">40%</output></span>
                <input type="range" name="rec" min="10" max="80" step="5" value="40"/></label>
              <div className="calc__result">
                <div><span>Estimated leakage / year</span><b data-res="leak">₹3 Cr</b></div>
                <div className="calc__win"><span>Potential recovery / year</span><b data-res="rec">₹1.2 Cr</b></div>
              </div>
              <p className="calc__note">Illustrative estimate from your inputs — not a quote or guarantee. On thin construction margins, a few percent of leakage can erase a project's profit.</p>
              <a href="#contact" className="btn btn--primary" data-magnetic><span>Get a tailored estimate</span><svg className="btn__icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
