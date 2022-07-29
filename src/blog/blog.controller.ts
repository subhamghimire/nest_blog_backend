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
  Res,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto';

@Controller('blogs')
export class BlogController {
  service;
  constructor(private readonly blogService: BlogService) {
    this.service = blogService;
  }

  @Get()
  async getAllBlogs(@Res() res, @Query() paginationQuery: PaginationQueryDto) {
    const blogs = await this.blogService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(blogs);
  }

  @Get('/:id')
  public async getBlog(@Res() res, @Param('id') blogId: string) {
    if (!blogId) {
      throw new NotFoundException('Blog ID does not exist');
    }
    const blog = await this.blogService.findOne(blogId);
    return res.status(HttpStatus.OK).json(blog);
  }

  @Post()
  public async addBlog(@Res() res, @Body() createBlogDto: CreateBlogDto) {
    try {
      const blog = await this.blogService.create(createBlogDto);
      return res.status(HttpStatus.OK).json({
        message: 'Blog has been created successfully',
        blog,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: BLog not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateBlog(
    @Res() res,
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

  @Delete('/:id')
  public async deleteBlog(@Res() res, @Param('id') blogId: string) {
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
