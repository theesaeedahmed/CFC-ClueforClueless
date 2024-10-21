import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 text-center p-4 border-t border-white">
      <div className="space-x-2">
        <a
          href="#faq"
          className="hover:text-purple-500 transition-colors duration-300"
        >
          FAQ
        </a>
        <span>|</span>
        <a
          href="#terms"
          className="hover:text-purple-500 transition-colors duration-300"
        >
          Terms
        </a>
        <span>|</span>
        <a
          href="#privacy"
          className="hover:text-purple-500 transition-colors duration-300"
        >
          Privacy
        </a>
      </div>
      <p className="mt-2">© 2024 CFC. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
