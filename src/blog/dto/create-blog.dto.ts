import { IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly excerpt: string;

  @IsString()
  readonly body: string;
}
