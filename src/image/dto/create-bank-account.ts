export class CreateImageDto {
  imageUrl?: string;
  userId: string;
  image: Express.Multer.File;
}
