import Navbar from "./Navbar";

function Hero2() {
  return (
    <section
      id="hero"
      className="relative w-screen h-screen flex flex-col items-center text-white text-center bg-cover bg-center"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/grandient.png')" }}
        ></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10 flex flex-row justify-between w-full m-auto">
        {/* Left-Aligned Text Content */}
        <div className="max-w-xl place-content-center text-left p-10 rounded-lg">
          <h1 id="heroh1" className="text-8xl font-medium text-white">
            Build Your PC Now
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Get expert recommendations and configure the best PC for your needs.
          </p>
          <button
            className="mt-6 px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xl rounded-lg shadow-lg transition"
            onClick={() =>
              document
                .getElementById("uqa-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Build Now
          </button>
        </div>

        {/* Right-Aligned Image */}
        <div className="flex justify-center items-cente mr-30 mt-30 rounded-lg">
          <img
            src="/pctower.png"
            alt="PC Tower"
            className="h-140 w-140 object-contain brightness-110"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero2;
