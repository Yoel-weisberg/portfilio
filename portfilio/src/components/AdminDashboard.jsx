"use client"

import React, { useState, useEffect } from 'react';
import { PhotoUploadSection } from '@/components/PhotoUploadSection';
import { TagManagementSection } from '@/components/TagManagementSection';
import { PhotoAlbumSection } from '@/components/PhotoAlbumSection';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [photos, setPhotos] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [photosRes, tagsRes] = await Promise.all([
          fetch('/api/images'),
          fetch('/api/tags')
        ]);


        const photosData = await photosRes.json();
        const tagsData = await tagsRes.json();

        setPhotos(photosData);
        setTags(tagsData);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePhotoUpload = async (uploadData) => {
    try {
      const formData = new FormData();
      uploadData.files.forEach(file => {
        formData.append('files', file);
      });
      formData.append('alt', uploadData.alt);
      formData.append('tags', JSON.stringify(uploadData.tags));

      const response = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload photos');
      }

      const newPhotos = await response.json();
      setPhotos(prev => [...prev, ...newPhotos]);
      
      toast({
        title: 'Success',
        description: 'Photos uploaded successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload photos',
        variant: 'destructive'
      });
    }
  };

  const handleTagCreate = async (tagData) => {
    try {
      const response = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagData)
      });

      if (!response.ok) {
        throw new Error('Failed to create tag');
      }

      const newTag = await response.json();
      setTags(prev => [...prev, newTag]);
      
      toast({
        title: 'Success',
        description: 'Tag created successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create tag',
        variant: 'destructive'
      });
    }
  };

  const handleTagUpdate = async (oldName, tagData) => {
    try {
      const response = await fetch(`/api/admin/tags/${oldName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagData)
      });

      if (!response.ok) {
        throw new Error('Failed to update tag');
      }

      setTags(prev => prev.map(tag => 
        tag.name === oldName ? { ...tag, ...tagData } : tag
      ));
      
      toast({
        title: 'Success',
        description: 'Tag updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update tag',
        variant: 'destructive'
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
    try {
      const updatePromises = Array.from(selectedPhotos).map(photoId =>
        fetch(`/api/admin/images/${photoId}/tags`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tags: tagsToApply })
        })
      );

      await Promise.all(updatePromises);

      setPhotos(prev => prev.map(photo => {
        if (selectedPhotos.has(photo.id)) {
          return {
            ...photo,
            tags: [...new Set([...photo.tags, ...tagsToApply])]
          };
        }
        return photo;
      }));

      setSelectedPhotos(new Set());
      
      toast({
        title: 'Success',
        description: 'Tags applied successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to apply tags',
        variant: 'destructive'
      });
    }
  };

  const handleDeletePhotos = async () => {
    try {
      const deletePromises = Array.from(selectedPhotos).map(photoId =>
        fetch(`/api/admin/images/${photoId}`, {
          method: 'DELETE'
        })
      );

      await Promise.all(deletePromises);

      setPhotos(prev => prev.filter(photo => !selectedPhotos.has(photo.id)));
      setSelectedPhotos(new Set());
      
      toast({
        title: 'Success',
        description: 'Photos deleted successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete photos',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteTag = async (tagName) => {
    try {
      const response = await fetch(`/api/admin/tags/${tagName}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete tag');
      }

      setTags(prev => prev.filter(tag => tag.name !== tagName));
      
      // Update photos that had this tag
      setPhotos(prev => prev.map(photo => ({
        ...photo,
        tags: photo.tags.filter(tag => tag !== tagName)
      })));
      
      toast({
        title: 'Success',
        description: 'Tag deleted successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete tag',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex gap-4 p-6">
      <div className="w-1/3 space-y-6">
        <PhotoUploadSection 
          tags={tags} 
          onUpload={handlePhotoUpload} 
        />
        <TagManagementSection 
          tags={tags}
          onTagCreate={handleTagCreate}
          onTagUpdate={handleTagUpdate}
          onTagDelete={handleDeleteTag}
        />
      </div>
      <div className="w-2/3">
        <PhotoAlbumSection 
          photos={photos}
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