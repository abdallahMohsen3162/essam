import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-bank-account';

@Controller('images')
export class ImageController {
  constructor(private readonly imgService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createImage( 
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateImageDto,
  ) {
    // Assign the file to the DTO
    dto.image = file;
    return this.imgService.createImage(dto);
  }

  @Get()
  async getImages() {
    return this.imgService.getImages();
  }
}
/*

https://res.cloudinary.com/dtvlutjpa/image/upload/v1740696700/uploads/ekzumksvnygfenw0pydt.avif

https://res.cloudinary.com/dtvlutjpa/image/upload/v1740696776/uploads/hhysseqv8i1srmxbp94p.avif

*/