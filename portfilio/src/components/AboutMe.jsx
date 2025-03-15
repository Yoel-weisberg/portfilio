import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AboutMe() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const eyeIconRef = useRef(null);
  
  // Effect to scale the icon when text is hovered
  useEffect(() => {
    if (eyeIconRef.current) {
      if (isTextHovered) {
        eyeIconRef.current.classList.add('scale-125');
      } else {
        eyeIconRef.current.classList.remove('scale-125');
      }
    }
  }, [isTextHovered]);
  
  return (
    <div
      id="about"
      className="relative w-11/12 mx-auto h-screen max-sm:h-96"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <Image
          src="/people2.jpg"
          alt="Background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="z-0 opacity-100"
          priority
        />
      </div>

      {/* Toggle Icon - Now in bottom right with 75% opacity */}
      <div 
        ref={eyeIconRef}
        className={`absolute bottom-10 right-10 z-20 cursor-pointer transition-all duration-300 ${isHovering ? 'scale-110' : ''}`}
        onClick={() => setShowContent(!showContent)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        title="Toggle content visibility"
      >
        {showContent ? (
          <Eye 
            size={28} 
            className={`text-black opacity-100 ${isHovering || isTextHovered ? 'filter drop-shadow-lg shadow-white' : ''}`} 
          />
        ) : (
          <EyeOff 
            size={28} 
            className={`text-black ${isHovering || isTextHovered ? 'filter drop-shadow-lg shadow-white' : ''}`} 
          />
        )}
      </div>

      {/* Content Section */}
      {showContent && (
        <motion.div
          className="max-w-[%] max-sm:max-w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative flex flex-col h-full text-white px-8 md:px-20 lg:px-32 z-10 gap-10 pt-36 max-sm:pt-20">
            <h1 className="text-6xl max-sm:text-3xl font-bold">About me</h1>
            
            <p className="max-w-2xl mt-4 max-sm:-mt-7 text-lg max-sm:text-xs leading-relaxed">
              Here there is usually a brief explanation about me. But since I think
              1 photo is equal 1000 words I'll just let you enjoy this photo I took
              at Sarasota Beach USA. 
              <span 
                className="underline cursor-pointer hover:text-yellow-200 transition-colors"
                onMouseEnter={() => setIsTextHovered(true)}
                onMouseLeave={() => setIsTextHovered(false)}
                onClick={() => setShowContent(false)}
              >
                BTW if you would like to see only the photo without the fuzz around. just click on the eye icon in the bottom right
              </span>
            </p>

            {/* Contact Button */}
            <button
              className="mt-6 max-sm:-mt-4 px-6 max-sm:px-3 py-3 w-[200px] max-sm:w-[100px] bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition max-sm:text-xs"
              onClick={() => {
                router.push("/Gallary");
              }}
            >
              View gallery
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}