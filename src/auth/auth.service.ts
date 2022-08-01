import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this._userService.findOne(email);
    if (!user) {
      return null;
    }
    const isPasswordMatched = await this._userService.verifyPassword(
      pass,
      user.password,
    );
    if (isPasswordMatched) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const { email, password } = user;
    const validated = await this.validateUser(email, password);
    if (!validated) {
      throw new UnauthorizedException();
    }
    const payload = { email: email, password: password };
    return {
      access_token: this._jwtService.sign(payload, {
        issuer: process.env.JWT_ISSUER,
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_EXPIRES,
      }),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<IUser> {
    return await this._userService.create(createUserDto);
  }
}
