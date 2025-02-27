import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'
import { CreateUserDto } from './dto/create-user-dto';
import { User, UserDocument } from './entities/user';
import { UploadService } from 'src/upload/upload.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    

  ) {}

  async createUser(dto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel({ name: dto.name, email: dto.email });
    await user.save();
    return user;
  }

  async getAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }


}
