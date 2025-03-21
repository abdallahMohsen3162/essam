import { Controller, Get, Post, Body, Param, Req, UseGuards, Patch, Query, Res, UsePipes, ValidationPipe, UseInterceptors, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { ImageGuard } from 'src/auth/image.guard';
import { PaginationQueryParams } from 'src/common/types';
import { SearchUsersDto } from './dto/search-users-dto';
import { AuthGuard } from 'src/auth/AuthGuard/Auth.guard';
import { Roles } from 'src/decorators/roles';
import { Response } from 'express';
import { AuthConstants } from 'src/common/AuthConstants';
import { EmailPipePipe } from 'src/pipes/email-pipe/email-pipe.pipe';
import { CACHE_MANAGER, CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  // Create a new user with a bank account
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }


  // Get all users
  
  @Get()
  @UseGuards(AuthGuard)
  // @Roles(AuthConstants.Users.GET)
  @UsePipes(new ValidationPipe({ transform: true }))
  @CacheTTL(10000000)
  @UseInterceptors(CacheInterceptor)
  async getAllUsers(@Query() query: SearchUsersDto) {
    return this.usersService.getAllUsers(query);
  }


  // Login a user
  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    return this.usersService.login(dto);
  }

  // register a user
  @Post('register')
  // @UsePipes(EmailPipePipe)
  async register(@Body(EmailPipePipe) dto: CreateUserDto) {

    return dto
    return this.usersService.register(dto);
  }

  // Get the profile of the logged in user
  @Get('profile')
  @UseGuards(ImageGuard)
  async getProfile(@Req() req) {
    return this.usersService.getProfile(req.user.id);
  }


  // Edit the profile of the logged in user
  @Patch('profile')
  @UseGuards(ImageGuard)
  async editProfile(@Req() req, @Body() dto: Partial<CreateUserDto>) {
    return this.usersService.editProfile(req.user.id, dto);
  }

  @Get('sse')
  async testEvent(@Res() res: Response) {
    return this.usersService.sse(res);

  }

}
