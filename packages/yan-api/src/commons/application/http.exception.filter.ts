import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from './base-reponse.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception: ConflictException | BadRequestException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json(new BaseResponse(`${status}`, exception.message, null));
  }
}
