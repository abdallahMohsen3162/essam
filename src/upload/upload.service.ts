import { Injectable, Inject } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Express } from 'express';

@Injectable()
export class UploadService {
  constructor(@Inject('CLOUDINARY') private cloudinary) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload_stream({ folder: 'uploads' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }).end(file.buffer);
    });
  }

  async deleteImage(imageUrl: string): Promise<any> {
    // Extract the public_id from the image URL
    const publicId = this.extractPublicIdFromUrl(imageUrl);

    
    if (!publicId) {
      throw new Error('Invalid Cloudinary image URL');
    }

    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  private extractPublicIdFromUrl(imageUrl: string): string | null {
    // This regex captures the public ID (including the folder) from the URL
    const regex = /\/image\/upload\/(?:v\d+\/)?(uploads\/[^\.]+)/;
    const matches = imageUrl.match(regex);
    return matches && matches[1] ? matches[1] : null;
  }
  
  
  
}