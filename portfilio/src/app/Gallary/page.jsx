"use client";

import PhotoGrid from "@/components/PhotoGrid";
import NavigationBar from "@/components/NavigationBar";
import catalogs from "../testData";
const Gallary = () => {
  const images = catalogs.images;
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <NavigationBar />
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-6xl font-bold mb-4 capitalize">Gallary</h1>
      </div>
      
      <PhotoGrid images={images} />
    </div>
  );
};

export default Gallary;
