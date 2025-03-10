export default function prebuild() {
  // Sample PC Builds Data
  const pcBuilds = [
    {
      id: 1,
      name: "Budget Gaming PC",
      image: "/budget-pc.png",
      price: "$699",
      specs: ["Intel i5-12400F", "RTX 3050", "16GB RAM", "512GB SSD"],
    },
    {
      id: 2,
      name: "High-Performance PC",
      image: "/high-performance-pc.png",
      price: "$1299",
      specs: ["Ryzen 7 7800X", "RTX 4070", "32GB RAM", "1TB NVMe SSD"],
    },
    {
      id: 3,
      name: "Ultimate 4K Gaming",
      image: "/ultimate-pc.png",
      price: "$2499",
      specs: ["Intel i9-13900K", "RTX 4090", "64GB RAM", "2TB NVMe SSD"],
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">
          Recommended PC Builds
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Choose from expertly pre-configured PC builds for different needs.
        </p>

        {/* Grid Layout for PC Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pcBuilds.map((build) => (
            <div
              key={build.id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 transition transform"
            >
              <img
                src={build.image}
                alt={build.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-4">{build.name}</h3>
              <p className="text-gray-400 mt-2">{build.price}</p>
              <ul className="mt-3 text-gray-300 text-sm">
                {build.specs.map((spec, index) => (
                  <li key={index}>• {spec}</li>
                ))}
              </ul>
              <button className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
