"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Filter, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function StorePage() {
  const [sortBy, setSortBy] = useState("featured")
  const [filters, setFilters] = useState({
    collections: [],
    sizes: [],
    priceRanges: [],
  })

  // Collapsible states
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)
  const [isSizeOpen, setIsSizeOpen] = useState(true)
  const [isSortOpen, setIsSortOpen] = useState(true)

  // This would normally come from a database or API
  const prints = [
    { id: 1, title: "Mountain Vista", price: 79.99, collection: "Nature", featured: true },
    { id: 2, title: "City Lights", price: 99.99, collection: "Urban", featured: true },
    { id: 3, title: "Ocean Sunset", price: 79.99, collection: "Nature", featured: false },
    { id: 4, title: "Street Life", price: 129.99, collection: "Urban", featured: false },
    { id: 5, title: "Portrait Study", price: 149.99, collection: "Portrait", featured: true },
    { id: 6, title: "Ancient Architecture", price: 99.99, collection: "Travel", featured: false },
    { id: 7, title: "Forest Path", price: 79.99, collection: "Nature", featured: false },
    { id: 8, title: "Urban Geometry", price: 129.99, collection: "Urban", featured: false },
    { id: 9, title: "Candid Portrait", price: 149.99, collection: "Portrait", featured: false },
    { id: 10, title: "Desert Journey", price: 99.99, collection: "Travel", featured: true },
    { id: 11, title: "Mountain Lake", price: 79.99, collection: "Nature", featured: false },
    { id: 12, title: "City Skyline", price: 129.99, collection: "Urban", featured: false },
  ]

  // Sort prints based on selected option
  const sortedPrints = [...prints].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return b.featured - a.featured
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      default:
        return 0
    }
  })

  return (
    <div className="bg-black text-white pt-24 pb-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Print Store</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Take home a piece of art. Each print is carefully produced using premium materials to ensure the highest
            quality.
          </p>
        </motion.div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filters & Sorting
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters & Sorting</SheetTitle>
                <SheetDescription>Narrow down your print selection</SheetDescription>
              </SheetHeader>
              <div className="grid gap-6 py-4">
                <div>
                  <h3 className="font-medium mb-3">Sort By</h3>
                  <RadioGroup defaultValue="featured" className="grid gap-2" onValueChange={setSortBy}>
                    <Label className="flex items-center gap-2 font-normal cursor-pointer">
                      <RadioGroupItem value="featured" />
                      Featured
                    </Label>
                    <Label className="flex items-center gap-2 font-normal cursor-pointer">
                      <RadioGroupItem value="price-low" />
                      Price: Low to High
                    </Label>
                    <Label className="flex items-center gap-2 font-normal cursor-pointer">
                      <RadioGroupItem value="price-high" />
                      Price: High to Low
                    </Label>
                  </RadioGroup>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-3">Collections</h3>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Nature
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Urban
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Portrait
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Travel
                    </Label>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Under $50
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      $50 - $100
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      $100 - $150
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Over $150
                    </Label>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-3">Print Size</h3>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      5" × 7"
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      8" × 10"
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      11" × 14"
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      16" × 20"
                    </Label>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block">
            <div className="sticky top-24 bg-zinc-900 rounded-lg p-6">
              <Collapsible open={isSortOpen} onOpenChange={setIsSortOpen} className="mb-6">
                <CollapsibleTrigger className="flex w-full items-center justify-between font-medium text-lg mb-3">
                  Sort By
                  {isSortOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <RadioGroup defaultValue="featured" className="grid gap-2" onValueChange={setSortBy}>
                    <Label className="flex items-center gap-2 font-normal cursor-pointer">
                      <RadioGroupItem value="featured" />
                      Featured
                    </Label>
                    <Label className="flex items-center gap-2 font-normal cursor-pointer">
                      <RadioGroupItem value="price-low" />
                      Price: Low to High
                    </Label>
                    <Label className="flex items-center gap-2 font-normal cursor-pointer">
                      <RadioGroupItem value="price-high" />
                      Price: High to Low
                    </Label>
                  </RadioGroup>
                </CollapsibleContent>
              </Collapsible>

              <Separator className="my-6" />

              <Collapsible open={isCollectionsOpen} onOpenChange={setIsCollectionsOpen} className="mb-6">
                <CollapsibleTrigger className="flex w-full items-center justify-between font-medium text-lg mb-3">
                  Collections
                  {isCollectionsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Nature
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Urban
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Portrait
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Travel
                    </Label>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Separator className="my-6" />

              <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen} className="mb-6">
                <CollapsibleTrigger className="flex w-full items-center justify-between font-medium text-lg mb-3">
                  Price Range
                  {isPriceOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Under $50
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      $50 - $100
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      $100 - $150
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      Over $150
                    </Label>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Separator className="my-6" />

              <Collapsible open={isSizeOpen} onOpenChange={setIsSizeOpen}>
                <CollapsibleTrigger className="flex w-full items-center justify-between font-medium text-lg mb-3">
                  Print Size
                  {isSizeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      5" × 7"
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      8" × 10"
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      11" × 14"
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      16" × 20"
                    </Label>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPrints.map((print, index) => (
              <motion.div
                key={print.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={`/placeholder.svg?height=800&width=600&text=${print.title}`}
                    alt={print.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {print.featured && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-medium py-1 px-2 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-1">{print.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{print.collection}</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">${print.price}</p>
                  <Button size="sm" variant="outline" className="rounded-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

