import React, { useState, useEffect } from "react";
import axios from "axios";

const HomeSection = () => {
  const [homeData, setHomeData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get("https://smiling-strength-5b60708ab1.strapiapp.com/api/homes?populate=*");
        const data = response.data.data;
        setHomeData(data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    if (!homeData) return;

    const images = homeData[0].image;
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeClass("fade-in");
      }, 500); // Durasi fade-out
    }, 4000); // Ganti setiap 4 detik

    return () => clearInterval(interval);
  }, [homeData]);

  if (!homeData || homeData.length === 0) {
    return <div>Loading...</div>;
  }

  const baseUrl = "https://smiling-strength-5b60708ab1.strapiapp.com";
  const home = homeData[0];
  const descriptionElements = home.description.map((desc, index) => {
    if (desc.type === "heading") {
      return (
        <h1
        key={index}
        className="text-5xl font-bold text-green-800 mb-4 leading-tight"
        >
        {desc.children.map((child, i) => {
          let classNames = "";

          // Tambahkan kelas berdasarkan properti gaya
          if (child.bold) classNames += " font-bold";
          if (child.italic) classNames += " italic";

          return (
            <span key={i} className={classNames}>
            {child.text}
            </span>
          );
        })}
        </h1>
      );
    }
    if (desc.type === "paragraph") {
      return (
        <p key={index} id="paragraph" className="text-green-900 text-lg mb-[2px] pb-2 hidden lg:block">
        {desc.children[0].text}
        </p>
      );
    }
    return null;
  });

  const images = home.image;
  const imageUrl = images && images.length > 0 ? `${baseUrl}${images[currentImageIndex].url}` : null;

  return (
    <section id="beranda" className="relative bg-white pt-10">
    <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 py-20 mb-10" data-aos="fade-up">
    <div className="lg:w-1/2">
    {descriptionElements}
    <a href="#produk">
    <button className="bg-green-700 text-white text-sm px-8 py-4 rounded-md shadow-[0_8px_15px_rgba(0,0,0,0.6)] hover:bg-green-800 transform hover:scale-110 transition-all duration-300">
    JELAJAHI SEKARANG!
    </button>
    </a>
    </div>

    <div className="lg:w-1/2 flex justify-center items-center relative mt-8 lg:mt-0" >
    {imageUrl ? (
      <div className="w-full max-w-xs lg:max-w-sm lg:max-w-md" data-aos="fade-up">
      <img
      src={imageUrl}
      alt={images[currentImageIndex].alternativeText || "Fashion"}
      className={`w-[260px] lg:w-[340px] h-auto rounded-tl-[70px] rounded-br-[70px] lg:rounded-tl-[100px] lg:rounded-br-[100px] rounded-tr-md rounded-bl-md mx-auto mb-6 lg:mb-0 lg:ml-[160px] shadow-[0_8px_25px_rgba(0,0,0,0.6)] object-contain transition-opacity duration-500 ${fadeClass}`}
      />
      </div>
    ) : (
      <div className="w-full h-12 bg-gray-300 flex items-center justify-center text-gray-700">
      Gambar Tidak Tersedia
      </div>
    )}
    </div>
    </div>
    </section>
  );
};

export default HomeSection;
