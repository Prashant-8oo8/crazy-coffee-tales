import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from "../index";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Logo & Copyright */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center space-x-3 mb-6">
            <Logo width="120px" />
          </div>
          <p className="text-sm text-gray-400">
            &copy; {currentYear} DevUI. All rights reserved.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">Company</h3>
          <ul className="space-y-3">
            {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item, idx) => (
              <li key={idx}>
                <Link
                  to="/"
                  className="text-base text-white hover:text-blue-400 transition duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">Support</h3>
          <ul className="space-y-3">
            {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item, idx) => (
              <li key={idx}>
                <Link
                  to="/"
                  className="text-base text-white hover:text-blue-400 transition duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">Legals</h3>
          <ul className="space-y-3">
            {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item, idx) => (
              <li key={idx}>
                <Link
                  to="/"
                  className="text-base text-white hover:text-blue-400 transition duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Decorative line */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        Built with ❤️ using React & Tailwind CSS
      </div>
    </footer>
  );
}

export default Footer;
