import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { TypeUpload } from '@shared/constants/type-image';
import { getSignedUrl, uploadImageToS3 } from '@shared/services/image.service';
import { Button } from './partials';

interface UploadImageProps {
  typeUpload: TypeUpload;
  cover?: string;
  onUploaded?: (url: string) => void;
}

export const UploadImage = ({
  typeUpload,
  cover,
  onUploaded,
}: UploadImageProps) => {
  const [imagePreview, setImagePreview] = useState<string>(
    cover || '/assets/images/banner.png'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUpload, setIsUpload] = useState(false);

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
    }
  };

  const handleUploadClick = async () => {
    if (fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0];
      setIsUpload(true);

      try {
        const { signedRequest, url } = await getSignedUrl(
          typeUpload,
          file.name,
          file.type
        );
        await uploadImageToS3(signedRequest, file);
        toast.success('Upload successfully');
        // Update preview with uploaded image URL
        setImagePreview(url);
        if (onUploaded) {
          onUploaded(url);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="form-upload form-xl gap-4">
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
        <Button
          className="btn btn-primary"
          label="Upload"
          onClick={handleUploadClick}
        />
      </div>
    </div>
  );
};
