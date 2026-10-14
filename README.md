# BuildNexa — Marketing Website

Single-page marketing site for the BuildNexa construction ERP, built with Vite + React (JavaScript). There's no backend and no database, and it doesn't link to the ERP app (app.buildnexa.io).

```
index.html            <head> (SEO meta, JSON-LD for Organization + FAQPage, fonts) + #root
src/main.jsx          entry: imports the stylesheets and renders <App />
src/App.jsx           page layout; starts the interaction layer once after first render
src/components/       one component per section: Header, Hero, About, Modules, Solutions,
                      Roles, Compliance, Why, Process, Compare, Projects, Faq, Cta, Contact,
                      Footer, plus Chrome (skip link, loader, SVG sprite) and Overlays
                      (project dialog, toasts, command menu)
src/effects/          interaction layer that works on the rendered DOM:
                      main.js   reveals, header, scroll effects, hero video reel, project dialog, contact form
                      kit.js    toasts, command menu (Ctrl/⌘ K), accordion, tabs, compare toggle, calculator
                      depth.js  hero parallax, section numerals, scale-in panels, console tilt-up
                      smooth.js eased nav-link jumps and sliding nav pill (wheel/touch scrolling stays native)
src/styles/           styles.css (base), glass.css, kit.css, depth.css, theme.css (design system, loaded last)
public/assets/        brand icons, photos (img/), hero clips (video/)
public/robots.txt, public/sitemap.xml
```

## Develop
```
yarn install
yarn dev           # http://localhost:5173
yarn build         # static output in dist/
yarn preview       # serves dist/ at http://localhost:4173
```

## Deploy
Any static host works (Netlify, Vercel, Cloudflare Pages, S3 or nginx). The build command is `yarn build` and the output folder is `dist`.

## Design system (`src/styles/theme.css`)
The site uses only the four logo colours.

| Token | Value | Use |
|---|---|---|
| `--c-charcoal` | `#2F3540` | Page background, text on light sections |
| `--c-crimson` | `#9A0129` | Buttons, badges, nav pill, contact panel; accent text on light sections only |
| `--c-mist` | `#D4E2E9` | Accent text and focus rings on dark; Why/Projects/FAQ background |
| `--c-snow` | `#FEFEFE` | Primary text on dark, About and Roles background, cards on light sections |
| `--glass-card-bg` / `--glass-panel-bg` | `rgba(254,254,254,.08 / .12)` | Glass surfaces |
| `--glass-red-bg` | `rgba(154,1,41,.78)` | Contact panel, accent card |

Crimson on charcoal is 1.4:1, so on dark surfaces crimson is used only as a fill (white text on crimson is 8.7:1). Legacy names (`--c-red`, `--c-navy`, `--blue`…) are aliases of these four. Black shadow alphas and `#000` mask stops remain for depth and masking.

**Type:** Bricolage Grotesque for headings, buttons, nav and labels (bold 700 for display, medium 500 for UI), and Inter for body copy. The hero title and closing call-to-action are 60px, section headings 52px.

Radius is 18px for cards and pill-shaped for buttons. Blur is 16px, applied only to the navbar, hero panel, quick-access strip, service cards, form, dialogs and toasts. Without `backdrop-filter`, these surfaces fall back to near-opaque charcoal.

## Content sources
- **Product facts** come from the BuildNexa repo: `memory/docs/platform_module_guide.md`, `memory/docs/user_manual.md`, the app's sidebar (`navConfig.js`), routes (`App.js`) and roles (`backend/app/models/enums.py`).
- **Not claimed:** features that aren't built yet (Joint Measurement, Certify RA Bills, Site Measurements), and integrations not in the product (MS Project, AutoCAD, e-invoicing, bank reconciliation, offline mode, native mobile app).
- **Brand icon** is `/brand/buildnexa-icon.png` from buildnexa.io, resized.

## Before launch
- **Contact:** `hello@buildnexa.io` is the only contact detail shown, and the form's mail fallback goes there. Add a phone number, address or social profiles only if they're real.
- **Projects section:** describes who BuildNexa is for. It contains no client names or results. Add real, client-approved case studies to `src/components/Projects.jsx` and the `projects` array in `src/effects/main.js` when you have them.
- **Commitments:** check the wording in "Why choose us" and the FAQ answers.
- **Social image:** `/assets/og-image.png` (1200×630) is referenced in the meta tags but doesn't exist yet.
- **Legal pages:** there are no Privacy or Terms pages, so the footer doesn't link to any. Add them before collecting leads at scale.

