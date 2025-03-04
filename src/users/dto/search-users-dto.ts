import { PaginationQueryParams } from "src/common/types";

export class SearchUsersDto extends PaginationQueryParams {
  userName: string
}