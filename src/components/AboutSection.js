import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';

const AboutSection = () => {
  const [aboutData, setAboutData] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024); // Asumsikan 1024px sebagai breakpoint untuk desktop

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('https://smiling-strength-5b60708ab1.strapiapp.com/api/about?populate=*');
        console.log('About Data Response:', response.data);
        if (response.data.data) {
          setAboutData(response.data.data);
        } else {
          console.error('No data found in response');
        }
      } catch (error) {
        console.error('Error fetching about:', error);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    // Update state on window resize
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!aboutData) {
    return <div>Loading About Section...</div>;
  }

  const baseUrl = 'https://smiling-strength-5b60708ab1.strapiapp.com';
  const imageUrl = aboutData.image && aboutData.image.length > 0 ? `${baseUrl}${aboutData.image[0].url}` : '';

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <section id="tentangkami" className="relative bg-gray-100">
    <div className="container mx-auto flex flex-col lg:flex-row md:gap-8 items-center justify-between px-4 py-20 mb-10">
    {/* Left Image Content */}
    <div className="lg:w-1/2 mb-8 lg:mb-0" data-aos="fade-right" >
    {imageUrl && (
      <img
      src={imageUrl}
      alt="About Us"
      className="w-[260px] lg:w-[340px] h-auto rounded-tr-[70px] rounded-bl-[70px] lg:rounded-tr-[100px] lg:rounded-bl-[100px] rounded-tl-md rounded-br-md shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
      />
    )}
    </div>

    {/* Right Text Content */}
    <div className="lg:w-3/4 lg:mr-40 lg:text-md" >
    <h1 className="text-5xl font-extrabold text-green-800 pb-6" data-aos="fade-down">{aboutData.title}</h1>
    <p id="paragraph" className="text-green-900 text-lg mb-6 pb-2" data-aos="fade-up">
    {isDesktop || showFullDescription ? aboutData.description : `${aboutData.description.substring(0, 100)}...`}
    </p>
    {/* Tombol "Baca Selengkapnya" */}
    {!isDesktop && aboutData.description.length > 100 && (
      <button
      onClick={toggleDescription}
      className="bg-green-700 text-white text-sm px-8 py-4 rounded-md shadow-[0_8px_15px_rgba(0,0,0,0.6)] lg:hidden" data-aos="fade-up">
      {showFullDescription ? 'Tutup' : 'Baca Selengkapnya'}
      </button>
    )}
    </div>
    </div>
    </section>
  );
};

export default AboutSection;
