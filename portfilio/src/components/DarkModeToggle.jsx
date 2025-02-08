"use client";

import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true); // Initially null to avoid mismatch

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);


  return (
    <div className="flex items-center">
      <Toggle
        aria-label="Toggle dark mode"
        pressed={darkMode}
        onPressedChange={() => setDarkMode(!darkMode)}
        className="dark:hover:bg-gray-700 hover:bg-gray-100 data-[state=on]:bg-gray-600 border my-5"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Toggle>
    </div>
  );
}
