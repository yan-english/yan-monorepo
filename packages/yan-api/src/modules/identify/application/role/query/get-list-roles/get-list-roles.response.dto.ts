import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../../../../infrastructure/database/entities/role.entity';

export class GetListRolesResponseDto {
  @ApiProperty({ type: [RoleEntity], description: 'List of roles' })
  data: RoleEntity[];

  @ApiProperty({ description: 'Total count of roles' })
  count: number;
}
