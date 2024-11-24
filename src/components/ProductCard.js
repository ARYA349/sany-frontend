import React, { useState } from "react";
import AOS from 'aos'; // Pastikan Anda mengimpor AOS

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  if (!product) {
    return <div>Loading...</div>;
  }

  const whatsappLink = `https://wa.me/6289524396489?text=${encodeURIComponent(
    `Halo, saya tertarik dengan produk ${product.name} (ID: ${product.id}) dengan harga Rp ${product.price}`
  )}`;

  const baseUrl = "https://smiling-strength-5b60708ab1.strapiapp.com";
  const imageUrl = product.image?.url ? `${baseUrl}${product.image.url}` : null;

  return (
    <div className="flex justify-center items-center bg-gray-100">
    {/* Card Produk */}
    <div
    className="w-full max-w-xs bg-white rounded-lg overflow-hidden shadow-md mx-auto"
    data-aos="fade-up" // Tambahkan animasi fade-up di sini
    >
    <div
    className="cursor-pointer rounded-lg overflow-hidden group"
    onClick={() => setShowModal(true)}
    >
    <div className="w-full h-48 relative overflow-hidden">
    {imageUrl ? (
      <>
      <img
      className="w-full h-full object-cover object-top rounded-t-lg transition-transform duration-300 group-hover:scale-90"
      src={imageUrl}
      alt={product.name}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      Klik untuk detail produk
      </div>
      </>
    ) : (
      <div className="w-full h-full bg-gray-400 flex items-center justify-center">
      Gambar Tidak Tersedia
      </div>
    )}
    </div>
    <div className="p-4">
    <div className="font-bold text-lg text-green-800 text-center truncate">
    {product.name}
    </div>
    <p id="Harga" className="text-sm font-medium text-center mt-2">
    Rp {new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(product.price)}
    </p>
    </div>
    </div>

    {/* Tombol WhatsApp */}
    <div className="p-4 text-center">
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
    <button className="bg-white text-green-800 border-green-600 border-2 text-xs py-1 px-2
    rounded-md hover:bg-green-800 hover:text-white hover:border-white transition
    lg:rounded-xl lg:py-3 lg:px-4 lg:text-[15px]">
    Pesan Sekarang
    </button>
    </a>
    </div>
    </div>

    {showModal && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div
      className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-2xl relative max-h-[500px] overflow-y-auto no-scrollbar"
      data-aos="fade-up"
      >
      {/* Tombol Tutup Modal */}
      <button
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
      onClick={() => setShowModal(false)}
      >
      &times;
      </button>
      <div className="flex flex-col lg:flex-row gap-4">
      {/* Gambar Produk */}
      <div className="flex-1">
      {imageUrl && (
        <img
        className="w-full h-full object-cover object-top rounded-md"
        src={imageUrl}
        alt={product.name}
        />
      )}
      </div>
      {/* Detail Produk */}
      <div className="flex-1 flex flex-col justify-between">
      <div>
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <div className="text-gray-800 mb-4">
      <p>
      <span className="font-bold">Harga:</span> Rp{" "}
      {new Intl.NumberFormat("id-ID", { style: "decimal" }).format(product.price)}
      </p>
      <p>
      <span className="font-bold">Ukuran:</span>{" "}
      {product.size || "Tidak tersedia"}
      </p>
      <p>
      <span className="font-bold">Bahan:</span>{" "}
      {product.material || "Tidak tersedia"}
      </p>
      <p>
      <span className="font-bold">Deskripsi:</span>{" "}
      {product.description}
      </p>
      </div>
      </div>
      {/* Tombol WhatsApp */}
      <div className="mt-4 text-center">
      <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      >
      <button className="bg-white w-full text-green-800 border-green-600 border-2 py-2 px-4
      rounded-xl hover:bg-green-800 hover:text-white hover:border-white transition">
      Pesan Sekarang
      </button>
      </a>
      </div>
      </div>
      </div>
      </div>
      </div>
    )}

    </div>
  );
};

export default ProductCard;
