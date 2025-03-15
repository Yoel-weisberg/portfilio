import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function saveImage(file, fileName) {
  const publicDir = path.join(process.cwd(), 'public', 'images');
  const filePath = path.join(publicDir, fileName);
  
  // Create thumbnail
  const thumbnailName = `thumb_${fileName}`;
  const thumbnailPath = path.join(publicDir, thumbnailName);
  
  // Ensure directory exists
  await fs.mkdir(publicDir, { recursive: true });
  
  // Save original file
  await fs.writeFile(filePath, file);
  
  // Generate and save thumbnail
  await sharp(filePath)
    .resize(300, 300, { fit: 'inside' })
    .toFile(thumbnailPath);
    
  // Get image dimensions
  const metadata = await sharp(filePath).metadata();
  
  return {
    src: `/Images/${fileName}`,
    thumbnail: `/Images/${thumbnailName}`,
    width: metadata.width,
    height: metadata.height
  };
}