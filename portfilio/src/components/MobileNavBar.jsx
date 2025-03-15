/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lJwnQlHSEBA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import pages from "./pages";
import MobileNavBarItem from "./MobileNavBarItem";
import Link from "next/link";
import { useState } from "react";

export default function MobileNavBar() {
  // State to control the Sheet (navbar) open/close
  const [isOpen, setIsOpen] = useState(false);

  // Function to close the Sheet
  const closeNavBar = () => setIsOpen(false);

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 sm:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <div>
            <MenuIcon className="h-6 w-6  " />
            <span className="sr-only">Toggle navigation menu</span>
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle className="text-2xl">Menu</SheetTitle>
          <SheetDescription></SheetDescription>
          <div className="grid gap-2 py-6">
            {pages.map((page) => (
              <MobileNavBarItem
                key={page.href}
                Text={page.Text}
                href={page.href}
                onClick={closeNavBar}
              />
            ))}
          </div>
          <DarkModeToggle />
        </SheetContent>
      </Sheet>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="white"
    >
      <line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
        className="stroke-black dark:stroke-white"
      />
      <line
        x1="4"
        x2="20"
        y1="6"
        y2="6"
        className="stroke-black dark:stroke-white"
      />
      <line
        x1="4"
        x2="20"
        y1="18"
        y2="18"
        className="stroke-black dark:stroke-white"
      />
    </svg>
  );
}
