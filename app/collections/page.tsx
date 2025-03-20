"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCollections, getImagesByCollection } from "@/lib/data"
import { getImageUrl } from "@/lib/image-utils"

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

  // Get photos for each collection
  const allPhotos = collections.flatMap((collection) => {
    const collectionImages = getImagesByCollection(collection.id)
    return collectionImages.map((image) => ({
      id: image.id,
      title: image.title,
      collection: collection.id,
      collectionName: collection.name,
      featured: image.featured,
      url: image.url,
      location: image.location,
    }))
  })

  const filteredPhotos = activeTab === "all" ? allPhotos : allPhotos.filter((photo) => photo.collection === activeTab)

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredPhotos.map((photo, index) => (
                <PhotoCard key={photo.id} photo={photo} index={index} isMobile={isMobile} />
              ))}
            </div>
          </TabsContent>

          {collections.map((collection) => (
            <TabsContent key={collection.id} value={collection.id} className="mt-6 md:mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredPhotos.map((photo, index) => (
                  <PhotoCard key={photo.id} photo={photo} index={index} isMobile={isMobile} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

function PhotoCard({ photo, index, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg aspect-[3/4]"
    >
      <Image
        src={getImageUrl(photo.url) || "/placeholder.svg"}
        alt={photo.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
        <div>
          <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">{photo.title}</h3>
          <p className="text-xs md:text-sm text-gray-300 capitalize mb-2 md:mb-4">
            {photo.collectionName} • {photo.location}
          </p>
          <Button asChild size="sm" className="rounded-full text-xs md:text-sm px-3 py-1 h-auto md:h-9">
            <Link href={`/photo/${photo.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
      <Link href={`/photo/${photo.id}`} className="absolute inset-0">
        <span className="sr-only">View {photo.title}</span>
      </Link>
      {photo.featured && (
        <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-primary text-primary-foreground text-xs font-medium py-1 px-2 rounded-full">
          Featured
        </div>
      )}

      {/* Always visible info on mobile */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
          <h3 className="text-sm font-semibold truncate">{photo.title}</h3>
          <p className="text-xs text-gray-300 truncate">{photo.collectionName}</p>
        </div>
      )}
    </motion.div>
  )
}

