"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { type RenderImageContext, type RenderImageProps, RowsPhotoAlbum } from "react-photo-album"
import "react-photo-album/rows.css"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCollections, getImagesByCollection } from "@/lib/data"
import { getImageUrl } from "@/lib/image-utils"

// Custom render function for Next.js Image component
function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height, onClick }: RenderImageContext,
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
      className="group overflow-hidden rounded-lg rounded-none"
    >
      <Image
        fill
        src={photo.src || "/placeholder.svg"}
        alt={alt}
        title={title}
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        onClick={onClick}
      />

      {/* Overlay with title and info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6 ">
        <div>
          <h3 className="text-xs md:text-xl font-semibold mb-1 md:mb-2">{photo.title}</h3>
          <p className="text-xs md:text-sm text-gray-300 capitalize mb-2 md:mb-4">
            {photo.collectionName} • {photo.location}
          </p>
          <Button asChild size="sm" className="rounded-full text-xs md:text-sm px-3 py-1 h-auto md:h-9 bg-black opacity-100">
            <Link href={`/photo/${photo.id}`} className="opacity-100">
              <span className="opacity-100">View Details</span>
            </Link>
          </Button>
        </div>
      </div>

      <Link href={`/photo/${photo.id}`} className="absolute inset-0">
        <span className="sr-only">View {photo.title}</span>
      </Link>

    </div>
  )
}

export default function CollectionsPage() {
  // Get collections from our data
  const collections = getCollections()

  // Initialize with "all" as default
  const [activeTab, setActiveTab] = useState("all")
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Effect to handle hash fragment in URL
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash.replace("#", "")

    // If hash exists and matches a collection ID, set it as active
    if (hash && collections.some((collection) => collection.id === hash)) {
      setActiveTab(hash)
    }
  }, [collections])

  // Get photos for each collection and format for react-photo-album
  const allPhotos = collections.flatMap((collection) => {
    const collectionImages = getImagesByCollection(collection.id)
    return collectionImages.map((image) => {
      // Calculate width and height based on aspect ratio
      let width = 1000
      let height = 1000

      if (image.aspectRatio === "landscape") {
        width = 1600
        height = 900
      } else if (image.aspectRatio === "portrait") {
        width = 900
        height = 1600
      }

      return {
        src: getImageUrl(image.url) || "/placeholder.svg",
        width,
        height,
        id: image.id,
        title: image.title,
        collection: collection.id,
        collectionName: collection.name,
        featured: image.featured,
        location: image.location,
        aspectRatio: image.aspectRatio,
      }
    })
  })

  const sortedPhotos = allPhotos.sort((a, b) => {
    if (a.featured && !b.featured) return -1; // Featured images come first
    if (!a.featured && b.featured) return 1;
    return 0; // Maintain original order for non-featured images
  });

  const filteredPhotos = activeTab === "all" ? sortedPhotos : sortedPhotos.filter((photo) => photo.collection === activeTab)

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value)
    // Update URL hash without full page reload
    if (value !== "all") {
      window.history.replaceState(null, "", `#${value}`)
    } else {
      window.history.replaceState(null, "", window.location.pathname)
    }
  }

  return (
    <div className="bg-black text-white pt-24 pb-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Collections</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore my photography organized by themes and subjects. Each collection represents a unique perspective and
            story.
          </p>
        </motion.div>

        <Tabs value={activeTab} className="mb-8 md:mb-12" onValueChange={handleTabChange}>
          <div className="flex justify-center">
            <TabsList className="bg-zinc-900 h-auto flex flex-wrap justify-center p-1 md:p-2">
              <TabsTrigger value="all" className="px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm">
                All
              </TabsTrigger>
              {collections.map((collection) => (
                <TabsTrigger
                  key={collection.id}
                  value={collection.id}
                  className="px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm"
                >
                  {collection.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-6 md:mt-8">
            <RowsPhotoAlbum
              photos={filteredPhotos}
              render={{ image: renderNextImage }}
              defaultContainerWidth={1200}
              sizes={{
                size: "1168px",
                sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
              }}
              spacing={16}
              targetRowHeight={350}
            />
          </TabsContent>

          {collections.map((collection) => (
            <TabsContent key={collection.id} value={collection.id} className="mt-6 md:mt-8">
              <RowsPhotoAlbum
                photos={filteredPhotos}
                render={{ image: renderNextImage }}
                defaultContainerWidth={1200}
                sizes={{
                  size: "1168px",
                  sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
                }}
                spacing={16}
                targetRowHeight={350}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

