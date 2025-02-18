"use client";

import React, { useState, useEffect } from "react";
import { PhotoUploadSection } from "@/components/PhotoUploadSection";
import { TagManagementSection } from "@/components/TagManagementSection";
import { PhotoAlbumSection } from "@/components/PhotoAlbumSection";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useData } from "@/app/context/DataContext";

const AdminDashboard = () => {
  const { images, tags, loading } = useData();
  const { toast } = useToast();
  const [selectedPhotos, setSelectedPhotos] = useState(new Set());

  const handlePhotoUpload = async (uploadData) => {
    try {
      const formData = new FormData();
      uploadData.files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("alt", uploadData.alt);
      formData.append("tags", JSON.stringify(uploadData.tags));

      const response = await fetch("/api/admin/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      const newPhotos = await response.json();
      setPhotos((prev) => [...prev, ...newPhotos]);

      toast({
        title: "Success",
        description: "images uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      });
    }
  };

  const handleTagCreate = async (tagData) => {
    try {
      const response = await fetch("/api/admin/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tagData),
      });

      if (!response.ok) {
        throw new Error("Failed to create tag");
      }

      const newTag = await response.json();
      setTags((prev) => [...prev, newTag]);

      toast({
        title: "Success",
        description: "Tag created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create tag",
        variant: "destructive",
      });
    }
  };

  const handleTagUpdate = async (oldName, tagData) => {
    try {
      const response = await fetch(`/api/admin/tags/${oldName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tagData),
      });

      if (!response.ok) {
        throw new Error("Failed to update tag");
      }

      setTags((prev) =>
        prev.map((tag) => (tag.name === oldName ? { ...tag, ...tagData } : tag))
      );

      toast({
        title: "Success",
        description: "Tag updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update tag",
        variant: "destructive",
      });
    }
  };

  const handlePhotoSelect = (photoId) => {
    const newSelection = new Set(selectedPhotos);
    if (newSelection.has(photoId)) {
      newSelection.delete(photoId);
    } else {
      newSelection.add(photoId);
    }
    setSelectedPhotos(newSelection);
  };

  const handleApplyTags = async (tagsToApply) => {
    const newTags = tagsToApply
      .map((name) => tags.find((tag) => tag.name === name)?.id)
      .filter((id) => id !== undefined); // Remove undefined values if a name doesn't exist
    const updatePromises = Array.from(selectedPhotos).map((photoId) =>
      fetch(`/api/admin/images/${photoId}/tags`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags: newTags }),
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(
              "Failed to apply tags for photo ID: " + photoId
            );
          }
          return response.json(); // Assuming the server returns JSON data
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error("Request failed:", error); // Handle request errors here
          throw new Error(error); // Rethrow to handle in the outer catch block
        })
    );

    await Promise.all(updatePromises);

    toast({
      title: "Tags added",
      description: `added ${tagsToApply} to ${selectedPhotos.size} photos`,
    });

  };

  const handleDeletePhotos = async () => {
    try {
      const deletePromises = Array.from(selectedPhotos).map((photoId) =>
        fetch(`/api/admin/images/${photoId}`, {
          method: "DELETE",
        })
      );

      await Promise.all(deletePromises);

      setPhotos((prev) =>
        prev.filter((photo) => !selectedPhotos.has(photo.id))
      );
      setSelectedPhotos(new Set());

      toast({
        title: "Success",
        description: "images deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete images",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTag = async (tagName) => {
    try {
      const response = await fetch(`/api/admin/tags/${tagName}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete tag");
      }

      setTags((prev) => prev.filter((tag) => tag.name !== tagName));

      // Update images that had this tag
      setPhotos((prev) =>
        prev.map((photo) => ({
          ...photo,
          tags: photo.tags.filter((tag) => tag !== tagName),
        }))
      );

      toast({
        title: "Success",
        description: "Tag deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete tag",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-6">
      <div className="w-1/3 space-y-6">
        <PhotoUploadSection tags={tags} onUpload={handlePhotoUpload} />
        <TagManagementSection
          tags={tags}
          onTagCreate={handleTagCreate}
          onTagUpdate={handleTagUpdate}
          onTagDelete={handleDeleteTag}
        />
      </div>
      <div className="w-2/3">
        <PhotoAlbumSection
          photos={images}
          tags={tags}
          selectedPhotos={selectedPhotos}
          onPhotoSelect={handlePhotoSelect}
          onApplyTags={handleApplyTags}
          onDeletePhotos={handleDeletePhotos}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
