import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const PhotoUploadSection = ({ tags, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [alt, setAlt] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const filterTags = (searchText) => {
    return tags.filter(tag => 
      tag.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleUpload = () => {
    onUpload({ files, alt, tags: selectedTags });
    setFiles([]);
    setAlt('');
    setSelectedTags([]);
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <Input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="mb-4"
        />
        <Input
          placeholder="Alt text for photos"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />
        <div className="space-y-2">
          <Input
            placeholder="Search tags..."
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {filterTags(tagSearch).map(tag => (
              <Button
                key={tag.name}
                variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                onClick={() => {
                  const newTags = selectedTags.includes(tag.name)
                    ? selectedTags.filter(t => t !== tag.name)
                    : [...selectedTags, tag.name];
                  setSelectedTags(newTags);
                }}
              >
                {tag.name}
              </Button>
            ))}
          </div>
        </div>
        <Button className="w-full" onClick={handleUpload}>
          Upload Photos
        </Button>
      </CardContent>
    </Card>
  );
};