import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import logo from './logo 1.png';

const Footer = () => {
  return (
    <footer id="footer" className="bg-green-800 text-white py-10">
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-8 text-sm">
    {/* Logo and Social Media */}
    <div className="text-center lg:text-left lg:px-5">
    <a href="/">
    <img
    src={logo}
    alt="SanyDressline Logo"
    className="w-32 h-auto mx-auto lg:mx-0"
    />
    </a>
    <p className="font-bold mt-4 mb-2">Sosial Media</p>
    <div className="flex justify-center lg:justify-start space-x-8">
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <FaTwitter className="text-white hover:text-gray-300" size={20} />
    </a>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FaFacebook className="text-white hover:text-gray-300" size={20} />
    </a>
    <a href="https://www.instagram.com/sanydressline?igsh=MXBnZTd2NHZ0bHhjMA==" target="_blank" rel="noopener noreferrer">
    <FaInstagram className="text-white hover:text-gray-300" size={20} />
    </a>
    </div>
    </div>

    {/* Shop Links */}
    <div className="text-center lg:text-left">
    <p className="font-bold mb-4">Navigasi</p>
    <ul className="space-y-2">
    <li><a href="#beranda" className="hover:underline">Beranda</a></li>
    <li><a href="#produk" className="hover:underline">Produk</a></li>
    <li><a href="#tentang-kami" className="hover:underline">Tentang Kami</a></li>
    <li><a href="#kontak" className="hover:underline">Kontak</a></li>
    </ul>
    </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-white mt-8 pt-4 text-center text-sm">
    <div className="flex justify-center space-x-4">
    <a href="/" className="hover:underline">Terms</a>
    <a href="/" className="hover:underline">Privacy</a>
    <a href="/" className="hover:underline">Cookies</a>
    </div>
    </div>


    </footer>
  );
};

export default Footer;
