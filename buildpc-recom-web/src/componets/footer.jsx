const Footer = () => {
  return (
    <footer
      id="footer"
      className="w-screen h-100 flex justify-center bg-gray-900 text-white py-6"
    >
      <div className="min-w-6xl flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-start px-10 gap-8 mx-1.5">
          {/* Logo Section */}
          <div>
            <a href="#" className="text-white">
              <h1 className="text-4xl font-bold">PcBuild</h1>
            </a>
          </div>

          {/* Choose Now Section */}
          <div>
            <h4 className="font-semibold text-xl mb-3">Choose Now</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Custom PC
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Prebuilt Gaming PC
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Services */}
          {/* <div>
          <h4 className="font-semibold text-lg mb-3">Customer Services</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Statement
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our Portfolio
              </a>
            </li>
          </ul>
        </div> */}

          {/* My Account */}
          <div>
            <h4 className="font-semibold text-xl mb-3">Develepors</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Arjun E
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sayooj V
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Arun C T
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Saran Dath N
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div>
            <h4 className="font-semibold text-xl mb-2">Contact Us</h4>
            <p>
              <a href="mailto:sample@gmail.com" className="hover:underline">
                mgp202526@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+919349404046" className="hover:underline">
                +91 9349404046
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>© 2025 Group 2. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
