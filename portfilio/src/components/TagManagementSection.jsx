import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const TagManagementSection = ({ tags, onTagCreate, onTagUpdate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [existingTag, setExistingTag] = useState(null);

  const checkExistingTag = (tagName) => {
    const existing = tags.find(tag => 
      tag.name.toLowerCase() === tagName.toLowerCase()
    );
    if (existing) {
      setExistingTag(existing);
      setDescription(existing.description);
    } else {
      setExistingTag(null);
    }
  };

  const handleSubmit = () => {
    const tagData = {
      name,
      description,
      thumbnail_src: thumbnail
    };

    if (existingTag) {
      onTagUpdate(existingTag.name, tagData);
    } else {
      onTagCreate(tagData);
    }

    setName('');
    setDescription('');
    setThumbnail(null);
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <Input
          placeholder="Tag name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            checkExistingTag(e.target.value);
          }}
        />
        <Input
          placeholder="Tag description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="space-y-2">
          <Input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
          <Button variant="outline" className="w-full">
            Choose from existing
          </Button>
        </div>
        <Button className="w-full" onClick={handleSubmit}>
          {existingTag ? 'Update Tag' : 'Create Tag'}
        </Button>
      </CardContent>
    </Card>
  );
};