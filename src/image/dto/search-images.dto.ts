import { PaginationQueryParams } from "src/common/types"

export class SearchImagesDto extends PaginationQueryParams {
  userId: string
}