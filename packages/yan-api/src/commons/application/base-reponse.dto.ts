import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty({ description: 'Response code', example: '200' })
  code: string;

  @ApiProperty({ description: 'Response message', example: 'Success' })
  message: string;

  @ApiProperty({ description: 'Response data' })
  data: T;

  constructor(code: string, message: string, data: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
