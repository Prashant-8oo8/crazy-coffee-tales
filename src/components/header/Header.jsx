import React, { useState } from 'react';
import { Container, LogoutBtn, Logo } from "../index";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status); // null | true | false
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', show: true },
    { name: 'Login', slug: '/login', show: authStatus === false },
    { name: 'Signup', slug: '/signup', show: authStatus === false },
    { name: 'All Posts', slug: '/all-posts', show: authStatus === true },
    { name: 'Add Post', slug: '/add-post', show: authStatus === true },
  ];

  const activeNavItems = navItems.filter(item => item.show);

  // Optional: Show loading spinner if authStatus is null
  if (authStatus === null) {
    return (
      <header className="bg-gray-900 py-4 text-center text-white shadow-md sticky top-0 z-50">
        <Container>
          <p>Loading...</p>
        </Container>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo className="w-12 h-auto" />
            <span className="font-bold text-xl hidden sm:inline">Crazy Coffee Tales</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {activeNavItems.map(({ name, slug }) => (
              <li key={name}>
                <Link
                  to={slug}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200
                    ${location.pathname === slug ? 'bg-blue-600 text-white' : 'hover:text-blue-400 hover:bg-gray-800'}`}
                >
                  {name}
                </Link>
              </li>
            ))}

            {/* Show logout only when logged in and authStatus is confirmed */}
            {authStatus === true && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden bg-gray-800 rounded-b-lg p-4 mt-2">
            <ul className="flex flex-col gap-4">
              {activeNavItems.map(({ name, slug }) => (
                <li key={name}>
                  <Link
                    to={slug}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-2 rounded-md text-base font-medium
                      ${location.pathname === slug ? 'bg-blue-600 text-white' : 'hover:text-blue-400 hover:bg-gray-700'}`}
                  >
                    {name}
                  </Link>
                </li>
              ))}

              {authStatus === true && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}

export default Header;
