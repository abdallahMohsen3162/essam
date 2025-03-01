import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-bank-account';
import { ImageGuard } from 'src/auth/image.guard';

@Controller('images')
export class ImageController {
  constructor(private readonly imgService: ImagesService) {}

  @Post()
  @UseGuards(ImageGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createImage( 
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateImageDto,
  ) {
    dto.userId = req.user.id;
    dto.image = file;
    return this.imgService.createImage(dto);
  }

  @Get()
  @UseGuards(ImageGuard)
  async getImages(@Req() req) {
    const user = req.user;
    return this.imgService.getImages(user.id);
  }
  @Delete(':id')
  @UseGuards(ImageGuard)
  async deleteImage(@Req() req,@Param('id') id: string) {
    console.log(req.user);
    
    return this.imgService.deleteImage(id, req.user.id);
  }
}
/*

https://res.cloudinary.com/dtvlutjpa/image/upload/v1740696700/uploads/ekzumksvnygfenw0pydt.avif

https://res.cloudinary.com/dtvlutjpa/image/upload/v1740696776/uploads/hhysseqv8i1srmxbp94p.avif

http://res.cloudinary.com/dtvlutjpa/image/upload/v1740834659/uploads/dtmoesrwx777emjgaje9.png

http://res.cloudinary.com/dtvlutjpa/image/upload/v1740834728/uploads/dkgeqivpzanfkizlaktk.png

*/