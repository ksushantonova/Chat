import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigration1571208296164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "identity"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "identity" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "identity"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "identity" character varying(30)`);
    }

}
