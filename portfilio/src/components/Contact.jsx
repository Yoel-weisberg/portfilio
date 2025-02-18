"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
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
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the state object as JSON
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the email.");
    }
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmitted(false);
      }, 500); // Display success message for 5 seconds before hiding it again
    }
  }, [submitted]);

  return (
    <div className="min-h-screen dark:text-white flex" id="Contact" suppressHydrationWarning={true}>
      {/* Left Side - Contact Form */}
      <div className="w-3/4 max-sm:w-full p-16 flex flex-col justify-center">
        <h1 className="text-8xl font-bold mb-12 tracking-tight">Let's talk</h1>
        <p className="mb-8 text-lg">
          If you want to buy a print, hire me for a job, or just chat, please
          leave a message, and I'll get back to you as soon as possible.
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
          <Link
            href="https://www.instagram.com/yoel_weisberg/"
            className="text-3xl dark:hover:text-gray-300"
            target="_blank"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.linkedin.com/in/yoel-weisberg-459182296"
            className="text-3xl dark:hover:text-gray-300"
            target="_blank"
          >
            <FaLinkedin />
          </Link>
          <Link
            href="https://api.whatsapp.com/send?phone=972584029549&text=Hey%20Yoel.%20I%20saw%20your%20portfolio%20and%20wanted%20to%20contact%20you"
            className="text-3xl dark:hover:text-gray-300"
            target="_blank"
          >
            <FaWhatsapp />
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-3/4 max-sm:hidden">
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
