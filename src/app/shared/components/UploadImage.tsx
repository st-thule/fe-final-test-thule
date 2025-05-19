import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { TypeUpload } from '@shared/constants/type-image';
import { ImageService } from '@shared/services/image.service';
import { Button } from './partials';

interface UploadImageProps {
  className?: string;
  cover?: string;
  onChange?: (file: File) => void;
}

export const UploadImage = ({
  className,
  cover,
  onChange,
}: UploadImageProps) => {
  const [imagePreview, setImagePreview] = useState<string>(
    cover || '/assets/images/banner.png'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cover && cover !== 'cover') {
      setImagePreview(cover);
    }
  }, [cover]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      if (onChange) {
        onChange(file);
      }
    }
  };

  return (
    <label className="form-upload form-xl">
      <div className="form-preview form-dashed">
        <img src={imagePreview} alt="Preview" className="" />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="form-action">
        <span
          className="btn btn-primary"
          onClick={() => fileInputRef.current?.click()}
        >
          Choose Image
        </span>
      </div>
    </label>
  );
};
