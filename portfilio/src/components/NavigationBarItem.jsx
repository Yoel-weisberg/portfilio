"use client"
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const NavigationBarItem = ({ href, Text }) => {
  const pathname = usePathname();

  const isActivePath = (path) => {
    if (!pathname) return false;
    if (path.href === '/HomePage') {
      return pathname === '/HomePage' || pathname === '/';
    }
    if (path.href.startsWith('/HomePage#')) {
      return pathname === '/HomePage' || pathname === '/';
    }
    return pathname === path;
  };

  return (
    <NavigationMenuItem>
      <Button
        variant="ghost"
        className={`${
          isActivePath({href}) ? "bg-accent" : ""
        }   text-lg dark:text-white`}
        asChild
      >
        <Link href={href}>{Text}</Link>
      </Button>
    </NavigationMenuItem>
  );
};

export default NavigationBarItem;
