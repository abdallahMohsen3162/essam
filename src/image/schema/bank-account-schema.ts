import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user';

@Schema()
export class Image {
  @Prop({ required: [true, 'Image URL is required'] })
  imageUrl: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: [true, 'User Id is required'] })
  userId: Types.ObjectId;
}

export type ImageDocument = Image & Document;
export const ImagesSchema = SchemaFactory.createForClass(Image);
