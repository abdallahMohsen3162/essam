import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user'; // Adjust the path as needed
import { UsersService } from './users.service'; // Adjust the path as needed
import { UsersController } from './users.controller'; // Adjust the path as needed
import { ImagesSchema } from 'src/image/schema/bank-account-schema';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "Image", schema: ImagesSchema }]),
    ConfigModule.forRoot(),
    
  ],
  providers: [UsersService],
  controllers: [UsersController], // Add this if you have a controller
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      AuthMiddleware
    ).forRoutes(
      { path: "users", method: RequestMethod.GET }
    )
  }
}