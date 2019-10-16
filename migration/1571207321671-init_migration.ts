import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigration1571207321671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "identity" character varying(30)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "salt" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verifier" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verifier"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "identity"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(30)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(30)`);
    }

}
