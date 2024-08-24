import { ApiProperty } from '@nestjs/swagger';

export class GetListRolesRequestDto {
  @ApiProperty({
    example: 1,
    description: 'Page number for pagination',
    default: 1,
    required: false,
  })
  page: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
    default: 10,
    required: false,
  })
  limit: number = 10;

  @ApiProperty({
    example: 'ASC',
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    default: 'ASC',
    required: false,
  })
  sort: 'ASC' | 'DESC' = 'ASC';

  @ApiProperty({
    example: 'admin',
    description: 'Text to search for in role names',
    required: false,
  })
  text: string;
}
