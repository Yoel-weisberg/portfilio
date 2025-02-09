"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import NavigationBar from './NavigationBar';
import { useData } from "../context/DataContext";

const CatalogDisplay = ({ categoryName }) => {
  // This should be replaced with your actual data access
  const { images, tags, loading } = useData();

  if (loading) return <p>Loading...</p>;

  const catalog = tags.find(catalog => catalog.name.toLowerCase() === categoryName);
  if (!catalog) return <div>Catalog not found</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Navigation */}
      <NavigationBar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link 
          href="/gallery" 
          className="opacity-50 hover:opacity-100 transition-opacity"
        >
          gallery
        </Link>
        <span className="opacity-50 mx-1">/</span>
        <span>{catalog.name}</span>
      </div>

      {/* Catalog Title and Description */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-6xl font-bold mb-4 capitalize">{catalog.name}</h1>
        {catalog.description && (
          <p className="text-xl opacity-80">{catalog.description}</p>
        )}
      </div>

      {/* Images Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">
        {catalog.images.map((image, index) => (
          <Card 
            key={image.id || index}
            className="relative overflow-hidden rounded-lg border-2 border-white cursor-pointer"
            onClick={() => console.log(`Clicked image ${image.id || index}`)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt || `${catalog.name} image ${index + 1}`}
                  className="w-full h-auto"
                />
                {image.alt && (
                  <span 
                    className="absolute bottom-4 left-4 font-['Brush_Script_MT'] text-white text-xl drop-shadow-lg"
                  >
                    {image.alt}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CatalogDisplay;