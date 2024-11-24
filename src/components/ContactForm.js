import React, { useState } from 'react';
import axios from 'axios';
import AOS from 'aos';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:1337/api/feedbacks', {
        data: {
          name,
          email,
          message,
        },
      });

      setResponseMessage('Pesan Anda Berhasil Terkirim!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setResponseMessage('Terdapat Masalah Saat Mengirim Pesan Anda. Coba Lagi Nanti.');
    }

    setIsSubmitting(false);
  };

  return (
    <section id="kontak" className="bg-gray-100 py-16 mb-10">
    <div className="container mx-auto px-8">
    <h2 className="text-4xl font-bold text-center text-green-800 mb-10" data-aos="fade-down">Kontak Kami</h2>
    {responseMessage && (
      <div className="text-center mb-4">
      <p className="text-lg text-green-500">{responseMessage}</p>
      </div>
    )}
    <form
    onSubmit={handleSubmit}
    className="max-w-lg mx-auto bg-white p-8 mb-10 rounded-tr-[50px] rounded-bl-[50px] rounded-tl-md rounded-br-md shadow-[0_0_10px_rgba(0,0,0,0.4)]"
    data-aos="fade-down"
    >
    <div className="flex flex-col lg:flex-row lg:space-x-4">
    <div className="mb-4 flex-1" data-aos="fade-left">
    <label htmlFor="name" className="block text-gray-700">Nama</label>
    <input
    type="text"
    id="name"
    name="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full p-3 mt-2 border border-gray-300 rounded-md"
    required
    />
    </div>
    <div className="mb-4 flex-1" data-aos="fade-right">
    <label htmlFor="email" className="block text-gray-700">E-mail</label>
    <input
    type="email"
    id="email"
    name="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-3 mt-2 border border-gray-300 rounded-md"
    required
    />
    </div>
    </div>
    <div className="mb-4" data-aos="fade-up">
    <label htmlFor="message" className="block text-gray-700">Pesan</label>
    <textarea
    id="message"
    name="message"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="w-full p-3 mt-2 border border-gray-300 rounded-md"
    rows="4"
    required
    ></textarea>
    </div>
    <div className="text-center mb-4">
    <button
    type="submit"
    disabled={isSubmitting}
    className={`${
      isSubmitting ? 'bg-gray-500' : 'bg-green-700'
    } bg-green-700 text-white text-sm px-8 py-4 rounded-md shadow-[0_12px_15px rgba(0,0,0,0.6)] hover:bg-green-800 transform hover:scale-110 transition-all duration-300`}
    data-aos="flip-up"
    >
    {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
    </button>
    </div>
    </form>
    </div>
    </section>
  );
};

export default ContactForm;
