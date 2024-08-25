import { GetListUsersRequestDto, SortDto } from './get-list-users.request.dto';

export class GetListUsersQuery {
  readonly page: number;
  readonly limit: number;
  readonly sort: SortDto;
  readonly text: string;

  constructor(props: GetListUsersRequestDto) {
    this.page = props?.page ?? 1;
    this.limit = props?.limit ?? 10;
    this.sort = props?.sort ?? { username: 'ASC' };
    this.text = props?.text ?? '';
  }
}
