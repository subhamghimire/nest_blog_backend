import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async signUp(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
  //   try {
  //     const user = await this.userService.create(createUserDto);
  //     return res.status(HttpStatus.OK).json({
  //       message: 'User has been created successfully',
  //       data: user,
  //     });
  //   } catch (err) {
  //     return res.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error: User not created!',
  //       status: 400,
  //     });
  //   }
  // }
  @UseGuards(JwtAuthGuard)
  @Get('info')
  getUserInfo(@Req() req: Request) {
    return req.user;
  }
}
