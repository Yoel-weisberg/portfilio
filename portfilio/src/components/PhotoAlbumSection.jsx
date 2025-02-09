import React from 'react';
import PhotoAlbum from 'react-photo-album';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

export const PhotoAlbumSection = ({ 
  photos, 
  tags, 
  selectedPhotos, 
  onPhotoSelect,
  onApplyTags 
}) => {
  const renderPhoto = ({ photo, imageProps }) => (
    <div className="relative">
      <img 
        {...imageProps} 
        className={`rounded-lg ${selectedPhotos.has(photo.id) ? 'opacity-75' : ''}`} 
      />
      <div 
        className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 
          ${selectedPhotos.has(photo.id) ? 'bg-blue-500 border-white' : 'border-gray-300 bg-white'}`}
        onClick={(e) => {
          e.preventDefault();
          onPhotoSelect(photo.id);
        }}
      />
    </div>
  );

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <span>{selectedPhotos.size} photos selected</span>
        {selectedPhotos.size > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Apply Tags</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {tags.map(tag => (
                <DropdownMenuCheckboxItem
                  key={tag.name}
                  checked={false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onApplyTags([tag.name]);
                    }
                  }}
                >
                  {tag.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <PhotoAlbum
        layout="rows"
        photos={photos}
        renderPhoto={renderPhoto}
        onClick={(event) => event.preventDefault()}
      />
    </div>
  );
};
