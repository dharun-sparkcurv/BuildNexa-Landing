export default function Overlays() {
  return (
    <>
      {/* Project dialog */}
      <dialog className="modal" data-modal aria-labelledby="modal-title">
      <div className="modal__inner">
        <button className="modal__close" type="button" data-modal-close aria-label="Close project details"><span></span><span></span></button>
        <div className="modal__media pv" data-modal-media><div className="pv__inner"><div className="pv__grid"></div></div></div>
        <div className="modal__body">
          <span className="project__cat" data-modal-cat></span>
          <h3 id="modal-title" data-modal-title></h3>
          <p data-modal-desc></p>
          <dl className="modal__stats" data-modal-stats></dl>
          <ul className="chips" data-modal-tags></ul>
          <a href="#contact" className="btn btn--primary" data-modal-cta><span>Discuss a similar project</span><svg className="btn__icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
        </div>
      </div>
      </dialog>
      {/* Toasts */}
      <section aria-label="Notifications"><ol className="toaster" data-toaster></ol></section>
      
      {/* Command palette */}
      <dialog className="cmdk" data-cmdk aria-label="Command menu">
      <div className="cmdk__search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        <input className="cmdk__input" type="text" placeholder="Type a command or search…" role="combobox" aria-expanded="true" aria-controls="cmdk-list" aria-autocomplete="list" autoComplete="off" spellCheck="false"/>
      </div>
      <div className="cmdk__list" id="cmdk-list" role="listbox"></div>
      <div className="cmdk__foot"><span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> select</span><span><kbd>Esc</kbd> close</span></div>
      </dialog>
    </>
  );
}
