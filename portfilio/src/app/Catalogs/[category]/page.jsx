"use client";

import React from "react";
import NavigationBar from "@/components/NavigationBar";
import catalogs from "@/app/testData";
import { use } from "react";
import "react-photo-album/rows.css";
import { useRouter } from "next/navigation";
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css";
import PhotoGrid from "@/components/PhotoGrid";
// for photo gallary

const CatalogDisplay = ({ params }) => {
  // This should be replaced with your actual data access
  const params_v = use(params);
  const catalog_name = params_v.category;
  const catalog_object = catalogs.tags.filter(tag => tag.name === catalog_name)[0]
  const catalog_images = catalogs.images.filter(image => image.tags.includes(catalog_name))

  if (catalog_images.length === 0) return <div>No images in catalog</div>;
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Navigation */}
      <NavigationBar />
      {/* Catalog Title and Description */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-6xl font-bold mb-4 capitalize">{catalog_object.name}</h1>
        {catalog_object.description && (
          <p className="text-xl opacity-80">{catalog_object.description}</p>
        )}
      </div>
      {/* Images Grid */}
      <PhotoGrid images={catalog_images} />
    </div>
  );
};

export default CatalogDisplay;
