import React, { useRef, useState } from 'react';

import { Button, Input } from './partials';

export const UploadImage = () => {
  const [imagePreview, setImagePreview] = useState<string>(
    '/assets/images/banner.png'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="form form-upload form-xl gap-4">
      <div className="form-preview form-dashed">
        <img src={'/assets/images/banner.png'} alt="Preview" />
      </div>
      <Input type="file" ref={fileInputRef} onChange={handleFileChange} />

      <div className="form-action">
        <Button
          className="btn btn-primary"
          label="Upload"
          onClick={handleUploadClick}
        />
      </div>
    </div>
  );
};
