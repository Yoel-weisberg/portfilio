"use client";

import { usePathname } from "next/navigation";
import NavigationBar from "./NavigationBar";
import { DarkModeToggle } from "./DarkModeToggle";
import MobileNavBar from "./MobileNavBar";
const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-center max-sm:justify-start items-center z-50 bg-transparent p-4 max-sm:p-[0px]" suppressHydrationWarning={true}>
      {/* Desktop Navigation */}
      <div className="max-sm:hidden flex">
        <NavigationBar />
        <DarkModeToggle />
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <MobileNavBar />
      </div>
    </header>
  );
};
  
export default Header;
