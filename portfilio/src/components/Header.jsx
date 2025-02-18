"use client";

import { usePathname } from "next/navigation";
import NavigationBar from "./NavigationBar";
import { DarkModeToggle } from "./DarkModeToggle";
import MobileNavBar from "./MobileNavBar";
const Header = () => {
  return (
    <header className="flex justify-center max-sm:justify-start items-center sticky top-0 z-50 ">
      {/* Navigation Bar centered in the second column */}
      <div className="max-sm:hidden flex">
        <NavigationBar />
        
        <DarkModeToggle />
      </div>

      <div className="sm:hidden">
      <MobileNavBar />
      </div>
    </header >
  );
};

export default Header;
