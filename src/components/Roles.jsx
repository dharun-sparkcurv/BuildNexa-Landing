export default function Roles() {
  return (
    <>
      {/* ============ ROLES ============ */}
      <section className="section roles" id="roles" aria-labelledby="roles-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="section-index">04</span>
              <p className="eyebrow" data-reveal>Built for every seat</p>
              <h2 id="roles-title" className="section-title" data-split>One platform. <em>Every role on the project.</em></h2>
            </div>
            <p className="section-lead" data-reveal>Organisation roles and project roles decide who sees what — so each team gets the screens it needs, without re-keying a single number.</p>
          </div>
          <div className="roles__tabs-wrap" data-reveal>
            <div className="roles__tabs" role="tablist" aria-label="Choose your role">
              <span className="roles__ind" aria-hidden="true"></span>
              <button className="roles__tab" role="tab" id="tab-org" aria-controls="panel-org" aria-selected="true" tabIndex="0">Admin &amp; portfolio lead</button>
              <button className="roles__tab" role="tab" id="tab-pm" aria-controls="panel-pm" aria-selected="false" tabIndex="-1">Project manager</button>
              <button className="roles__tab" role="tab" id="tab-site" aria-controls="panel-site" aria-selected="false" tabIndex="-1">Site team</button>
              <button className="roles__tab" role="tab" id="tab-accounts" aria-controls="panel-accounts" aria-selected="false" tabIndex="-1">Accounts</button>
              <button className="roles__tab" role="tab" id="tab-proc" aria-controls="panel-proc" aria-selected="false" tabIndex="-1">Procurement &amp; stores</button>
            </div>
          </div>
          <div className="roles__panels" data-reveal>
            <div className="roles__panel" role="tabpanel" id="panel-org" aria-labelledby="tab-org" tabIndex="0">
              <div className="roles__copy">
                <p className="roles__pain">“I only find out a project is behind when the month closes.”</p>
                <h3>The whole portfolio, live.</h3>
                <ul className="ticks"><li>Portfolio Overview with progress and S-curve status</li><li>Executive dashboard, cost to completion and aging</li><li>Permission matrix, audit log and integrity checks</li></ul>
              </div>
              <div className="roles__mock" aria-hidden="true">
                <div className="console__bar"><i></i><i></i><i></i><span>buildnexa / org</span></div>
                <div className="roles__mock-body"><div className="cstate__row"><div className="kpi"><span>Projects</span><b>12 live</b></div><div className="kpi"><span>Behind plan</span><b>2</b></div><div className="kpi kpi--blue"><span>Open alerts</span><b>7</b></div></div><div className="sites"><div className="site"><span>SPV-001 · Solar park</span><div className="meter"><span style={{ "--w": "72%" }}></span></div></div><div className="site"><span>Tower B</span><div className="meter"><span style={{ "--w": "54%" }}></span></div></div><div className="site"><span>Depot works</span><div className="meter"><span style={{ "--w": "31%" }}></span></div></div></div></div>
              </div>
            </div>
            <div className="roles__panel" role="tabpanel" id="panel-pm" aria-labelledby="tab-pm" tabIndex="0" hidden>
              <div className="roles__copy">
                <p className="roles__pain">“Every site reports progress in a different spreadsheet.”</p>
                <h3>One WBS, rolled up automatically.</h3>
                <ul className="ticks"><li>WBS &amp; weightages from a template or Excel import</li><li>Plan vs Actual and Master Schedule</li><li>Alerts for overdue drawings, POs and deliveries</li></ul>
              </div>
              <div className="roles__mock" aria-hidden="true">
                <div className="console__bar"><i></i><i></i><i></i><span>buildnexa / pm</span></div>
                <div className="roles__mock-body"><div className="sites"><div className="site"><span>Engineering</span><div className="meter"><span style={{ "--w": "92%" }}></span></div></div><div className="site"><span>Procurement</span><div className="meter"><span style={{ "--w": "78%" }}></span></div></div><div className="site"><span>Construction</span><div className="meter"><span style={{ "--w": "46%" }}></span></div></div><div className="site"><span>Overall % complete</span><div className="meter"><span style={{ "--w": "63%" }}></span></div></div></div></div>
              </div>
            </div>
            <div className="roles__panel" role="tabpanel" id="panel-site" aria-labelledby="tab-site" tabIndex="0" hidden>
              <div className="roles__copy">
                <p className="roles__pain">“Evenings go into registers and WhatsApp updates.”</p>
                <h3>Log the day where the work happens.</h3>
                <ul className="ticks"><li>Daily progress reports with manpower and photos</li><li>Construction DPR quantities, issues and delays</li><li>Equipment logbook that books plant cost</li></ul>
              </div>
              <div className="roles__mock" aria-hidden="true">
                <div className="console__bar"><i></i><i></i><i></i><span>buildnexa / site</span></div>
                <div className="roles__mock-body"><div className="flow"><div className="flow__node is-done"><b>Daily progress report</b><span>18:05</span></div><div className="flow__link"></div><div className="flow__node is-done"><b>Equipment logbook · 6.5 h</b><span>Saved</span></div><div className="flow__link"></div><div className="flow__node is-now"><b>Delay logged · Material</b><span>Open</span></div></div></div>
              </div>
            </div>
            <div className="roles__panel" role="tabpanel" id="panel-accounts" aria-labelledby="tab-accounts" tabIndex="0" hidden>
              <div className="roles__copy">
                <p className="roles__pain">“RA bills and reconciliations swallow every month-end.”</p>
                <h3>Billing and books from the same records.</h3>
                <ul className="ticks"><li>RA bills on contract value × % complete</li><li>Retention and TDS defaults from the client master</li><li>Ledger &amp; Tally export for the auditor</li></ul>
              </div>
              <div className="roles__mock" aria-hidden="true">
                <div className="console__bar"><i></i><i></i><i></i><span>buildnexa / accounts</span></div>
                <div className="roles__mock-body"><div className="flow"><div className="flow__node is-done"><b>% complete · 63%</b><span>WBS</span></div><div className="flow__link"></div><div className="flow__node is-done"><b>RA bill #7 drafted</b><span>Auto</span></div><div className="flow__link"></div><div className="flow__node is-now"><b>Client payment</b><span>Pending</span></div><div className="flow__link flow__link--wait"></div><div className="flow__node "><b>Client ledger</b><span>Accounts</span></div></div></div>
              </div>
            </div>
            <div className="roles__panel" role="tabpanel" id="panel-proc" aria-labelledby="tab-proc" tabIndex="0" hidden>
              <div className="roles__copy">
                <p className="roles__pain">“We re-type the same quantities into four different sheets.”</p>
                <h3>Indent to payment in one chain.</h3>
                <ul className="ticks"><li>Indent → RFQ → PO → GRN with vendor quotes</li><li>Stock, issues and transfers across warehouses</li><li>Vendor ledger, advances and debit notes</li></ul>
              </div>
              <div className="roles__mock" aria-hidden="true">
                <div className="console__bar"><i></i><i></i><i></i><span>buildnexa / proc</span></div>
                <div className="roles__mock-body"><div className="cstate__row"><div className="kpi"><span>Open POs</span><b>38</b></div><div className="kpi"><span>Pending GRN</span><b>9</b></div><div className="kpi kpi--blue"><span>Low stock</span><b>3</b></div></div><div className="sites"><div className="site"><span>TMT steel · Site A</span><div className="meter"><span style={{ "--w": "74%" }}></span></div></div><div className="site"><span>TMT steel · Site C</span><div className="meter"><span style={{ "--w": "18%" }}></span></div></div><div className="site"><span>Cement · Central store</span><div className="meter"><span style={{ "--w": "55%" }}></span></div></div></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
