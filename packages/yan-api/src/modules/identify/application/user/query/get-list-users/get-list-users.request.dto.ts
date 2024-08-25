import { ApiProperty } from '@nestjs/swagger';

export class SortDto {
  @ApiProperty({ enum: ['ASC', 'DESC'], required: false })
  username?: 'ASC' | 'DESC';

  @ApiProperty({ enum: ['ASC', 'DESC'], required: false })
  email?: 'ASC' | 'DESC';

  @ApiProperty({ enum: ['ASC', 'DESC'], required: false })
  gender?: 'ASC' | 'DESC';

  @ApiProperty({ enum: ['ASC', 'DESC'], required: false })
  dateOfBirth?: 'ASC' | 'DESC';
}

export class GetListUsersRequestDto {
  @ApiProperty({ required: false, default: 1 })
  page?: number;

  @ApiProperty({ required: false, default: 10 })
  limit?: number;

  @ApiProperty({ type: SortDto, required: false })
  sort?: SortDto;

  @ApiProperty({ required: false })
  text?: string;
}
