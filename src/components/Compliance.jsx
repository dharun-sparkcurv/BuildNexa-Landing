export default function Compliance() {
  return (
    <>
      {/* ============ INDIA BAND ============ */}
      <section className="local" aria-labelledby="local-title">
        <div className="container local__inner" data-reveal>
          <div className="local__col">
            <p className="eyebrow">Built for how contracting works here</p>
            <h2 id="local-title" className="local__title">Compliance and billing, <em>handled natively.</em></h2>
            <ul className="local__chips"><li>GST tax codes</li><li>TDS register · 194C / 194I / 194J / 194Q</li><li>Retention &amp; TDS defaults per client</li><li>RA / running-account bills</li><li>Statutory approvals with expiry alerts</li><li>Period lock &amp; year-end</li><li>Weighbridge tickets</li></ul>
          </div>
          <div className="local__col">
            <p className="eyebrow">Works with the tools you already use</p>
            <ul className="local__tools"><li><b>Tally</b><span>Ledger export (XML)</span></li><li><b>Excel</b><span>Workbook import</span></li><li><b>CSV</b><span>Export on every table</span></li><li><b>WhatsApp</b><span>Reminders</span></li><li><b>Email</b><span>Approvals &amp; alerts</span></li><li><b>Invoices</b><span>Upload to auto-fill bills</span></li></ul>
          </div>
        </div>
      </section>
    </>
  );
}
