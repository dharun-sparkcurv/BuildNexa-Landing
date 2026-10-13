export default function Faq() {
  return (
    <>
      {/* ============ FAQ ============ */}
      <section className="section faq" id="faq" aria-labelledby="faq-title">
        <div className="container faq__grid">
          <div className="faq__aside">
            <span className="section-index">09</span>
            <p className="eyebrow" data-reveal>FAQ</p>
            <h2 id="faq-title" className="section-title" data-split>Questions, <em>answered.</em></h2>
            <p className="section-lead" data-reveal>Straight answers from how the platform works. Can't find what you're looking for?</p>
            <a href="#contact" className="btn btn--ghost" data-magnetic><span>Ask us directly</span></a>
          </div>
          <div className="acc-list" data-reveal>
            <details className="acc" name="faq" open>
              <summary>Can we bring our existing Excel DPR trackers?<span className="acc__icon" aria-hidden="true"></span></summary>
              <div className="acc__body"><p>Yes. Workbook Import previews your .xlsx row by row — WBS items, scope quantities and dates — before it creates anything. Templates are available from the Setup Library.</p></div>
            </details>
            <details className="acc" name="faq">
              <summary>Does BuildNexa work with Tally?<span className="acc__icon" aria-hidden="true"></span></summary>
              <div className="acc__body"><p>Yes. Ledger &amp; Tally Export exports the period’s vouchers as Tally-compatible XML for your statutory auditor.</p></div>
            </details>
            <details className="acc" name="faq">
              <summary>How are client RA bills calculated?<span className="acc__icon" aria-hidden="true"></span></summary>
              <div className="acc__body"><p>At project level: contract value × cumulative % complete, less what has already been billed. Retention and TDS defaults come from the client master, so nobody re-types them.</p></div>
            </details>
            <details className="acc" name="faq">
              <summary>What if a document was posted by mistake?<span className="acc__icon" aria-hidden="true"></span></summary>
              <div className="acc__body"><p>Cancel it. The cancel guard first checks that nothing downstream still depends on it, then posts a reversal entry (never an edit), reverses any stock movement and recomputes the linked DPR quantities.</p></div>
            </details>
            <details className="acc" name="faq">
              <summary>Who can see what?<span className="acc__icon" aria-hidden="true"></span></summary>
              <div className="acc__body"><p>Each user has one organisation role — Org admin, Portfolio lead, Accounts, Procurement, Stores, HR or Member — plus project roles such as Project manager, Engineering, Procurement, Site or Viewer.</p></div>
            </details>
            <details className="acc" name="faq">
              <summary>Is it only for solar projects?<span className="acc__icon" aria-hidden="true"></span></summary>
              <div className="acc__body"><p>No. BuildNexa started with solar EPC delivery, and the same WBS, procurement, inventory and finance modules run building, infrastructure and other construction projects.</p></div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
