import {MigrationInterface, QueryRunner} from "typeorm";

export class newMigration1570430564687 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "pass" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "password" TO "pass"`);
    }

}
