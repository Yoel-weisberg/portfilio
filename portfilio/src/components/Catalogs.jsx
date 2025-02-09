"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { motion } from "framer-motion";
import { useData } from "@/app/context/DataContext";

const CatalogsComp = () => {
  const { images, tags, loading } = useData();

  if (loading) return <p>Loading...</p>;

  const router = useRouter();
  return (
    <div
      id="Catalogs"
      className="relative flex flex-col h-screen dark:text-white px-8 md:px-20 lg:px-32 z-10 gap-10 pt-12 pb-12"
    >
      <motion.div
        className="max-w-7xl"
        initial={{ opacity: 0, y: 50 }} // Starts invisible and lower
        whileInView={{ opacity: 1, y: 0 }} // Animates to normal position
        transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
      >
        <h1 className="text-6xl font-bold">Catalogs</h1>
      </motion.div>

      <motion.div
        className="my-auto"
        initial={{ opacity: 0, y: 100 }} // Starts invisible and lower
        whileInView={{ opacity: 1, y: 0 }} // Animates to normal position
        transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
      > 
      <ScrollArea className="w-11/12 whitespace-nowrap rounded-md mx-auto">
        <div className="flex w-max space-x-8 p-4 mb-4">
          {tags.map((tag) => (
            <figure
              key={tag.name}
              className="shrink-0 relative cursor-pointer transition-transform duration-500 hover:scale-105"
              onClick={() => router.push(`Catalogs/${tag.name}`)}
            >
              <div className="overflow-hidden rounded-md relative">
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-4xl font-bold text-white capitalize">
                  {tag.name}
                </div>
                <Image
                  src={tag.thumbnail}
                  alt={tag.name}
                  className=" h-fit w-fit object-cover"
                  width={400}
                  height={300}
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
