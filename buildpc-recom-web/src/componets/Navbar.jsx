import { useState, useEffect } from "react";

/**
 * Navbar component that displays a fixed navigation bar at the top of the page.
 * The navbar changes its style when the user scrolls down the page.
 *
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
  // State to track if the user has scrolled down the page
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Set isScrolled to true if the user has scrolled more than 50 pixels
      setIsScrolled(window.scrollY > 50);
    };

    // Add scroll event listener to the window
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900 bg-opacity-80 py-4 shadow-lg" // Navbar style when scrolled
          : "bg-transparent py-4" // Navbar style when not scrolled
      }`}
    >
      <div className="flex items-center justify-between mx-10">
        {/* Project Title */}
        <div className="text-3xl font-bold text-orange-500">MINIPROJECT</div>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          <li>
            <a
              onClick={() =>
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-gray-200 font-[600] text-xl hover:text-orange-400 cursor-pointer"
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() =>
                document
                  .getElementById("uqa-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-red-600 font-[700] text-xl hover:text-white cursor-pointer"
            >
              Build Now
            </a>
          </li>
          <li>
            <a
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-gray-200 font-[600] text-xl hover:text-orange-400 cursor-pointer"
            >
              About
            </a>
          </li>
          <li>
            <a
              onClick={() =>
                document
                  .getElementById("footer")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-gray-200 font-[600] text-xl hover:text-orange-400 cursor-pointer"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
