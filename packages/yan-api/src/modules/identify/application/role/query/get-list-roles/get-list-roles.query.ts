import { GetListRolesRequestDto } from './get-list-roles.request.dto';

export class GetListRolesQuery {
  readonly page: number;
  readonly limit: number;
  readonly sort: string;
  readonly text: string;

  constructor(props: GetListRolesRequestDto) {
    this.page = props?.page ?? 1;
    this.limit = props?.limit ?? 10;
    this.sort = props?.sort ?? 'ASC';
    this.text = props?.text ?? '';
  }
}
