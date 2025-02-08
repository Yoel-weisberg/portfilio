"use client";

import { usePathname } from "next/navigation";
import NavigationBar from "./NavigationBar";
import { DarkModeToggle } from "./DarkModeToggle";
const Header = () => {
  return (
    <header className="flex justify-center items-center sticky top-0 z-50 ">
      {/* Navigation Bar centered in the second column */}
      <NavigationBar />
      
      <DarkModeToggle />
    </header>
  );
};

export default Header;
