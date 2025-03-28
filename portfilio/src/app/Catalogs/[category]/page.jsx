"use client";

import React from "react";
import NavigationBar from "@/components/NavigationBar";
import { use } from "react";
import "react-photo-album/rows.css";
import { useRouter } from "next/navigation";
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css";
import PhotoGrid from "@/components/PhotoGrid";
import { useData } from "@/app/context/DataContext";
// for photo gallary

const CatalogDisplay = ({ params }) => {
  // This should be replaced with your actual data access
  const { images, tags, loading } = useData();

  if (loading) return <p>Loading...</p>;

  const params_v = use(params);
  const catalog_id = params_v.category;
  const catalog_images = images.filter(image => image.tags.includes(Number(catalog_id)))
  const catalog_object = tags.find(tag => tag.id === Number(catalog_id))

  if (catalog_images.length === 0) return <div>No images in catalog</div>;
  return (
    <div className="min-h-screen  dark:text-white p-8">
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
