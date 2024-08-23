import { Entity } from './entity.base';

export interface Mapper<
  DomainEntity extends Entity<any>,
  DbRecord,
  Response = any,
> {
  toDomain(entity: DbRecord): DomainEntity;
  toPersistence(entity: DomainEntity): DbRecord;
  toResponse(entity: DomainEntity): Response;
}
