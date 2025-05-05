"use client"

import { useState, useEffect, useRef } from "react"
import NextImage from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Instagram, Mail, Twitter, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  getCollections,
  getFeaturedImages,
  getFirstImageFromCollection,
  type Collection,
  type Image as ImageType,
} from "@/lib/data"
import { getImageUrl } from "@/lib/image-utils"

// Define gradient colors for each collection
const collectionGradients = {
  landscape: "from-emerald-500 to-teal-500",
  portrait: "from-rose-500 to-pink-500",
  wildlife: "from-amber-500 to-yellow-500",
  architecture: "from-blue-500 to-indigo-500",
  street: "from-violet-500 to-purple-500",
  abstract: "from-red-500 to-orange-500",
  // Default gradient
  default: "from-primary to-primary-foreground",
}

export default function Home() {
  const containerRef = useRef(null)
  const featuredWorkRef = useRef<HTMLDivElement>(null)
  const [collections, setCollections] = useState<Collection[]>([])
  const [featuredImages, setFeaturedImages] = useState<ImageType[]>([])
  const [currentCollectionIndex, setCurrentCollectionIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Load collections and images on initial render
  useEffect(() => {
    const loadedCollections = getCollections()
    const loadedFeaturedImages = getFeaturedImages()

    setCollections(loadedCollections)
    setFeaturedImages(loadedFeaturedImages)
  }, [])

  // Change collection every 5 seconds
  useEffect(() => {
    if (collections.length === 0) return

    const interval = setInterval(() => {
      setIsChanging(true)
      setTimeout(() => {
        setCurrentCollectionIndex((prevIndex) => (prevIndex + 1) % collections.length)
        setIsChanging(false)
      }, 500) // Half a second for the transition
    }, 5000)

    return () => clearInterval(interval)
  }, [collections])

  // Check scroll position to update arrow visibility
  useEffect(() => {
    const checkScroll = () => {
      if (!featuredWorkRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = featuredWorkRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
    }

    const scrollContainer = featuredWorkRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll)
      // Initial check
      checkScroll()

      return () => scrollContainer.removeEventListener("scroll", checkScroll)
    }
  }, [featuredImages])

  // Scroll functions
  const scrollLeft = () => {
    if (!featuredWorkRef.current) return

    const scrollAmount = featuredWorkRef.current.clientWidth * 0.8
    featuredWorkRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    })
  }

  const scrollRight = () => {
    if (!featuredWorkRef.current) return

    const scrollAmount = featuredWorkRef.current.clientWidth * 0.8
    featuredWorkRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  // Get current collection and its first image
  const currentCollection = collections[currentCollectionIndex] || {
    id: "",
    name: "",
    description: "",
    featured: false,
    coverImage: "",
  }
  const currentImage = getFirstImageFromCollection(currentCollection.id)
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <motion.section
        ref={containerRef}
        className="min-h-screen relative flex items-center overflow-hidden"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0.5, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <NextImage
              src={getImageUrl("hero-background.jpg") || "/placeholder.svg"}
              alt="Photography background"
              fill
              className="object-cover opacity-30"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>

        <div className="container relative z-10 px-4 mx-auto py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ y }}
            >
              <span className="inline-block text-sm uppercase tracking-[0.2em] text-gray-300 font-light mb-4">
                Photography Portfolio
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Hey, I'm Yoel Weisberg
                <br />a{" "}
                <span className="relative inline-block">
                  <Link href={`/collections#${currentCollection.id}`}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentCollection.id}
                      className={`inline-block bg-gradient-to-r ${collectionGradients[currentCollection.id] || collectionGradients.default} bg-clip-text text-transparent`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {currentCollection.name?.toLowerCase()}
                    </motion.span>
                  </AnimatePresence>
                  </Link>
                </span>{" "}
                photographer
              </h1>

              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                {currentCollection.description || "Capturing moments that tell stories and evoke emotions."}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/collections">
                    View gallary <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/about">About Me</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className= {`relative rounded-lg aspect-square overflow-hidden shadow-2xl`}>
                <Link href={`/collections#${currentCollection.id}`} className="block relative w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCollection.id}
                      className="absolute inset-0 w-full h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <NextImage
                        src={getImageUrl(currentImage?.url || currentCollection.coverImage || "default-cover.jpg")}
                        alt={`${currentCollection.name} photography`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentCollection.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="text-lg font-semibold text-white">{currentCollection.name} Photography</p>
                        {currentImage && <p className="text-sm text-gray-300">{currentImage.title}</p>}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Work */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Work
          </motion.h2>

          <div className="relative">
            {/* Left Arrow */}
            <Button
              variant="outline"
              size="icon"
              className={`absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-opacity duration-300 w-8 h-8 md:w-10 md:h-10 ${
                canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            {/* Scrollable container */}
            <div
              ref={featuredWorkRef}
              className="flex overflow-x-auto pb-8 gap-3 md:gap-6 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
              style={{ scrollbarWidth: "none" }}
            >
              {featuredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg aspect-[5/5] min-w-[220px] sm:min-w-[260px] md:min-w-[300px] lg:min-w-[350px] snap-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <NextImage
                    src={getImageUrl(image.url)}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                    <div>
                      <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">{image.title}</h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        {image.collection} • {image.location}
                      </p>
                    </div>
                  </div>
                  <Link href={`/photo/${image.id}`} className="absolute inset-0">
                    <span className="sr-only">View {image.title}</span>
                  </Link>

                </motion.div>
              ))}
            </div>

            {/* Right Arrow */}
            <Button
              variant="outline"
              size="icon"
              className={`absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-opacity duration-300 w-8 h-8 md:w-10 md:h-10 ${
                canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            {/* Scroll indicator - only show on mobile */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 py-2 md:hidden">
              <div className="w-16 h-1 bg-gray-500 rounded-full opacity-50"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-16 h-1 bg-gray-500 rounded-full opacity-50"></div>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12 ">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/collections">
                View All Collections <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-zinc-900">
        <div className="container px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square rounded-lg overflow-hidden"
          >
            <NextImage
              src={getImageUrl("about-portrait.jpg")}
              alt="Photographer portrait"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-gray-300 mb-6">
              I'm a 17-year-old photographer passionate about capturing the beauty in everyday moments. My journey began
              when I received my first camera as a gift, and since then, I've been exploring the world through my lens.
            </p>
            <p className="text-gray-300 mb-8">
              My work focuses on finding unique perspectives and telling stories through imagery. I'm constantly
              learning and evolving my craft to bring fresh perspectives to my photography.
            </p>
            <Button asChild variant="outline" className="rounded-full ">
              <Link href="/about">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-zinc-900">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Interested in working together? Feel free to reach out.
            </p>
            <div className="flex justify-center gap-4 mb-8 ">
              <Button variant="outline" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Yoel Weisberg Photography. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/collections" className="text-gray-400 hover:text-white transition-colors">
                Collections
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
