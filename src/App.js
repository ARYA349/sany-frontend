import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App = () => {
  const [products, setProducts] = useState([]);
  const [homes, setHomes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    AOS.init({
      anchorPlacement: 'top-top', // Memastikan animasi tidak menyebabkan scroll
    });
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/products?populate=*');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchHomes = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/homes?populate=*');
        setHomes(response.data.data);
      } catch (error) {
        console.error('Error fetching homes:', error);
      }
    };

    fetchProducts();
    fetchHomes();
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
    <Navbar />
    <HomeSection homes={homes} />
    <section id="produk" className="container mx-auto p-4 pt-10">
    <h2 className="text-4xl font-bold text-center text-green-800 mb-10" data-aos="fade-up">Produk Kami</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {currentProducts.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
    </div>
    <div className="flex justify-center mt-4" data-aos="fade-up">
 <button
    onClick={() => {
      // Fungsi untuk mengganti halaman
      setCurrentPage((prev) => Math.max(prev - 1, 1));
      const section = document.getElementById("produk");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      console.log("Navigasi halaman sebelumnya dilakukan.");
    }}
    disabled={currentPage === 1}
    className="mx-2 px-4 py-2 bg-green-800 text-white rounded"
    data-aos="fade-left"
  >
    Sebelumnya
    </button>
    <span className="mx-2 py-2">{currentPage} / {totalPages}</span>
    <button
    onClick={() => {
      // Fungsi untuk menambah halaman
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));

      // Fungsi untuk scroll ke section tertentu
      const section = document.getElementById("produk");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }

      // Log aktivitas
      console.log("Navigasi ke halaman berikutnya dilakukan.");
    }}
    disabled={currentPage === totalPages}
    className="mx-2 px-4 py-2 bg-green-800 text-white rounded"
    data-aos="fade-right"
    >
    Lanjut
    </button>

    </div>
    </section>
    <AboutSection />
    <ContactForm />
    <Footer />
    </>
  );
};

export default App;
