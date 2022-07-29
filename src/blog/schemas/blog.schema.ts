import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Document } from 'mongoose';

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
