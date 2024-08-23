import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'Email of the new user',
    example: 'john_doe@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Password of the new user',
    example: 'strong_password_123',
  })
  readonly password: string;

  @ApiProperty({
    description: 'List of role IDs associated with the user',
    example: ['role1', 'role2'],
  })
  readonly roles: string[];
}
