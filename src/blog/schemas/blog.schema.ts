import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop()
  title: string;

  @Prop({ unique: true })
  slug: string;

  @Prop()
  excerpt: string;

  @Prop()
  body: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  authorId: string;
}

const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.pre('save', async function (this: Blog, next: NextFunction) {
  this.slug = this.title
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '');

  next();
});

export { BlogSchema };
