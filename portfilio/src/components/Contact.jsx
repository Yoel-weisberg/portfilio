import React from 'react';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="min-h-screen  dark:text-white flex" id='Contact'>
      {/* Left Side - Contact Form */}
      <div className="w-3/4 p-16 flex flex-col justify-center">
        <h1 className="text-8xl font-bold mb-12 tracking-tight">Let's talk</h1>
        <p className="mb-8 text-lg">
          if you want to buy a print, hire me for a job or just chat.
          Please leave a message and I'll return to you as soon as possible
        </p>
        
        <form className="space-y-6 max-w-3xl">
          {/* Name and Email row */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-transparent border dark:border-white/50 p-3 focus:outline-none dark:focus:border-white focus:border-black"
              />
            </div>
            <div className="w-1/2">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-transparent border dark:border-white/50 p-3 focus:outline-none dark:focus:border-white focus:border-black"
              />
            </div>
          </div>

          {/* Subject field */}
          <input 
            type="text" 
            placeholder="Subject" 
            className="w-full bg-transparent border dark:border-white/50 p-3 focus:outline-none dark:focus:border-white focus:border-black"
          />

          {/* Message box */}
          <textarea 
            placeholder="content" 
            className="w-full bg-transparent border dark:border-white/50 p-3 h-40 focus:outline-none dark:focus:border-white focus:border-black"
          />

          <button 
            type="submit" 
            className="dark:bg-white dark:text-black px-8 py-3 bg-black text-white rounded-md dark:hover:bg-gray-300 hover:bg-gray-500 transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Social Icons */}
        <div className="flex space-x-6 mt-12">
          <a href="#" className="text-3xl dark:hover:text-gray-300 ">
            <FaInstagram />
          </a>
          <a href="#" className="text-3xl dark:hover:text-gray-300">
            <FaLinkedin />
          </a>
          <a href="#" className="text-3xl dark:hover:text-gray-300">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-3/4 ">
        <img 
          src="/Images/LetsTalk.jpg" 
          alt="Contact scene" 
          className= "h-5/6 object-cover my-32 px-6"
        />
      </div>
    </div>
  );
};

export default ContactPage;