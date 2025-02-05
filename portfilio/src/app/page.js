"use client"
import Image from "next/image";
import catalogs from "./testData";
import SlideshowViewer from "@/pages/StartScreen";
export default function Home() {
  return (
    <SlideshowViewer slideshowData={catalogs}/>
  );
}
