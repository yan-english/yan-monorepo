import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../../modules/identify/domain/jwt.service';

@Injectable()
export class IdentifyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(IdentifyMiddleware.name);

  constructor(private readonly JwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = (req.headers as { authorization?: string }).authorization;

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const decodedToken = this.JwtService.verify(token.replace('Bearer ', ''));
      req.user = {
        id: decodedToken.sub,
        roles: decodedToken.roles,
      };

      next();
    } catch (error) {
      this.logger.error(error);

      return res.status(401).send('Unauthorized');
    }
  }
}
