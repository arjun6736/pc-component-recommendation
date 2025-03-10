import Hero from "./componets/Hero";
import Survey from "./componets/Survey";
import About from "./componets/about";
import Footer from "./componets/footer";
import Hero2 from "./componets/hero2";
import Usersurvey from "./componets/usersurvey";
function App() {
  return (
    <>
      <div className="flex flex-col">
        {/* Hero */}
        {/* <Hero /> */}
        <Hero2 />
        {/* Survey */}
        {/* <Usersurvey /> */}
        <Survey />
        {/* About */}
        <About />
        <Footer />
      </div>
    </>
  );
}

export default App;
