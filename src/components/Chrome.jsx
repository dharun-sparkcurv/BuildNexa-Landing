export default function Chrome() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      
      {/* Preloader */}
      <div className="loader" aria-hidden="true">
      <div className="loader__inner">
        <img className="loader__mark" src="/assets/buildnexa-icon-96.png" width="56" height="56" alt=""/>
        <div className="loader__count"><span data-loader-count>00</span>%</div>
      </div>
      <div className="loader__bar"><span></span></div>
      </div>
      
      <div className="ambient" aria-hidden="true">
      <div className="ambient__orb ambient__orb--1"></div>
      <div className="ambient__orb ambient__orb--2"></div>
      <div className="ambient__orb ambient__orb--3"></div>
      <div className="ambient__orb ambient__orb--4"></div>
      <div className="ambient__grid"></div>
      <div className="ambient__noise"></div>
      </div>
      
      <div className="scroll-progress" aria-hidden="true"><span></span></div>
      <div className="cursor-dot" aria-hidden="true"><span>View</span></div>
      
      {/* SVG sprite */}
      <svg width="0" height="0" className="sr-only" aria-hidden="true">
      <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></symbol>
      <symbol id="i-arrow-ur" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></symbol>
      </svg>
    </>
  );
}
