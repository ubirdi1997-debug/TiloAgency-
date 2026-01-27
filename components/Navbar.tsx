'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass fixed w-full z-50 top-0 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-sky-blue-600 hover:text-sky-blue-700 transition">
              Tilo Agency
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-sky-blue-600 transition font-medium">
              Home
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-sky-blue-600 transition font-medium">
              Services
            </Link>
            <Link href="/rules" className="text-gray-700 hover:text-sky-blue-600 transition font-medium">
              Terms
            </Link>
            <Link href="/contact" className="bg-sky-blue-600 text-white px-6 py-2 rounded-full hover:bg-sky-blue-700 transition shadow-lg">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-sky-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-sky-blue-600 hover:bg-sky-blue-50 rounded transition">
              Home
            </Link>
            <Link href="/services" className="block px-3 py-2 text-gray-700 hover:text-sky-blue-600 hover:bg-sky-blue-50 rounded transition">
              Services
            </Link>
            <Link href="/rules" className="block px-3 py-2 text-gray-700 hover:text-sky-blue-600 hover:bg-sky-blue-50 rounded transition">
              Terms
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-white bg-sky-blue-600 hover:bg-sky-blue-700 rounded transition text-center">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
