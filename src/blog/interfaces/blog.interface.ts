import { Document } from 'mongoose';

export interface IBlog extends Document {
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly body: string;
}
