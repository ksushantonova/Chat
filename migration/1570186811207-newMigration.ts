import {MigrationInterface, QueryRunner} from "typeorm";

export class newMigration1570186811207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "dialog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "messageid" character varying(30) NOT NULL, "dialogid" character varying(30) NOT NULL, CONSTRAINT "PK_09744e0ee61b1ddf028d8eb8497" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" character varying(30) NOT NULL, "userid" character varying(30) NOT NULL, "dialogid" character varying(30) NOT NULL, "messageid" character varying(30) NOT NULL, "message" character varying(500) NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userid" character varying(30) NOT NULL, "name" character varying(30), "email" character varying(30), "pass" character varying(30), CONSTRAINT "UQ_37b098e31baedfa2b76e7876998" UNIQUE ("userid"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "dialog"`);
    }
}
