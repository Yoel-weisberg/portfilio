"use client"
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ScrollDownIndicator from "@/components/ScrollDownIndicator";
const HeaderHomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex flex-col mt-[10vh] items-center text-center px-4">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 50 }}  // Starts invisible and lower
          whileInView={{ opacity: 1, y: 0 }} // Animates to normal position
          transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
        >
          <h1 className="text-left">
            <span className="text-[128px] font-bold leading-tight mb-2">
              Hello;{" "}
            </span>
            <span className="text-[36px] mb-2">
              I'm <span className="uppercase">Yoel Weisberg</span>
            </span>
            <br />
            <span className="text-[36px] mb-2">a</span>
            <span className="text-[128px] font-bold leading-tight bg-gradient-to-r from-[#FFFEFE] to-[#999] bg-clip-text text-transparent">
              Photographer
            </span>
          </h1>
          </motion.div>
        
        <motion.div
          className="max-w-4xl mt-20"
          initial={{ opacity: 0, y: 150 }}  // Starts invisible and lower
          whileInView={{ opacity: 1, y: 0 }} // Animates to normal position
          transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
        >
        {/* <ScrollDownIndicator className="mt-12" /> */}
        <ScrollDownIndicator className="mt-[45px]" scrollTo={"#about"}/>
        </motion.div>

      </div>
    </div>
  );
};

export default HeaderHomePage;
