import { ApiService } from '@app/core/services/api.service';
import { ENDPOINT } from '@config/endpoint';

export class ImageService {
  apiService = new ApiService();

  getSignedUrl = async (
    type_upload: string,
    file_name: string,
    file_type: string
  ): Promise<{ signedRequest: string; url: string }> => {
    try {
      const response = await this.apiService.get<{
        signedRequest: string;
        url: string;
      }>([
        `${ENDPOINT.signatures.uploadImage}?type_upload=${type_upload}&file_name=${file_name}&file_type=${file_type}`,
      ]);

      return response;
    } catch (error) {
      throw error;
    }
  };

  uploadImageToS3 = async (signedUrl: string, file: File) => {
    try {
      const response = await this.apiService.put([signedUrl], file, {
        headers: {
          'Content-Type': file.type,
          Authorization: '',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}
