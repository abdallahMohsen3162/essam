import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user';

@Schema({ timestamps: true }) 
export class Image {
  @Prop({ required: [true, 'Image URL is required'] })
  imageUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: [true, 'User Id is required'] })
  user: Types.ObjectId;

  @Prop({ required: false })
  text?: string;
}

export type ImageDocument = Image & Document;
export const ImagesSchema = SchemaFactory.createForClass(Image);
