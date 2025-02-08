"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import NavigationBar from "@/components/NavigationBar";
import { useRouter } from "next/navigation"; // Note: changed from 'next/router'
import CatalogsComp from "@/components/Catalogs";

const GalleryPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen  dark:text-white p-8">
      <CatalogsComp />
    </div>
  );
};

export default GalleryPage;
