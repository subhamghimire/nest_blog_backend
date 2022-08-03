import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { User } from 'src/user/schemas/user.schema';
import { CreateBlogDto, UpdateBlogDto } from './dto';
import { IBlog } from './interfaces/blog.interface';
import { Blog } from './schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  public async findAll(paginationQuery: PaginationQueryDto): Promise<IBlog[]> {
    const { limit, offset } = paginationQuery;
    return await this.blogModel
      .find()
      .populate('author')
      .skip(offset)
      .limit(limit)
      .exec();
  }

  public async findOne(blogId: string): Promise<IBlog> {
    const blog = await this.blogModel.findById({ _id: blogId }).exec();

    if (!blog) {
      throw new NotFoundException(`Blog #${blogId} not found`);
    }

    return blog;
  }

  public async create(
    createBlogDto: CreateBlogDto,
    userId: string,
  ): Promise<IBlog> {
    try {
      const blog = new this.blogModel(createBlogDto);
      blog.author = userId;
      return await blog.save();
    } catch (err) {
      throw err;
    }
  }

  public async update(
    blogId: string,
    updateBlogDto: UpdateBlogDto,
  ): Promise<IBlog> {
    const existingBlog = await this.blogModel.findByIdAndUpdate(
      { _id: blogId },
      updateBlogDto,
    );

    if (!existingBlog) {
      throw new NotFoundException(`Blog #${blogId} not found`);
    }

    return existingBlog;
  }

  public async remove(blogId: string): Promise<any> {
    return await this.blogModel.findByIdAndRemove(blogId);
  }
}
