"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { motion } from "framer-motion";
import { useData } from "@/app/context/DataContext";

const CatalogsComp = () => {
  const { images, tags, loading } = useData();
  const router = useRouter();

  const getImagesFromId = (id) => {
    const photos = images.find((image) => image.id === id);
    return photos;
  };

  console.log(images, tags, loading);
  // Fetch thumbnails on mou

  if (loading) return <p>Loading...</p>;

  return (
    <div
      id="Catalogs"
      className="relative flex flex-col h-screen max-sm:h-fit dark:text-white px-8 md:px-20 lg:px-32 z-10 gap-10 pt-12 pb-12"
    >
      <motion.div
        className="max-w-7xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-6xl font-bold">Catalogs</h1>
      </motion.div>

      <motion.div
        className="my-auto"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <ScrollArea className="w-11/12 whitespace-nowrap rounded-md mx-auto mb-12">
          <div className="flex w-max space-x-8 p-4">
            {tags.map((tag) => (
              <figure
                key={tag.name}
                className="shrink-0 relative cursor-pointer transition-transform duration-500 hover:scale-105 w-[500px] h-[500px] max-sm:w-[200px] max-sm:h-[200px] "
                onClick={() => router.push(`Catalogs/${tag.id}`)}
              >
                <div className="overflow-hidden rounded-md relative w-full h-full">
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-10 p-2 text-4xl font-bold text-white capitalize z-50">
                    {tag.name}
                  </div>
                  <Image
                    src={getImagesFromId(tag.thumbnailId).src || "/placeholder.jpg"}
                    alt={`${tag.name} cover` }
                    className="h-fit w-fit object-cover"
                    // width={400}
                    // height={400}
                    fill
                  />
                </div>
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </motion.div>
    </div>
  );
};

export default CatalogsComp;
