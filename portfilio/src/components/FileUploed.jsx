"use client";

import { useState } from "react";

export default function UploadImages() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      setSelectedFiles(files);

      // Generate previews
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
  };

  // Upload images to the API
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setMessage("");

    try {
      const images = await Promise.all(
        selectedFiles.map(async (file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          return new Promise((resolve) => {
            reader.onloadend = () => {
              resolve({
                name: file.name,
                data: reader.result.split(",")[1], // Remove the data URL prefix
              });
            };
          });
        })
      );

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Uploaded ${data.length} image(s) successfully!`);
        setSelectedFiles([]);
        setPreviews([]);
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload Multiple Images</h2>

      <input type="file" accept="image/*" multiple onChange={handleFileChange} />

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {previews.map((src, index) => (
            <img key={index} src={src} alt="Preview" className="w-full rounded-md shadow" />
          ))}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
