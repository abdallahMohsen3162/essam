import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationQueryParams {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'انت بتهزر ؟؟؟' })
  limit: number = 10;

  @IsOptional()
  keyword?: string;
}
