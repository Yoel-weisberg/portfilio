"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import NavigationBar from '@/components/NavigationBar';
import catalogs from '@/app/testData';
import Gallery from "react-photo-gallery";
import { use } from "react";


const CatalogDisplay = ({ params }) => {
  // This should be replaced with your actual data access
  const params_v = use(params)
  const catalog = catalogs.find(catalog => catalog.name.toLowerCase() === params_v.category);
  console.log(catalog.images)
  if (!catalog) return <div>Catalog not found</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Navigation */}
      <NavigationBar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link 
          href="/Gallary" 
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
      <Gallery items={catalog.images} />
    </div>
  );
};

export default CatalogDisplay;