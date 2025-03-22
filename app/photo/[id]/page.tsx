"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { getImage, getImagesByCollection, getCollection } from "@/lib/data"
import { getImageUrl, formatDate } from "@/lib/image-utils"
import { ShareDialog } from "@/components/share-dialog"

export default function PhotoDetailPage({ params }: { params: { id: string } }) {
  const [photo, setPhoto] = useState(null)
  const [relatedPhotos, setRelatedPhotos] = useState([])
  const [collection, setCollection] = useState(null)
  const [pageUrl, setPageUrl] = useState("")

  useEffect(() => {
    // Set the current URL
    setPageUrl(window.location.href)

    // Get the photo data
    const photoData = getImage(params.id)

    if (photoData) {
      setPhoto(photoData)

      // Get the collection data
      const collectionData = getCollection(photoData.collection)
      setCollection(collectionData)

      // Get related photos from the same collection
      const collectionPhotos = getImagesByCollection(photoData.collection)
        .filter((img) => img.id !== photoData.id) // Exclude current photo
        .slice(0, 3) // Limit to 3 related photos

      setRelatedPhotos(collectionPhotos)
    }
  }, [params.id]) // Access params.id directly

  if (!photo || !collection) {
    return (
      <div className="bg-black text-white pt-24 pb-20 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  const aspectRatioClass = {
    portrait: "aspect-[9/16]",
    landscape: "aspect-[16/9]",
    square: "aspect-square",
  }[photo.aspectRatio]

  return (
    <div className="bg-black text-white pt-24 pb-20">
      <div className="container px-4 mx-auto">
        <Link
          href={`/collections#${photo.collection}`}
          className="inline-flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {collection.name} Collection
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{photo.title}</h1>
          <p className="text-gray-300 mb-4">{photo.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative ${aspectRatioClass} rounded-lg overflow-hidden`}
          >
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-zoom-in relative w-full h-full">
                  <Image
                    src={getImageUrl(photo.url) || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="bg-black/50 text-white text-sm py-2 px-4 rounded-full backdrop-blur-sm">
                      Click to zoom
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[90vw] h-[90vh] p-0 border-none bg-transparent">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={getImageUrl(photo.url) || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-contain"
                  />
                  <DialogClose className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>

            {/* Share button */}
            <div className="absolute top-4 right-4">
              <ShareDialog
                title={photo.title}
                description={photo.description}
                image={getImageUrl(photo.url)}
                url={pageUrl}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex gap-4 text-sm text-gray-400 mb-6">
              <span>{formatDate(photo.date)}</span>
              <span>•</span>
              <span>{photo.location}</span>
              <span>•</span>
              <span>{collection.name}</span>
            </div>

            <div className="border-t border-zinc-800 pt-8">
              <h2 className="text-xl font-semibold mb-6">Details</h2>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <dt className="text-gray-400">Date</dt>
                <dd>{formatDate(photo.date)}</dd>
                <dt className="text-gray-400">Location</dt>
                <dd>{photo.location}</dd>
                <dt className="text-gray-400">Collection</dt>
                <dd>{collection.name}</dd>
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Related Photos */}
        {relatedPhotos.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x justify-center">
                {relatedPhotos.map((relatedPhoto, index) => {
                  const relatedAspectRatioClass = {
                    portrait: "aspect-[9/16]",
                    landscape: "aspect-[16/9]",
                    square: "aspect-square",
                  }[relatedPhoto.aspectRatio]

                  return (
                    <div key={relatedPhoto.id} className="min-w-[280px] snap-start">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`group relative overflow-hidden rounded-lg aspect-square`}
                      >
                        <Image
                          src={getImageUrl(relatedPhoto.url) || "/placeholder.svg"}
                          alt={relatedPhoto.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <h3 className="text-lg font-semibold">{relatedPhoto.title}</h3>
                        </div>
                        <Link href={`/photo/${relatedPhoto.id}`} className="absolute inset-0">
                          <span className="sr-only">View {relatedPhoto.title}</span>
                        </Link>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 z-10"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 z-10"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

