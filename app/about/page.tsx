"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Camera, Clock, Instagram, Mail, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getImageUrl } from "@/lib/image-utils"

export default function AboutPage() {
  return (
    <div className="bg-black text-white pt-24 pb-20">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
            <p className="text-gray-300 mb-6">
              I'm a 17-year-old photographer with a passion for capturing the beauty in everyday moments. My journey
              began when I received my first camera as a gift, and since then, I've been exploring the world through my
              lens.
            </p>
            <p className="text-gray-300 mb-6">
              My work focuses on finding unique perspectives and telling stories through imagery. I'm constantly
              learning and evolving my craft to bring fresh perspectives to my photography.
            </p>
            <p className="text-gray-300 mb-8">
              When I'm not behind the camera, I'm usually exploring new locations, studying the work of photographers I
              admire, or experimenting with different techniques to expand my creative toolkit.
            </p>
            <div className="flex gap-4 text-black">
              <Button asChild variant="outline" size="icon" className="rounded-full">
                <Link href="https://instagram.com">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon" className="rounded-full">
                <Link href="https://twitter.com">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon" className="rounded-full">
                <Link href="mailto:contact@example.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square rounded-lg overflow-hidden"
          >
            <Image
              src="/AboutMe-1.jpg"
              alt="Photographer portrait"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        <Separator className="my-16" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Approach</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            I believe that photography is about more than just taking pictures—it's about telling stories and capturing
            emotions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-zinc-900 p-6 rounded-lg"
          >
            <Camera className="h-10 w-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-3">Vision</h3>
            <p className="text-gray-300">
              I strive to see beyond the obvious and find unique perspectives that tell compelling stories through my
              images.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900 p-6 rounded-lg"
          >
            <Clock className="h-10 w-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-3">Patience</h3>
            <p className="text-gray-300">
              Great photography often requires waiting for the perfect moment. I take my time to ensure I capture the
              scene at its best.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-zinc-900 p-6 rounded-lg"
          >
            <ArrowRight className="h-10 w-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-3">Growth</h3>
            <p className="text-gray-300">
              I'm constantly learning and evolving my craft, experimenting with new techniques and approaches to
              photography.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl font-bold mb-6">My Equipment</h2>
            <p className="text-gray-300 mb-6">
              While I believe that the photographer's eye is more important than the gear, having reliable equipment
              helps me achieve my creative vision.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-full mr-4 mt-1">
                  <Camera className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Primary Camera</h3>
                  <p className="text-gray-400">DJI Mini 3  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-full mr-4 mt-1">
                  <Camera className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Secondary Camera</h3>
                  <p className="text-gray-400">Sony Alpha a7 III</p>
                </div>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 order-1 lg:order-2"
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src={getImageUrl("equipment.jpg") || "/placeholder.svg"}
                alt="Photography equipment"
                width={600}
                height={800}
                className="object-cover h-full w-full"
              />
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Interested in working together? I'd love to hear from you.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

