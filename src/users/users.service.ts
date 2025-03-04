import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'
import { CreateUserDto } from './dto/create-user-dto';
import { User, UserDocument, UserSchema } from './entities/user';
import { UploadService } from 'src/upload/upload.service';
import { LoginUserDto } from './dto/auth-user-dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { SearchUsersDto } from './dto/search-users-dto';
import { paginate } from 'src/common/paginstion';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ,
    private readonly config: ConfigService

  ) {}

  async createUser(dto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel({ name: dto.name, email: dto.email, password: dto.password });
    await user.save();
    return user;
  }

  async getAllUsers(query: SearchUsersDto): Promise<UserDocument[]> {

    for(let i = 0; i < 10000; i++) {
      console.log("i = ", i);
      
      const password = Math.random().toString(36).substring(2, 10);
      const email = `user-${i}${Math.floor(Math.random() * 1000)}@example.com`;
      const name = `User ${Math.floor(Math.random() * 1000)}`;
      const user = await this.createUser({name, email, password});
    }

    return paginate(
      this.userModel,{name: query.userName}, 
      query.page, 
      query.limit
    );
  }

  async login(dto:LoginUserDto): Promise<any> {
    console.log(dto);
    
    const user = await this.userModel.findOne({ email: dto.email }).exec();
    if(!user) {
      throw new Error('User not found');
    };
    
    if(dto.password !== user.password) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ 
      email: user.email, 
      id: user._id,
      arr:[1,2,3]
     }, this.config.get('JWT_SECRET')!);
    
    
    return {user, token};
  }

  async register(dto:CreateUserDto):Promise<any>{
    const user = new this.userModel(dto);
    const createdUser = await user.save();
    const token = jwt.sign({ email: createdUser.email, id: createdUser._id }, this.config.get('JWT_SECRET')!);

    return {user, token};  
  }

  async getProfile(id:string) {
    const user = await this.userModel.findById(id).exec();

    return user;
  }


  async editProfile(id: string, dto: Partial<CreateUserDto>) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, dto);
    await user.save();
    return user;
  }
}