## Contact form
- **Sending:** the form POSTs JSON to `/api/contact` (`data-endpoint` in `src/components/Contact.jsx`). The API in `server/contact.js` validates the fields, then emails them to `hello@buildnexa.io` over SMTP, with the visitor's address as Reply-To.
- **Setup:** copy `.env.example` to `.env` and fill in the `SMTP_*` values. `SMTP_FROM` must be an address your SMTP account may send from.
- **Run locally:** `yarn dev` (site on :5173) and `yarn server` (API on :8787) in two terminals. Vite proxies `/api` to the API.
- **Production:** serve the API on the same origin as the site under `/api/contact` (for example a reverse proxy to `localhost:8787`). `SMTP_*` stay on the server, never in the built site.
- **Checks:** the API rejects invalid fields (400), rate-limits each IP to 5 messages per 10 minutes (429), and caps request size at 16 KB. The rate limit is in memory, so it resets on restart.
- **States:** the form validates fields inline, shows a spinner while sending, and shows success or error states. A failed send shows an error and never a false "sent" message.
- **If the API is down:** the form shows an error and asks the visitor to email `hello@buildnexa.io`.
- **Spam:** a honeypot field silently drops bot submissions.

## Office map
The contact panel embeds a keyless, lazy-loaded Google Maps view of Sparkcurv Technologies Pvt Ltd (8.1832953, 77.4261254), with an "Open in Google Maps" link. To change the location, edit the iframe `src` in `src/components/Contact.jsx`.

## Hero video
Six clips play in order (`public/assets/video/`, 540p–720p, about 24 MB total), about 6 seconds each (`data-clip-seconds` on the `<video>` in `src/components/Hero.jsx`). Two stacked `<video>` layers crossfade, with the next clip preloaded underneath, so there's never a gap between clips. Visitors who use reduce-motion or data-saver see only the poster (`/assets/img/hero-video-poster.webp`, a frame of clip 1), and a pause button is shown while the video plays. All clips are from Pexels under the [Pexels License](https://www.pexels.com/license/): free for commercial use, attribution not required.

| File | Creator | Source |
|---|---|---|
| hero-1-city.mp4 | K (@kelly) | pexels.com/video/10391644 |
| hero-2-engineers.mp4 | Mikael Blomkvist | pexels.com/video/8964796 |
| hero-3-tower.mp4 | utopia 36 | pexels.com/video/14055246 |
| hero-4-site.mp4 | Sururi Ballıdağ | pexels.com/video/18563093 |
| hero-5-sitelead.mp4 | Mikael Blomkvist | pexels.com/video/8964729 |
| hero-6-solar.mp4 | Braeson Holland | pexels.com/video/8851160 |

## Photography
All photos are from Unsplash under the [Unsplash License](https://unsplash.com/license): free for commercial use, attribution appreciated but not required. They're served locally as WebP.

| File | Photographer | Source |
|---|---|---|
| about-frame.webp | Jacek Dylag | unsplash.com/photos/nhCPOp4A2Xo |
| svc-cranes.webp | Artem Labunsky | unsplash.com/photos/c9p30E94OUU |
| svc-laptop.webp | ThisisEngineering | unsplash.com/photos/3Z3gnA99PL8 |
| svc-team.webp | Adhitya Sibikumar | unsplash.com/photos/9j0HxsTPBlk |
| svc-blueprints.webp | Vooglam Eyewear | unsplash.com/photos/0dhIl78b__o |
| svc-city-cranes.webp | Raymond Yeung | unsplash.com/photos/hbe2OSnR4vU |
| svc-field.webp | Mufid Majnun | unsplash.com/photos/6203Ynp5ZqE |
| work-highrise.webp | Tomas | unsplash.com/photos/Mcn1Ky7jzZU |
| work-steel.webp | Zoshua Colah | unsplash.com/photos/oLSGrgTrfSs |
| work-framing.webp | Josh Olalde | unsplash.com/photos/X1P1_EDNnok |
| work-solar.webp | Chirayu Trivedi | unsplash.com/photos/twOIx6I35tk |

## Accessibility & performance
- **Keyboard:** skip link, visible focus rings, a mobile menu that closes with Esc and returns focus, tabs that support arrow keys and Home/End, a native `<details>` accordion, and a native `<dialog>` for project details.
- **Images:** every image has alt text, below-the-fold images lazy-load, and explicit `width`/`height` attributes prevent layout shift.
- **Reduced motion:** `prefers-reduced-motion` turns off the loader, parallax, eased nav-link jumps, entrance animations and the hero video.
- **Responsive:** tested with no horizontal overflow at 320, 390, 768 and 1440px.
- **Known:** axe-core flags the semi-transparent header's nav links when the header floats over light sections, and the selected role tab (a false alarm: its white label sits on the crimson pill, not the tab bar).
