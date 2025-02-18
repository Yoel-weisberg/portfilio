"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BatteryMedium } from 'lucide-react';
import ScrollDownIndicator from './ScrollDownIndicator';
import Link from 'next/link';

const HeaderHomePage = () => {
  const [time, setTime] = useState('');

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Jerusalem',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      });
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen max-sm:min-h-72  flex flex-col bg-header">
      {/* Corner Lines */}
      <div className="absolute top-10 left-5 w-16 h-16 border-l-2 border-t-2  border-white" />
      <div className="absolute top-10 right-5 w-16 h-16 border-r-2 border-t-2  border-white" />
      <div className="absolute bottom-10 max-sm:bottom-10 left-5 w-16 h-16 border-l-2 border-b-2  border-white" />
      <div className="absolute bottom-10  max-sm:bottom-10 right-5 w-16 h-16 border-r-2 border-b-2  border-white" />

      {/* Top Left - Battery */}
      <div className="absolute top-14 left-9 flex items-center">
        <BatteryMedium className="w-8 h-8 text-white/75 " />
      </div>

      {/* Bottom Left - Jerusalem */}
      <div className="absolute max-sm:bottom-14 bottom-14 left-9  text-white/75 font-bold">
        <Link className="text-xl" href={"#about"} >Jerusalem</Link>
      </div>

      {/* Bottom Right - Time */}
      <div className="absolute bottom-14 max-sm:bottom-14 right-9 font-bold text-white/75" suppressHydrationWarning={true}>
        <Link className="text-xl" href={"#about"}>{time}</Link>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-left font-bold ">
            <span className="max-sm:text-3xl text-9xl font-bold leading-tight mb-2 text-white">
              Hello;{" "}
            </span>
            <span className="text-4xl mb-2 max-sm:text-xl text-white">
              I'm <span className="uppercase">Yoel Weisberg</span>
            </span>
            <br />
            <span className="text-4xl max-sm:text-xl mb-2 text-white">a</span>
            <span className="text-9xl max-sm:text-3xl font-bold leading-tight bg-gradient-to-r  to-[#999] from-[#dbd8d8] bg-clip-text text-transparent">
              Photographer
            </span>
          </h1>
        </motion.div>
        
        <motion.div
          className="max-w-4xl mt-20 max-sm:hidden"
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <ScrollDownIndicator scrollTo={'#Catalogs'} className="max-sm:hidden"/>
        </motion.div>
      </div>
    </div>
  );
};

export default HeaderHomePage;