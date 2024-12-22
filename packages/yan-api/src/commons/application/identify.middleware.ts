import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../../modules/identify/domain/jwt.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { PERMISSIONS_PREFIX } from './constants';
import {
  PermissionEntity,
  ServerAction,
} from '../../modules/identify/infrastructure/database/entities/permission.entity';
import { parse } from 'url';

@Injectable()
export class IdentifyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(IdentifyMiddleware.name);

  constructor(
    private readonly JwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {

    // Lấy token từ header
    const token = (req.headers as { authorization?: string }).authorization;

    // Nếu không có token thì trả về 401 Unauthorized
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    try {

      // xác thực token có hợp lệ không
      // nếu token không hơp lệ thì trả về 401 Unauthorized
      const decodedToken = this.JwtService.verify(token.replace('tinh ', ''));
      req.user = {
        id: decodedToken.sub,
        roles: decodedToken.roles,
      };

      // Phân quyền
      // Lấy danh sách permission của user từ cache
      // Kiểm tra xem endpoint hiện tại có nằm trong danh sách permission của user không
      // Nếu không thì trả về 403 Forbidden, user không có quyền truy cập endpoint này
      const listPermissionsOfUser: PermissionEntity[] = (
        await Promise.all(
          decodedToken.roles.map((role) =>
            this.cacheManager.get(`${PERMISSIONS_PREFIX}${role}`),
          ),
        )
      )
        .filter(
          (permission): permission is PermissionEntity => permission !== null,
        )
        .flat();
      const parsedUrl = parse(req.originalUrl);
      const endpoint = parsedUrl.pathname;

      const hasPermission = listPermissionsOfUser.some((permission) => {
        const servers: ServerAction[] = permission.server;
        return servers?.some((server) => {
          const routes = server.routes;
          return routes?.some((route) => {
            return endpoint.includes(route) && server.action === req.method;
          });
        });
      });
      if (!hasPermission) {
        return res.status(403).send('Forbidden');
      }
      next();
    } catch (error) {
      this.logger.error(error);

      return res.status(401).send('Unauthorized');
    }
  }
}
