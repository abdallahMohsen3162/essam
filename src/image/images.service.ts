import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateImageDto } from './dto/create-bank-account';
import { Image, ImageDocument } from './schema/bank-account-schema';
import { UploadService } from 'src/upload/upload.service';
import { paginate } from 'src/common/paginstion';
import { SearchImagesDto } from './dto/search-images.dto';
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

  async deleteImage(id: string, userId: string) {
    const img = await this.imageModal.findById(id);
    
    if (!img || `${img.userId}` !== userId) {
      throw new Error('Image not found');
    }
    // const imageUrl = img.imageUrl || "";
  
    // // First, attempt to delete the image from Cloudinary if an URL exists.
    // if (imageUrl) {
    //   console.log("url", imageUrl);
    //   try {
    //     await this.uploadService.deleteImage(imageUrl);
    //   } catch (error) {
    //     console.error("Cloudinary deletion failed:", error);
    //     // Optionally, decide how to handle the failure.
    //     throw new Error('Failed to delete image from Cloudinary');
    //   }
    // }
  
    // // Now, delete the image record from the database.
    await this.imageModal.findByIdAndDelete(id);
  
    return "Image deleted successfully";
  }
  

  async getImages(dto:SearchImagesDto) {
    console.log(dto);
    
  return paginate(
    this.imageModal,
    { userId: dto.userId },
    dto.page,
    dto.limit,
    { createdAt: -1 }
  );
    
  }
}
