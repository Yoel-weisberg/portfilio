"use client"
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import catalogs from '../testData';
import NavigationBar from '@/components/NavigationBar';
import { useRouter } from 'next/navigation'; // Note: changed from 'next/router'
const GalleryPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Navigation */}
      <NavigationBar />

      {/* Gallery Title - Now left-aligned */}
      <h1 className="text-6xl font-bold mb-16 max-w-7xl mx-auto">Gallery</h1>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {catalogs.map((album) => (
          <Card 
            key={album.name}
            className="relative overflow-hidden rounded-lg border-2 border-white cursor-pointer group hover:scale-105 transition-transform duration-200"
            onClick={ () => {router.push(`Gallary/${album.name}`)}}
          >
            <CardContent className="p-0">
              {/* Album Thumbnail */}
              <div className="relative aspect-square">
                <img
                  src={album.tumbnail || album.images[0]?.src}
                  alt={`${album.name} album cover`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay with album name */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h2 className="text-4xl font-bold text-white capitalize">
                    {album.name}
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;