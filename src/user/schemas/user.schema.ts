import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    trim: true,
    minlength: 5,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    trim: true,
    minlength: 7,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
    minlength: 8,
    required: true,
  })
  password: string;

  @Prop({ type: Boolean })
  isEmailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
