import { useEffect } from "react";
import Chrome from "./components/Chrome.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Modules from "./components/Modules.jsx";
import Solutions from "./components/Solutions.jsx";
import Roles from "./components/Roles.jsx";
import Compliance from "./components/Compliance.jsx";
import Why from "./components/Why.jsx";
import Process from "./components/Process.jsx";
import Compare from "./components/Compare.jsx";
import Projects from "./components/Projects.jsx";
import Faq from "./components/Faq.jsx";
import Cta from "./components/Cta.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Overlays from "./components/Overlays.jsx";
import initMain from "./effects/main.js";
import initKit from "./effects/kit.js";
import initDepth from "./effects/depth.js";
import initSmooth from "./effects/smooth.js";

// The interaction layer (reveals, parallax, video reel, form, menus…) works on the
// rendered DOM, so it starts once after the first render, in the original script order.
let started = false;

export default function App() {
  useEffect(() => {
    if (started) return;
    started = true;
    initMain();
    initKit();
    initDepth();
    initSmooth();
  }, []);

  return (
    <>
      <Chrome />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Modules />
        <Solutions />
        <Roles />
        <Compliance />
        <Why />
        <Process />
        <Compare />
        <Projects />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
      <Overlays />
    </>
  );
}
