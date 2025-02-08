"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import NavigationBarItem from "./NavigationBarItem";
const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu className=" mx-10 justify-center py-2">
      <NavigationMenuList className="space-x-2">
        <NavigationBarItem Text={"Main"} href={"/"} />
        <NavigationBarItem Text={"About me"} href={"/HomePage#about"} />
        <NavigationBarItem Text={"Catalogs"} href={"/HomePage#Catalogs"} />
        <NavigationBarItem Text={"Gallery"} href={"/Gallary"} />
        <NavigationBarItem Text={"Contact"} href={"/HomePage#Contact"} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationBar;