import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { getSignedUrl, uploadImageToS3 } from '@shared/services/image.service';
import { Button } from './partials';
import { TypeUpload } from '@shared/constants/type-image';

interface UploadImageProps {
  typeUpload: TypeUpload;
  onUploaded?: (url: string) => void;
}

export const UploadImage = ({ typeUpload, onUploaded }: UploadImageProps) => {
  const [imagePreview, setImagePreview] = useState<string>(
    '/assets/images/banner.png'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUpload, setIsUpload] = useState(false);

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

        if (onUploaded) {
          onUploaded(url);
        }
      } catch (error) {
        console.log(error);
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
