import collectionsData from "@/data/collections.json"
import imagesData from "@/data/images.json"

export type Collection = {
  id: string
  name: string
  description: string
  featured: boolean
  coverImage: string
}

export type Image = {
  id: string
  title: string
  description: string
  collection: string
  location: string
  date: string
  featured: boolean
  url: string
  price: number
}

// Get all collections
export function getCollections(): Collection[] {
  return collectionsData
}

// Get a specific collection by ID
export function getCollection(id: string): Collection | undefined {
  return collectionsData.find((collection) => collection.id === id)
}

// Get featured collections
export function getFeaturedCollections(): Collection[] {
  return collectionsData.filter((collection) => collection.featured)
}

// Get all images
export function getImages(): Image[] {
  return imagesData
}

// Get images by collection ID
export function getImagesByCollection(collectionId: string): Image[] {
  return imagesData.filter((image) => image.collection === collectionId)
}

// Get featured images
export function getFeaturedImages(): Image[] {
  return imagesData.filter((image) => image.featured)
}

// Get a specific image by ID
export function getImage(id: string): Image | undefined {
  return imagesData.find((image) => image.id === id)
}

// Get a random image from a collection
export function getRandomImageFromCollection(collectionId: string): Image | undefined {
  const collectionImages = getImagesByCollection(collectionId)
  if (collectionImages.length === 0) return undefined

  const randomIndex = Math.floor(Math.random() * collectionImages.length)
  return collectionImages[randomIndex]
}

// Get the first image from a collection
export function getFirstImageFromCollection(collectionId: string): Image | undefined {
  const collectionImages = getImagesByCollection(collectionId)
  return collectionImages.length > 0 ? collectionImages[0] : undefined
}

