'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/maia-logo-white-bg.jpg"
                alt="MAIA Logo"
                width={40}
                height={40}
                className="object-contain group-hover:scale-110 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary-700 font-display">MAIA 2025</span>
                <span className="text-xs text-neutral-500 hidden sm:block">Workshops</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/register" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Register
            </Link>
            <Link href="/about" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              About
            </Link>
            <Link href="/conference" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Conference
            </Link>
            <Link href="/faq" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="bg-neutral-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-800 transition-colors ml-2">
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-700 hover:text-primary-600 focus:outline-none p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white border-t border-neutral-200 shadow-lg">
            <Link
              href="/"
              className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 block px-4 py-3 rounded-lg text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/register"
              className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 block px-4 py-3 rounded-lg text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
            <Link
              href="/about"
              className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 block px-4 py-3 rounded-lg text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/conference"
              className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 block px-4 py-3 rounded-lg text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Conference
            </Link>
            <Link
              href="/faq"
              className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 block px-4 py-3 rounded-lg text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-neutral-700 hover:text-primary-600 hover:bg-primary-50 block px-4 py-3 rounded-lg text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="bg-neutral-900 text-white block px-4 py-3 rounded-lg text-base font-semibold hover:bg-neutral-800 transition-colors mt-2"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

