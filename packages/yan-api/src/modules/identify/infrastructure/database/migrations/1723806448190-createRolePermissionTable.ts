import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolePermissionTable1723806448190
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE role_permissions (
                id VARCHAR(255) PRIMARY KEY,
                role_id VARCHAR(255) NOT NULL,
                permission_id VARCHAR(255) NOT NULL,
                FOREIGN KEY (role_id) REFERENCES roles(id),
                FOREIGN KEY (permission_id) REFERENCES permissions(id)
            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE role_permissions;`);
  }
}
