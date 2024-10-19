import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const footerQuickLinks = [
  { display: "Home", url: "#" },
  { display: "About Us", url: "#" },
  { display: "Courses", url: "#" },
  { display: "Blog", url: "#" },
];

const footerInfoLinks = [
  { display: "Privacy Policy", url: "#" },
  { display: "Membership", url: "#" },
  { display: "Purchases Guide", url: "#" },
  { display: "Terms of Service", url: "#" },
];

const FooterLanding: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="mb-4">
            <h2 className="flex items-center gap-1 text-xl font-bold text-white">
              <i className="ri-pantone-line"></i> CFC.
            </h2>
            <div className="follows mt-4">
              <p className="mb-2 text-gray-400">Follow us on social media</p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" aria-label="Facebook">
                  <FaFacebook className="text-xl text-white hover:text-purple-400" />
                </a>
                <a href="https://instagram.com" aria-label="Instagram">
                  <FaInstagram className="text-xl text-white hover:text-purple-400" />
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn">
                  <FaLinkedin className="text-xl text-white hover:text-purple-400" />
                </a>
                <a href="https://twitter.com" aria-label="Twitter">
                  <FaTwitter className="text-xl text-white hover:text-purple-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-4">
            <h6 className="font-bold text-lg text-white">Explore</h6>
            <ul className="link__list mt-2">
              {footerQuickLinks.map((item, index) => (
                <li key={index} className="py-1">
                  <a href={item.url} className="text-gray-400 hover:text-purple-400">{item.display}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div className="mb-4">
            <h6 className="font-bold text-lg text-white">Information</h6>
            <ul className="link__list mt-2">
              {footerInfoLinks.map((item, index) => (
                <li key={index} className="py-1">
                  <a href={item.url} className="text-gray-400 hover:text-purple-400">{item.display}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="mb-4">
            <h6 className="font-bold text-lg text-white">Subscribe to Our Newsletter</h6>
            <div className="flex mt-4">
              <input
                type="text"
                placeholder="Email"
                className="border border-purple-300 rounded-l-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button className="bg-purple-600 text-white rounded-r-md px-6 py-2 hover:bg-purple-700 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLanding;
