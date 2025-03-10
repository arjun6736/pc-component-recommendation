import Navbar from "./Navbar";
function Hero() {
  return (
    <section className="relative w-screen h-screen flex items-center  text-white text-center bg-cover bg-center">
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center brightness-75"
          style={{ backgroundImage: "url('/herobg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <Navbar />
      {/* Left-Aligned Text Content */}
      <div className="relative z-10 text-left max-w-2xl m-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Build Your Dream PC
        </h1>
        <p className="mt-4 text-lg text-gray-">
          Get expert recommendations and configure the best PC for your needs.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg transition"
          onClick={() =>
            document
              .getElementById("uqa-section")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Start Building
        </button>
      </div>
    </section>
  );
}

export default Hero;
