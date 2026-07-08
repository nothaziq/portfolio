import { useCallback, useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { useKonamiCode } from "./hooks/useKonamiCode";

import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import AmbientBackground from "./components/AmbientBackground";
import CursorSpotlight from "./components/CursorSpotlight";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import DevConsoleEasterEgg from "./components/DevConsoleEasterEgg";
import KonamiToast from "./components/KonamiToast";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Journey from "./sections/Journey";
import Achievements from "./sections/Achievements";
import AIAssistant from "./sections/AIAssistant";
import Contact from "./sections/Contact";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);

  useLenis();

  const handleKonami = useCallback(() => {
    setKonamiActive(true);
    setTimeout(() => setKonamiActive(false), 3200);
  }, []);
  useKonamiCode(handleKonami);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <DevConsoleEasterEgg />

      <div
        className="cursor-none-fine"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        <AmbientBackground />
        <CursorSpotlight />
        <div className="noise-overlay" />
        <CustomCursor />
        <ScrollProgress />
        <Nav />

        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Journey />
          <Achievements />
          <AIAssistant />
          <Contact />
        </main>

        <Footer />
        <KonamiToast show={konamiActive} />
      </div>
    </>
  );
}
