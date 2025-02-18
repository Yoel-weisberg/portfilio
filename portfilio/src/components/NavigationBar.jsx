"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavigationBarItem from "./NavigationBarItem";
import pages from "./pages";
const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className=" flex items-center justify-between px-6 py-2">
        {/* Desktop Navigation (Hidden on Small Screens) */}
        <NavigationMenu className=" mx-auto justify-center">
          {pages.map((page) => (
            <NavigationBarItem
              key={page.href}
              Text={page.Text}
              href={page.href}
            />
          ))}
        </NavigationMenu>
      </nav>
    </>
  );
};

export default NavigationBar;
