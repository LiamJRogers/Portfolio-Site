import { useState } from "react";
import CursorTrail from "./components/CursorTrail";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Technologies from "./sections/About/Technologies";
import Projects from "./sections/Projects/Projects";
import Footer from "./sections/Footer/Footer";

function App() {
  const [cursorActive, setCursorActive] = useState(false);
  const [cardHover, setCardHover] = useState(false);
  const [invert, setInvert] = useState(false);

  return (
    <main>
      <CursorTrail
        active={cursorActive}
        cardHover={cardHover}
        invert={invert}
      />
      <Hero />
      <About setCursorActive={setCursorActive} setInvert={setInvert} />
      <Technologies setCursorActive={setCursorActive} setInvert={setInvert} />
      <Projects setCursorActive={setCursorActive} setCardHover={setCardHover} />
      <Footer setCursorActive={setCursorActive} setInvert={setInvert} />
    </main>
  );
}

export default App;
