"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Facebook, Twitter, Mail, Copy, Check, X, Share2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface ShareDialogProps {
  title: string
  url?: string
  image?: string
  description?: string
  trigger?: React.ReactNode
}

export function ShareDialog({ title, url, image, description, trigger }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")
  const { toast } = useToast()

  // Set the current URL on the client side
  useEffect(() => {
    setCurrentUrl(url || window.location.href)
  }, [url])

  // Check if Web Share API is supported
  const isWebShareSupported = () => {
    return (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      typeof navigator.canShare === "function"
    )
  }

  // Handle native sharing if available
  const handleNativeShare = async (e) => {
    e.preventDefault() // Prevent default button behavior

    if (!isWebShareSupported()) {
      setOpen(true) // Open dialog if Web Share API is not supported
      return false
    }

    const shareData = {
      title,
      text: description || title,
      url: currentUrl,
    }

    // Check if the data can be shared
    if (!navigator.canShare(shareData)) {
      console.log("Content cannot be shared with Web Share API")
      setOpen(true) // Open dialog as fallback
      return false
    }

    try {
      await navigator.share(shareData)
      return true
    } catch (error) {
      // If sharing fails, open the dialog instead
      console.log("Sharing failed, falling back to dialog", error)
      setOpen(true)
      return false
    }
  }

  // Copy link to clipboard
  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          setCopied(true)
          toast({
            title: "Link copied",
            description: "The link has been copied to your clipboard",
          })

          setTimeout(() => {
            setCopied(false)
          }, 2000)
        })
        .catch((err) => {
          console.error("Failed to copy: ", err)
          // Fallback for clipboard API failure
          fallbackCopyToClipboard(currentUrl)
        })
    } else {
      // Fallback for browsers without clipboard API
      fallbackCopyToClipboard(currentUrl)
    }
  }

  // Fallback copy method using a temporary input element
  const fallbackCopyToClipboard = (text) => {
    try {
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)

      if (successful) {
        setCopied(true)
        toast({
          title: "Link copied",
          description: "The link has been copied to your clipboard",
        })

        setTimeout(() => {
          setCopied(false)
        }, 2000)
      }
    } catch (err) {
      console.error("Fallback copy failed: ", err)
      toast({
        title: "Copy failed",
        description: "Please select and copy the link manually",
        variant: "destructive",
      })
    }
  }

  // Share to specific platforms
  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  const shareByEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this photo: ${currentUrl}`)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
            onClick={handleNativeShare}
          >
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this photo</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        {image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img src={image || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={shareToFacebook}>
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={shareToTwitter}>
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={shareByEmail}>
              <Mail className="h-5 w-5" />
              <span className="sr-only">Share via Email</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span className="text-sm text-muted-foreground truncate max-w-[180px] sm:max-w-[300px]">
                  {currentUrl}
                </span>
                <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-8 w-8">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

