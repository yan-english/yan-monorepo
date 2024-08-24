import { RoleEntity } from '../../../../infrastructure/database/entities/role.entity';

export class GetListRolesResponseDto {
  data: RoleEntity[];
}
