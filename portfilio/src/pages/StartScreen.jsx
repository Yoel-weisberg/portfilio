import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const SlideshowViewer = ({ slideshowData }) => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [categoryScroll, setCategoryScroll] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gridEnabled, setGridEnabled] = useState(true);

  const handleNextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % slideshowData[currentCategory].images.length
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slideshowData[currentCategory].images.length - 1 : prev - 1
    );
  };

  const handleScrollUp = () => {
    setCategoryScroll(Math.max(0, categoryScroll - 1));
  };

  const handleScrollDown = () => {
    setCategoryScroll(Math.min(slideshowData.length - 3, categoryScroll + 1));
  };

  // for keyword listening
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNextSlide();
      }
      if (event.key === "ArrowLeft") {
        handlePrevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const currentSlideData = slideshowData[currentCategory].images[currentSlide];

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Vertical Category Menu with Vertical Arrows */}
      <div className="absolute top-4 left-4 z-20 flex flex-col items-start">
        {/* Scroll Up Button */}
        {categoryScroll > 0 && (
          <button
            onClick={handleScrollUp}
            className="mb-1 text-white/50 hover:text-white self-center"
          >
            <ChevronUp />
          </button>
        )}

        {/* Category List */}
        <div className="flex flex-col space-y-2">
          {slideshowData
            .slice(categoryScroll, categoryScroll + 3)
            .map((category, index) => (
              <button
                key={category.name}
                onClick={() => setCurrentCategory(categoryScroll + index)}
                className={`text-white px-3 py-1 rounded transition-all duration-300 ${
                  currentCategory === categoryScroll + index
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                {category.name}
              </button>
            ))}
        </div>

        {/* Scroll Down Button */}
        {categoryScroll < slideshowData.length - 3 && (
          <button
            onClick={handleScrollDown}
            className="mt-1 text-white/50 hover:text-white self-center"
          >
            <ChevronDown />
          </button>
        )}
      </div>

      {/* Rest of the component remains unchanged */}
      {/* Slide Image - Full Screen */}
      <div className="absolute inset-0 flex items-center justify-center px-[10%] py-[5%]">
        <div className="relative w-full h-full">
          <img
            src={currentSlideData.src}
            alt={currentSlideData.src}
            className="w-full h-full object-cover rounded-[50px] border-[3px] border-white"
          />

          {/* Rule of Thirds Grid Overlay */}
          {gridEnabled && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <div
                className="absolute left-0 w-full h-px bg-white/50"
                style={{ top: "28%" }}
              ></div>
              <div
                className="absolute left-0 w-full h-px bg-white/50"
                style={{ top: "72%" }}
              ></div>
              <div
                className="absolute top-0 w-px h-full bg-white/50"
                style={{ left: "28%" }}
              ></div>
              <div
                className="absolute top-0 w-px h-full bg-white/50"
                style={{ left: "72%" }}
              ></div>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 group"
        >
          <ChevronLeft
            className="text-white/25 group-hover:text-white/100 group-hover:scale-110 transition-all"
            size={48}
          />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 group"
        >
          <ChevronRight
            className="text-white/25 group-hover:text-white/100 group-hover:scale-110 transition-all"
            size={48}
          />
        </button>
      </div>

      {/* Exit Button */}
      <div
        className="absolute top-4 right-4 z-20 cursor-pointer group"
        onClick={() => {
          /* Navigate to next page */
        }}
      >
        <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center group-hover:bg-white/50 transition-all">
          <X className="text-white" />
        </div>
      </div>

      {/* Slide Settings */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-row space-x-4">
        <div className="bg-white/30 backdrop-blur-md rounded-lg px-10 py-3">
          {currentSlideData.settings.shutterSpeed}
        </div>
        <div className="bg-white/30 backdrop-blur-md rounded-lg px-10 py-3">
          {currentSlideData.settings.aperture}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            className={`w-4 h-1 rounded-full transition-all ${
              dot === currentSlide ? "bg-white" : "bg-white/25"
            }`}
          />
        ))}
      </div>

      {/* Grid Toggle */}
      <button
        onClick={() => setGridEnabled(!gridEnabled)}
        className="absolute bottom-4 right-4 z-20"
      >
        <div
          className={`w-8 h-8 border border-white rounded flex items-center justify-center transition-all ${
            gridEnabled ? "bg-white/100" : "bg-white/25"
          }`}
        >
          <div className="w-4 h-4 border border-black grid grid-cols-2 grid-rows-2 gap-px">
            <div className="bg-black"></div>
            <div className="bg-black"></div>
            <div className="bg-black"></div>
            <div className="bg-black"></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default SlideshowViewer;
