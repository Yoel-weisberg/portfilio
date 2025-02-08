// context/DarkModeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const DarkModeContext = createContext();

// Dark mode provider component
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      setIsDarkMode(newMode);
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use dark mode context
export const useDarkMode = () => useContext(DarkModeContext);
