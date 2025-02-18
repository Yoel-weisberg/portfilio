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
    <div className="relative min-h-screen max-sm:min-h-72 dark:text-white flex flex-col">
      {/* Corner Lines */}
      <div className="absolute top-0 left-5 w-16 h-16 border-l-2 border-t-2 dark:border-white border-black" />
      <div className="absolute top-0 right-5 w-16 h-16 border-r-2 border-t-2 dark:border-white border-black" />
      <div className="absolute bottom-28 max-sm:bottom-10 left-5 w-16 h-16 border-l-2 border-b-2 dark:border-white border-black" />
      <div className="absolute bottom-28  max-sm:bottom-10 right-5 w-16 h-16 border-r-2 border-b-2 dark:border-white border-black" />

      {/* Top Left - Battery */}
      <div className="absolute top-4 left-9 flex items-center">
        <BatteryMedium className="w-8 h-8 " />
      </div>

      {/* Bottom Left - Jerusalem */}
      <div className="absolute max-sm:bottom-14 bottom-32 left-9 text-black/75 dark:text-white/75">
        <Link className="text-xl" href={"#about"} >Jerusalem</Link>
      </div>

      {/* Bottom Right - Time */}
      <div className="absolute bottom-32 max-sm:bottom-14 right-9 text-black/75 dark:text-white/75">
        <Link className="text-xl" href={"#about"}>{time}</Link>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col mt-[10vh] items-center text-center px-4">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-left ">
            <span className="max-sm:text-3xl text-9xl font-bold leading-tight mb-2">
              Hello;{" "}
            </span>
            <span className="text-4xl mb-2 max-sm:text-xl">
              I'm <span className="uppercase">Yoel Weisberg</span>
            </span>
            <br />
            <span className="text-4xl max-sm:text-xl mb-2">a</span>
            <span className="text-9xl max-sm:text-3xl font-bold leading-tight bg-gradient-to-r dark:from-[#FFFEFE] dark:to-[#999] from-[#999] to-[#dbd8d8] bg-clip-text text-transparent">
              Photographer
            </span>
          </h1>
        </motion.div>
        
        <motion.div
          className="max-w-4xl mt-20"
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <ScrollDownIndicator scrollTo={'#Catalogs'} />
        </motion.div>
      </div>
    </div>
  );
};

export default HeaderHomePage;