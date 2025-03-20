// Helper function to get the full URL for an image
export function getImageUrl(path: string): string {
  // If the path is already a full URL, return it as is
  if (path.startsWith("http")) {
    return path
  }

  // If it's a placeholder, return it as is
  if (path.startsWith("/placeholder.svg")) {
    return path
  }

  // If it starts with a slash, remove it
  const cleanPath = path.startsWith("/") ? path.substring(1) : path

  // Return the full URL with the static prefix
  return `https://static.yoelweisberg.com/portfilioio-images/${cleanPath}`
}

// Helper function to format a date string
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

