"use client"
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import NavigationBar from "@/components/NavigationBar";
import HeaderHomePage from "@/components/HeaderHomePage";
import AboutMe from "@/components/AboutMe";
import CatalogsComp from "@/components/Catalogs";
const HomePage = ({ selectedImage }) => {
  return (
    <div className="bg-black">
      <NavigationBar/>
      <HeaderHomePage />
      <AboutMe />
      <CatalogsComp />
    </div>
  );
};

export default HomePage;
