"use client"

import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imagesRes, tagsRes] = await Promise.all([
          fetch("/api/images"),
          fetch("/api/tags"),
        ]);
        
        if (!imagesRes.ok || !tagsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        console.log(imagesRes, tagsRes);

        const imagesData = await imagesRes.json();
        const tagsData = await tagsRes.json();

        setImages(imagesData);
        setTags(tagsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ images, tags, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
