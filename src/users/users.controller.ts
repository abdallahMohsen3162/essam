import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create a new user with a bank account
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }


  // Get all users
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }



}
