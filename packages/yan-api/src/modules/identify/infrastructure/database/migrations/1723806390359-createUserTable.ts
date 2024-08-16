import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1723806390359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            id VARCHAR(255) PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            date_of_birth DATE NOT NULL,
            gender VARCHAR(255) NOT NULL,
            salt VARCHAR(255) NOT NULL
            }; 
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users;`);
    }

}
