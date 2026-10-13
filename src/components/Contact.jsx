export default function Contact() {
  return (
    <>
      {/* ============ CONTACT ============ */}
      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="container contact__grid">
          <div className="contact__info">
            <span className="section-index">10</span>
            <p className="eyebrow" data-reveal>Contact</p>
            <h2 id="contact-title" className="section-title" data-split>Let's talk about <em>your project.</em></h2>
            <p className="section-lead" data-reveal>Tell us about your sites, teams and current tools, and we'll show you how BuildNexa would fit.</p>
      
            <ol className="contact__steps" data-reveal>
              <li><b>Share a few details</b><span>Your projects, modules of interest and how you work today.</span></li>
              <li><b>We get in touch</b><span>By your preferred method, to understand your requirements.</span></li>
              <li><b>See it on your data</b><span>A walkthrough built around your workflows.</span></li>
            </ol>
      
            <dl className="contact__details" data-reveal>
              <div><dt>Email</dt><dd><a href="mailto:hello@buildnexa.io">hello@buildnexa.io</a></dd></div>
              <div><dt>Website</dt><dd><a href="https://buildnexa.io/" rel="noopener">buildnexa.io</a></dd></div>
            </dl>

            {/* Office location — keyless Google Maps embed, loads only when scrolled near */}
            <figure className="contact__map" data-reveal>
              <iframe
                title="Map showing the BuildNexa office (Sparkcurv Technologies Pvt Ltd)"
                src="https://www.google.com/maps?q=8.1832953,77.4261254&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <figcaption>
                <span>Our office</span>
                <a href="https://maps.app.goo.gl/gSEC34xQbvDZrxde6" target="_blank" rel="noopener">Open in Google Maps ↗</a>
              </figcaption>
            </figure>
          </div>
      
          {/* Integration point: set data-endpoint to a backend that accepts JSON POSTs (e.g. Formspree or your API).
               Without it, the form opens the visitor's email app addressed to data-mailto — it never reports a send that didn't happen. */}
          <form className="form" data-contact-form data-endpoint="" data-mailto="hello@buildnexa.io" noValidate data-reveal>
            <div className="form__row">
              <div className="field">
                <input id="f-name" name="name" type="text" autoComplete="name" placeholder=" " required/>
                <label htmlFor="f-name">Full name</label>
                <span className="field__err" id="f-name-err" aria-live="polite"></span>
              </div>
              <div className="field">
                <input id="f-email" name="email" type="email" autoComplete="email" placeholder=" " required/>
                <label htmlFor="f-email">Work email</label>
                <span className="field__err" id="f-email-err" aria-live="polite"></span>
              </div>
            </div>
            <div className="form__row">
              <div className="field">
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder=" "/>
                <label htmlFor="f-phone">Phone (optional)</label>
                <span className="field__err" id="f-phone-err" aria-live="polite"></span>
              </div>
              <div className="field">
                <input id="f-company" name="company" type="text" autoComplete="organization" placeholder=" "/>
                <label htmlFor="f-company">Company</label>
              </div>
            </div>
            <div className="field field--select">
              <select id="f-service" name="service" required defaultValue="">
                <option value="" disabled hidden></option>
                <option>Projects &amp; DPR</option>
                <option>Procurement</option>
                <option>Inventory &amp; Stores</option>
                <option>Finance &amp; Accounting</option>
                <option>Clients &amp; Billing</option>
                <option>Assets, Plant &amp; Production</option>
                <option>Full platform</option>
                <option>Not sure yet</option>
              </select>
              <label htmlFor="f-service">I'm interested in</label>
              <span className="field__err" id="f-service-err" aria-live="polite"></span>
            </div>
      
            <fieldset className="chips-field">
              <legend>Preferred contact method</legend>
              <div className="chips-field__opts">
                <label><input type="radio" name="contact_pref" value="Email" defaultChecked/><span>Email</span></label>
                <label><input type="radio" name="contact_pref" value="Phone"/><span>Phone</span></label>
                <label><input type="radio" name="contact_pref" value="WhatsApp"/><span>WhatsApp</span></label>
              </div>
            </fieldset>
      
            <div className="field field--area">
              <textarea id="f-msg" name="message" rows="4" placeholder=" " required minLength="10"></textarea>
              <label htmlFor="f-msg">Project details</label>
              <span className="field__err" id="f-msg-err" aria-live="polite"></span>
            </div>
      
            {/* honeypot */}
            <div className="hp" aria-hidden="true"><label>Leave empty<input type="text" name="website" tabIndex="-1" autoComplete="off"/></label></div>
      
            <label className="check">
              <input type="checkbox" name="consent" id="f-consent" required/>
              <span>I agree to be contacted about my enquiry.</span>
            </label>
            <span className="field__err" id="f-consent-err" aria-live="polite"></span>
      
            <div className="form__foot">
              <button type="submit" className="btn btn--primary">
                <span data-submit-label>Send message</span><svg className="btn__icon" aria-hidden="true"><use href="#i-arrow"/></svg>
              </button>
              <p className="form__status" role="status" aria-live="polite" data-form-status></p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
