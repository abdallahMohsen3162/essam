import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user';
import { ImageController } from './images.controller';
import { Image, ImagesSchema } from './schema/bank-account-schema';
import { ImagesService } from './images.service';
import { UploadService } from 'src/upload/upload.service';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: "Image", schema: ImagesSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UploadModule
  ],
  providers: [ImagesService],
  controllers: [ImageController],
})
export class ImagesModule { }