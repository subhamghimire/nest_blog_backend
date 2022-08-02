import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto';
import { IBlog } from './interfaces/blog.interface';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllBlogs(
    @Res() res: Response,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const blogs = await this.blogService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json({
      message: 'All Blogs has been fetched successfully',
      blogs,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async getBlog(@Res() res: Response, @Param('id') blogId: string) {
    if (!blogId) {
      throw new NotFoundException('Blog ID does not exist');
    }
    const blog = await this.blogService.findOne(blogId);
    return res.status(HttpStatus.OK).json({
      message: 'Blog has been fetched successfully',
      blog,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async addBlog(
    @Req() req: Request,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    const userId = req.user['_id'];
    const createdBlog = await this.blogService.create(createBlogDto, userId);
    return createdBlog;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  public async updateBlog(
    @Res() res: Response,
    @Param('id') blogId: string,
    @Body() UpdateBlogDto: UpdateBlogDto,
  ) {
    try {
      const blog = await this.blogService.update(blogId, UpdateBlogDto);
      if (!blog) {
        throw new NotFoundException('Blog does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Blog has been successfully updated',
        blog,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Blog not updated!',
        status: 400,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async deleteBlog(@Res() res: Response, @Param('id') blogId: string) {
    if (!blogId) {
      throw new NotFoundException('BLog ID does not exist');
    }

    const blog = await this.blogService.remove(blogId);

    return res.status(HttpStatus.OK).json({
      message: 'Blog has been deleted',
      blog,
    });
  }
}
