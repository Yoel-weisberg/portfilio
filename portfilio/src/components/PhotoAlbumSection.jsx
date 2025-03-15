import React from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import SelectIcon from "./SelectIcon";
import { useState } from "react";

export const PhotoAlbumSection = ({
  photos,
  tags,
  selectedPhotos,
  onPhotoSelect,
  onApplyTags,
  onDeletePhotos,
}) => {
  const [selectionPhotos, setSelectionPhotos] = useState(() =>
    photos.map((photo) => ({
      ...photo,
      href: photo.src,
      label: "Open image in a lightbox",
    }))
  );

  const [lightboxPhoto, setLightboxPhoto] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [tempSelectedTags, setTempSelectedTags] = useState([]); // Temporary selection before save
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    setSelectedTags(tempSelectedTags); // Save selected tags
    onApplyTags(tempSelectedTags); // Apply the selection
    setOpen(false); // Close dropdown
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium dark:text-white">
          {selectedPhotos.size} photo{selectedPhotos.size !== 1 ? "s" : ""}{" "}
          selected
        </span>
        <div className="flex gap-2">
          {selectedPhotos.size > 0 && (
            <>
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary">Apply Tags</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {tags.map((tag) => {
                    const isChecked = tempSelectedTags.includes(tag.name);

                    return (
                      <DropdownMenuCheckboxItem
                        key={tag.name}
                        checked={isChecked}
                        onSelect={(e) => e.preventDefault()} // Keep menu open
                        onCheckedChange={(checked) => {
                          setTempSelectedTags(
                            (prev) =>
                              checked
                                ? [...prev, tag.name] // Add if checked
                                : prev.filter((t) => t !== tag.name) // Remove if unchecked
                          );
                        }}
                      >
                        {tag.name}
                      </DropdownMenuCheckboxItem>
                    );
                  })}

                  {/* Save Button at the Bottom */}
                  <DropdownMenuItem
                    onClick={handleSave}
                    className="justify-center font-semibold"
                  >
                    ✅ Save
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="destructive" onClick={onDeletePhotos}>
                Delete Selected
              </Button>
            </>
          )}
        </div>
      </div>

      <RowsPhotoAlbum
        photos={selectionPhotos}
        targetRowHeight={150}
        // custom render functions
        render={{
          // Custom render for selection icon
          extras: (_, { photo, index }) => (
            <SelectIcon
              selected={photo.selected}
              onClick={(event) => {
                onPhotoSelect(photo.id);
                setSelectionPhotos((prevPhotos) =>
                  prevPhotos.map((photo, i) =>
                    i === index
                      ? { ...photo, selected: !photo.selected }
                      : photo
                  )
                );

                // Prevent event propagation
                event.preventDefault();
                event.stopPropagation();
              }}
            />
          ),
        }}
        // custom components' props
        componentsProps={{
          link: ({ photo: { href } }) =>
            // add target="_blank" and rel="noreferrer noopener" to external links
            href?.startsWith("http")
              ? { target: "_blank", rel: "noreferrer noopener" }
              : undefined,
        }}
        // on click callback
        onClick={({ event, photo }) => {
          // let a link open in a new tab / new window / download
          if (event.shiftKey || event.altKey || event.metaKey) return;

          // prevent the default link behavior
          event.preventDefault();

          // open photo in a lightbox
          setLightboxPhoto(photo);
        }}
        // describe photo album size in different viewports
        sizes={{
          size: "1168px",
          sizes: [
            { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
          ],
        }}
        // re-calculate the layout only at specific breakpoints
        breakpoints={[220, 360, 480, 600, 900, 1200]}
      />
      <Lightbox
        open={Boolean(lightboxPhoto)}
        close={() => setLightboxPhoto(undefined)}
        slides={lightboxPhoto ? [lightboxPhoto] : undefined}
        carousel={{ finite: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .8)" } }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullUp: true,
          closeOnPullDown: true,
        }}
      />
    </div>
  );
};

export default PhotoAlbumSection;
