export default function Header() {
  return (
    <>
      {/* Header */}
      <header className="header" data-header>
      <div className="header__inner">
        <a href="#top" className="brand" aria-label="BuildNexa — home">
          <img className="brand__logo" src="/assets/buildnexa-icon-96.png" width="36" height="36" alt=""/>
          <span className="brand__name">Build<b>Nexa</b></span>
        </a>
        <nav className="nav" aria-label="Primary">
          <ul className="nav__list">
            <li><a href="#top" className="nav__link">Home</a></li>
            <li><a href="#about" className="nav__link">About</a></li>
            <li><a href="#services" className="nav__link">Services</a></li>
            <li><a href="#solutions" className="nav__link">Solutions</a></li>
            <li><a href="#work" className="nav__link">Projects</a></li>
            <li><a href="#faq" className="nav__link">FAQs</a></li>
            <li><a href="#contact" className="nav__link">Contact</a></li>
          </ul>
        </nav>
        <button className="cmdk-trigger" type="button" data-cmdk-open aria-label="Open command menu">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <kbd><span data-kbd-mod>Ctrl</span> K</kbd>
        </button>
        <a href="#contact" className="btn btn--sm btn--primary header__cta">
          <span>Request a demo</span><svg className="btn__icon" aria-hidden="true"><use href="#i-arrow"/></svg>
        </a>
        <button className="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu" data-menu-toggle>
          <span></span><span></span>
        </button>
      </div>
      </header>
      
      <div className="mobile-menu" id="mobile-menu" hidden data-mobile-menu>
      <nav aria-label="Mobile">
        <ol className="mobile-menu__list">
          <li><a href="#top">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#solutions">Solutions</a></li>
          <li><a href="#roles">Roles</a></li>
          <li><a href="#work">Projects</a></li>
          <li><a href="#faq">FAQs</a></li>
          <li><a href="#contact">Contact</a></li>
        </ol>
      </nav>
      <div className="mobile-menu__foot">
        <a href="#contact" className="btn btn--primary"><span>Request a demo</span><svg className="btn__icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </div>
      </div>
    </>
  );
}
