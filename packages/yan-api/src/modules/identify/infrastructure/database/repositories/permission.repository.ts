import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import {PermissionEntity} from '../entities/permission.entity';

export class PermissionRepository {
    constructor(
        @InjectRepository(PermissionEntity as any)
        private readonly permissionRepository: Repository<PermissionEntity>,
    ) {}

    async findBy(ids: string[]): Promise<PermissionEntity[]> {
        return await this.permissionRepository.findBy({id: In(ids)});
    }
}
