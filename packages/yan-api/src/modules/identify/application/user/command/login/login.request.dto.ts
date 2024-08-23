import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'john_doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'strong_password_123',
  })
  password: string;
}
