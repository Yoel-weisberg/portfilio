"use client"
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import NavigationBar from "@/components/NavigationBar";
import HeaderHomePage from "@/components/HeaderHomePage";
import AboutMe from "@/components/AboutMe";
import CatalogsComp from "@/components/Catalogs";
import ContactSection from "@/components/Contact";
const HomePage = ({ selectedImage }) => {
  return (
    <div>
      <HeaderHomePage />
      <AboutMe />
      <CatalogsComp />
      <ContactSection />
    </div>
  );
};

export default HomePage;
