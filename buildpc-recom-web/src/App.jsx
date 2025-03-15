import React from "react";
import { Element, scroller } from "react-scroll";
// import Hero from "./componets/Hero";
import Survey from "./componets/Survey";
import About from "./componets/about";
import Footer from "./componets/footer";
import Hero2 from "./componets/hero2";
// import Usersurvey from "./componets/usersurvey";
import "./App.css"; // Make sure to create and import your CSS file

/**
 * The main application component that renders different sections of the webpage.
 * It includes the Hero2, Survey, About, and Footer sections, each wrapped in a
 * scrollable container with snap functionality.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  return (
    <>
      <div className="flex flex-col snap-container">
        <Element name="hero2" className="snap-section">
          <Hero2 />
        </Element>
        <Element name="survey" className="snap-section">
          <Survey />
        </Element>
        <Element name="about" className="snap-section">
          <About />
        </Element>
        <Element name="footer" className="snap-section">
          <Footer />
        </Element>
      </div>
    </>
  );
}

export default App;
