export default function Process() {
  return (
    <>
      {/* ============ PROCESS (horizontal pinned) ============ */}
      <section className="process" id="process" aria-labelledby="process-title" data-hscroll>
        <div className="process__sticky">
          <div className="container process__head">
            <div>
              <span className="section-index">06</span>
              <p className="eyebrow" data-reveal>How a project travels</p>
              <h2 id="process-title" className="section-title" data-split>From setup to audit, <em>one connected journey.</em></h2>
            </div>
            <div className="process__progress" aria-hidden="true"><span data-hscroll-bar></span></div>
          </div>
          <div className="process__viewport">
            <ol className="process__track" data-hscroll-track>
              <li className="pstep"><span className="pstep__n">01</span><h3>Organisation setup</h3><p>Companies, chart of accounts, tax codes, numbering series and approval workflows — the foundation every module reads.</p><span className="pstep__d">Masters</span></li>
              <li className="pstep"><span className="pstep__n">02</span><h3>Client &amp; project</h3><p>Create the client with GSTIN and retention/TDS defaults, then the project with contract value, capacity and dates.</p><span className="pstep__d">Clients · All projects</span></li>
              <li className="pstep"><span className="pstep__n">03</span><h3>WBS &amp; weightages</h3><p>Import from a template or Excel. Every item is Engineering, Procurement or Construction, with a weightage that drives % complete.</p><span className="pstep__d">WBS</span></li>
              <li className="pstep"><span className="pstep__n">04</span><h3>Procure &amp; build</h3><p>POs, GRNs, work orders and JMRs update the DPR as they post; site logs daily progress, delays and equipment.</p><span className="pstep__d">Procurement · DPR</span></li>
              <li className="pstep"><span className="pstep__n">05</span><h3>Bill &amp; collect</h3><p>Raise RA bills on cumulative % complete, record client payments and track the client ledger.</p><span className="pstep__d">RA bills · Payments</span></li>
              <li className="pstep"><span className="pstep__n">06</span><h3>Close &amp; audit</h3><p>Close periods, run financial statements and cost to completion, and hand the ledger to your auditor via Tally export.</p><span className="pstep__d">Reports · Tally</span></li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
