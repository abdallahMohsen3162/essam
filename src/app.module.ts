import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './image/images.module';
import { UploadModule } from './upload/upload.module';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI!), 
    UsersModule, 
    ImagesModule, 
    UploadModule,
    
  ],
})
export class AppModule {}
