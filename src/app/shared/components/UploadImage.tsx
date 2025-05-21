import React, { useRef, useState, useEffect } from 'react';

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
    cover || '/assets/images/articles/article-travel.png'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cover && cover !== imagePreview) {
      setImagePreview(cover);
    }
  }, [cover]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      if (onChange) {
        onChange(file);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleChooseImage = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Cleanup URL.createObjectURL when component unmount
  useEffect(() => {
    return () => {
      if (imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <label className={`form-upload form-xl`}>
      <div className={`form-preview form-dashed ${className}`}>
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
        <span className="btn btn-primary" onClick={handleChooseImage}>
          Choose Image
        </span>
      </div>
    </label>
  );
};
