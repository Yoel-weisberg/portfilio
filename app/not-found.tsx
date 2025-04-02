"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Camera, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  // Ensure animations run after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0zMCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6TTI0IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')]" />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

      <div className="container px-4 z-10 max-w-4xl">
        <div className="flex flex-col items-center text-center">
          {/* Camera shutter animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2,
            }}
            className="relative mb-8"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-zinc-900 flex items-center justify-center">
              <Camera className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={1.5} />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-2 -right-2 bg-primary text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center"
            >
              404
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Shot Not Found</h1>
            <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto">
              Looks like this frame is empty. The photo you're looking for might have been moved, deleted, or never
              existed.
            </p>
          </motion.div>

          {/* Film strip with "missing" photos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative w-full max-w-2xl h-24 md:h-32 mb-12 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-4 bg-zinc-800 flex justify-between px-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 h-4 bg-zinc-700" />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-zinc-800 flex justify-between px-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 h-4 bg-zinc-700" />
              ))}
            </div>
            <div className="absolute inset-4 flex space-x-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex-1 bg-zinc-800 rounded relative overflow-hidden">
                  {num === 3 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-zinc-700">?</div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-zinc-900/50 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-zinc-700 rounded-full flex items-center justify-center">
                        <X className="w-4 h-4 text-zinc-700" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="rounded-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/collections">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Collections
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated floating camera elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              y: [null, "-100%"],
              opacity: [0, 0.3, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
              ease: "linear",
            }}
            className="absolute"
          >
            <div className="text-zinc-800 opacity-20">
              {i % 2 === 0 ? (
                <Camera size={20 + i * 10} />
              ) : (
                <div className={`w-${8 + i * 2} h-${8 + i * 2} rounded-lg border-2 border-zinc-800`} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// X icon component for the film strip
function X(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

