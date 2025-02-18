  "use client"
  import React from 'react';
  import { motion } from 'framer-motion';

  const ScrollDownIndicator = ({scrollTo}) => {
    return (
      <a className="flex justify-center max-sm:hidden" href={scrollTo}>
        <motion.div 
          className="w-20 h-36 border-4 dark:border-white border-black rounded-full flex justify-center items-center"
          style={{ 
            boxShadow: '0 2px 10px dark:rgba(0, 0, 0, 0.1)',
          }}
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="30" 
            height="44" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            animate={{
              scale: [2.5, 2, 2.5],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="dark:text-white"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </motion.svg>
        </motion.div>
      </a>
    );
  };

  export default ScrollDownIndicator;