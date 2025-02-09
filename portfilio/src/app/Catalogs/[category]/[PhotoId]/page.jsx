'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExpandIcon } from 'lucide-react';
import { usePathname } from "next/navigation";
import { use } from "react";
import { useData } from "../context/DataContext";

const ImageDetailPage= ({ params }) => {
  const { images, tags, loading } = useData();

  if (loading) return <p>Loading...</p>;

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const pathname = usePathname();
  const params_v = use(params)
  console.log(params_v);
  // Find the catalog based on the first path segment
  const catalogName = params_v.category;
  const imageId = params_v.PhotoId;
  const catalogData = tags.find(catalog => catalog.name === catalogName);

  if (!catalogData) {
    throw new Error(`Catalog "${catalogName}" not found.`);
  }

  // Find the specific image using the photoId from params
  const imageData = catalogData.images.find(
    image => image.id === Number(imageId)
  );

  if (!imageData) {
    throw new Error(`Image with ID "${imageId}" not found in catalog "${catalogName}".`);
  }

  const toggleLightbox = () => {
    setIsLightboxOpen(!isLightboxOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Navigation Path */}
      <div className="absolute top-4 left-4 text-sm text-gray-600">
        .../{catalogName}/{imageData.alt}
      </div>

      {/* Left Side: Image Details */}
      <div className="w-1/3 bg-white p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">Image {imageData.id}</h1>
          <p className="text-gray-600 mb-6">{imageData.description}</p>
          
          <div className="flex space-x-4 mb-6">
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-xs text-gray-500">Shutter</span>
              <div>{imageData.settings.shutterSpeed}</div>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-xs text-gray-500">Aperture</span>
              <div>{imageData.settings.aperture}</div>
            </div>
          </div>
        </div>

        <button 
          className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
        >
          BUY THIS PRINT
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="w-2/3 relative">
        <div 
          className="w-full h-full relative cursor-pointer"
          onClick={toggleLightbox}
        >
          <Image 
            src={imageData.src} 
            alt={imageData.alt}
            fill
            style={{ objectFit: 'cover' }}
          />
          <div 
            className="absolute bottom-4 right-4 bg-white/50 p-2 rounded-full cursor-pointer hover:bg-white/75"
            onClick={toggleLightbox}
          >
            <ExpandIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={toggleLightbox}
        >
          <div className="max-w-[90%] max-h-[90%] relative">
            <Image 
              src={imageData.src} 
              alt={imageData.alt}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetailPage;