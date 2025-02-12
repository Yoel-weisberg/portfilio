import Image from "next/image";
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AboutMe() {
    const router = useRouter();
  return (
    <div id="about" className="relative w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/people2.jpg" // Make sure to place the image in /public
          alt="Background"
          fill
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/40"></div> {/* Dark overlay */}
      </div>

      {/* Content Section */}
      <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 50 }}  // Starts invisible and lower
          whileInView={{ opacity: 1, y: 0 }} // Animates to normal position
          transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
        >
      <div className="relative flex flex-col h-full text-white px-8 md:px-20 lg:px-32 z-10 gap-10 pt-36">
        <h1 className="text-6xl font-bold">About me</h1>
        <p className="max-w-2xl mt-4 text-lg leading-relaxed">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>


        {/* Contact Button */}
        <button className="mt-6 px-6 py-3 w-[200px] bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition"
              onClick={() => {
                router.push("/Gallary"); // Automatically go to Dashboard
              }}
        >
          View gallary
        </button>
      </div>
      </motion.div>

    </div>
  );
}
