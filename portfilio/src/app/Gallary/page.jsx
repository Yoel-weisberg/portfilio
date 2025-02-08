"use client";

import React from "react";
import NavigationBar from "@/components/NavigationBar";
import catalogs from "@/app/testData";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css";
import PhotoGrid from "@/components/PhotoGrid";

const Gallary = () => {
  // This should be replaced with your actual data access
  const catalog_images = catalogs.images.filter(image => true)
  return (
    <div className="min-h-screen  dark:text-white p-8">
      {/* Catalog Title and Description */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-6xl font-bold mb-4 capitalize">Gallary</h1>
      </div>
      {/* Images Grid */}
      <PhotoGrid images={catalog_images} />
    </div>
  );
};

export default Gallary;
