"use client";

import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Simulating a successful submission
      setSubmitted(true);

      // Uncomment this if you want to send data to an API
      /*
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Something went wrong!");

      */

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form

    } catch (error) {
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen dark:text-white flex" id="Contact">
      {/* Left Side - Contact Form */}
      <div className="w-3/4 p-16 flex flex-col justify-center">
        <h1 className="text-8xl font-bold mb-12 tracking-tight">Let's talk</h1>
        <p className="mb-8 text-lg">
          If you want to buy a print, hire me for a job, or just chat,
          please leave a message, and I'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          {/* Name and Email row */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full bg-transparent border dark:border-white/50 p-3 focus:outline-none dark:focus:border-white focus:border-black"
                required
              />
            </div>
            <div className="w-1/2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-transparent border dark:border-white/50 p-3 focus:outline-none dark:focus:border-white focus:border-black"
                required
              />
            </div>
          </div>

          {/* Subject field */}
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full bg-transparent border dark:border-white/50 p-3 focus:outline-none dark:focus:border-white focus:border-black"
          />

          {/* Message box */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            className="w-full bg-transparent border dark:border-white/50 p-3 h-40 focus:outline-none dark:focus:border-white focus:border-black"
            required
          />

          <button
            type="submit"
            className="dark:bg-white dark:text-black px-8 py-3 bg-black text-white rounded-md dark:hover:bg-gray-300 hover:bg-gray-500 transition-colors"
          >
            {submitted ? "Sent!" : "Send Message"}
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
          src="/LetsTalk.jpg"
          alt="Contact scene"
          className="h-5/6 object-cover my-32 px-6"
        />
      </div>
    </div>
  );
};

export default ContactPage;
