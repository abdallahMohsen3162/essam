import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './image/images.module';
import { UploadModule } from './upload/upload.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI!), 
    UsersModule, 
    ImagesModule, 
    UploadModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 300000,

    })
    
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor, // Auto-cache all responses
     
    }
  ],
  exports: [CacheModule]
})
export class AppModule {}
