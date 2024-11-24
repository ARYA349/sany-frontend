import React, { useState, useEffect, useRef } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline'; // Import ikon hamburger
import logo from './logo.svg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Menangani efek scroll untuk navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Menutup menu ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fungsi untuk scroll ke bagian tertentu
  const handleScrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
    className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/70 backdrop-blur-lg lg:shadow-lg' : 'bg-transparent'
    }`}
    >
    <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-4">
    {/* Logo */}
    <a href="/" className="flex-shrink-0">
    <img src={logo} alt="SanyDressline Logo"     className="w-32 h-auto lg:mx-0"
    />
    </a>

    {/* Menu untuk Desktop */}
    <div className="hidden lg:flex items-center space-x-8">
    {['Beranda', 'Produk', 'Tentang Kami', 'Kontak'].map((item, index) => (
      <button
      key={index}
      onClick={() => handleScrollToSection(item.toLowerCase().replace(/\s/g, ''))}
      className="relative text-gray-700 hover:text-green-700 transition-all duration-300 after:content-[''] after:block after:h-[2px] after:bg-green-700 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
      >
      {item}
      </button>
    ))}
    </div>

    {/* Hamburger Icon untuk Mobile */}
    {!isMenuOpen && (
      <div className={`lg:hidden relative z-50`}>
      <button
      onClick={() => setIsMenuOpen((prev) => !prev)}
      className="text-gray-700 focus:outline-none"
      >
      <Bars3Icon className="w-8 h-8" />
      </button>
      </div>
    )}

    {/* Menu untuk Mobile */}
    <div
    ref={menuRef}
    className={`lg:hidden fixed left-0 w-full bg-white shadow-b-lg shadow-t-0 p-6 transition-all duration-500 ${
      isMenuOpen ? 'top-0 opacity-100 z-40 pointer-events-auto' : '-top-full opacity-0 pointer-events-none'
    } ${isScrolled ? 'backdrop-blur-lg bg-white/70' : 'background-transparent'}`}
    >
    <div className="flex flex-col items-center space-y-6" >
    {/* Logo di tengah mobile menu */}
    <div className="w-full flex justify-center">
    <img src={logo} alt="SanyDressline Logo" className="h-16" />
    </div>

    <button
    onClick={() => setIsMenuOpen(false)}
    className="self-end text-gray-700 focus:outline-none"
    >
    ✖
    </button>
    {['Beranda', 'Produk', 'Tentang Kami', 'Kontak'].map((item, index) => (
      <button
      key={index}
      onClick={() => handleScrollToSection(item.toLowerCase().replace(/\s/g, ''))}
      className="text-gray-700 hover:text-green-700 transition-all duration-300 w-full text-center"
      >
      {item}
      </button>
    ))}
    </div>
    </div>
    </div>
    </nav>
  );
};

export default Navbar;
