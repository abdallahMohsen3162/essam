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
import { Observable } from 'rxjs';
import { Response } from 'express';
import { AuthConstants } from 'src/common/AuthConstants';




@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly config: ConfigService,

  ) {}

  async createUser(dto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel({ name: dto.name, email: dto.email, password: dto.password });
    await user.save();
    return user;
  }

  async getAllUsers(query: SearchUsersDto): Promise<any> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;
    const filter = {};
    for(const key in query){
      if(query[key] && key !== 'page' && key !== 'limit'){
        filter[key] = query[key];
      }
    }
    const numOfPages = Math.ceil(await this.userModel.countDocuments(filter) / limit);
    const currentPage = page > numOfPages ? numOfPages : page;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < numOfPages ? currentPage + 1 : null;
    const pagination = {
      count: await this.userModel.countDocuments(filter),
      currentPage,
      numOfPages,
      prevPage,
      nextPage
    }
    const projection = {name : true, _id: true, email: true};
    // console.log(this.userModel.find());
    return {pagination,
      data: await this.userModel.find(filter, projection).skip(skip).limit(limit).exec()};
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
      claims:[
        AuthConstants.Users.CREATE,
        AuthConstants.Users.GET
      ]
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

  async sse(res: Response): Promise<any> {
  
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      res.write(`data: Counter = ${counter}\n\n`);

      if (counter >= 5) {
        clearInterval(interval);
        res.write(`data: Final Response\n\n`);
        res.end();
      }
    }, 1000);

    return ''
  }


}
