import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const user = new this._userModel({ ...createUserDto, password: hash });
    return user.save();
  }

  async findOne(email: string): Promise<User> {
    return this._userModel.findOne({ email: email }).exec();
  }

  async verifyPassword(password: string, hashedPass: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPass);
  }
}
