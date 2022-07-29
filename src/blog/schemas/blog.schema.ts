import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

export const BlogSchema = SchemaFactory.createForClass(Blog);
