import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty({ message: 'Password field is required' })
  @MinLength(8, {
    message:
      '$property is too short. Minimal length is $constraint1 characters',
  })
  @IsString()
  readonly password: string;
}
