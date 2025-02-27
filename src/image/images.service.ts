import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateImageDto } from './dto/create-bank-account';
import { Image, ImageDocument } from './schema/bank-account-schema';
import { UploadService } from 'src/upload/upload.service';
// import { UploadService } from 'src/upload/upload.service';



@Injectable()
export class ImagesService {
  constructor(
    private readonly uploadService: UploadService,
    @InjectModel("Image") private readonly imageModal: Model<ImageDocument>
  
) {}

  async createImage(dto: CreateImageDto) {
    const uploadedImage = await this.uploadService.uploadImage(dto.image);
    console.log(uploadedImage);
    const url = uploadedImage.url;
    dto.imageUrl = url;

    try {
      const img = new this.imageModal(dto);
      return await img.save();
    } catch (error) {
      console.log(error.message);
      
      return error;
      throw new Error(`Failed to create bank account: ${error.message}`);
    }
  }

  async getImages() {
    return this.imageModal.find();
  }
}
