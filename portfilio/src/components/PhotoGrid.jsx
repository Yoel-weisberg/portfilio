"use client";

import React from "react";
import Image from "next/image";
import NextJsImage from "@/components/RenderNextImageForLightBox";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import {
    RowsPhotoAlbum,
  } from "react-photo-album";
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { motion } from "framer-motion";
function renderNextImage({ alt = "", title, sizes }, { photo, width, height }) {
  return (
    <motion.div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
      />
    </motion.div>
  );
}

const PhotoGrid = ({ images }) => {
    const [index, setIndex] = React.useState(-1);
    
  return (
    <div>
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }} // Starts invisible and lower
        whileInView={{ opacity: 1, y: 0 }} // Animates to normal position
        transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
      >
        <RowsPhotoAlbum
          photos={images}
          onClick={({ index: current }) => setIndex(current)}
          render={{ image: renderNextImage }}
          defaultContainerWidth={1200}
          sizes={{
            size: "1168px",
            sizes: [
              { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
            ],
          }}
        />{" "}
      </motion.div>

      <Lightbox
        index={index}
        slides={images}
        open={index >= 0}
        close={() => setIndex(-1)}
        render={{ slide: NextJsImage }}
        plugins={[Thumbnails]}
        thumbnails={{
          vignette: true,
        }}
      />
    </div>
  );
};

export default PhotoGrid;