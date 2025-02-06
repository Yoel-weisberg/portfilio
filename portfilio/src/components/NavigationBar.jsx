"use-cliant";
import { usePathname } from "next/navigation"; // Import usePathname

const NavigationBar = () => {
  return (
    <div className="w-full sticky top-0 shadow-md z-10">
      <nav className="flex justify-center pt-6">
        <div className="space-x-6 text-gray-300">
          <a href="/HomePage" className="hover:text-white transition">
            Main
          </a>
          <a href="/HomePage#about" className="hover:text-white transition">
            About me
          </a>
          <a href="/HomePage#Catalogs" className="hover:text-white transition">
            Catelogs
          </a>
          <a href="/Gallary" className="hover:text-white transition">
            Gallary
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
