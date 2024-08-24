import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'Email of the new user',
    example: 'john_doe@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description:
      'Password of the new user, the rules: at least one digit, one lowercase letter, one uppercase letter, and a minimum length of 8 characters',
    example: 'Text@1234',
  })
  readonly password: string;

  @ApiProperty({
    description: 'List of role IDs associated with the user',
    example: ['role1', 'role2'],
  })
  readonly roles: string[];
}
