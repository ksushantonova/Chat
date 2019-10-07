import {MigrationInterface, QueryRunner} from "typeorm";

export class newMigration1570445323384 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "dialog" ("dialog_id" character varying(30) NOT NULL, "message_id" character varying(30) NOT NULL, CONSTRAINT "PK_5078827ae80f09a85911aee69f6" PRIMARY KEY ("dialog_id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("message_id" character varying(30) NOT NULL, "time" character varying(30) NOT NULL, "user_id" character varying(30) NOT NULL, "dialog_id" character varying(30) NOT NULL, "message" character varying(500) NOT NULL, CONSTRAINT "PK_06a563cdbd963a9f7cbcb25c447" PRIMARY KEY ("message_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" character varying(30) NOT NULL, "name" character varying(30), "email" character varying(30), "password" character varying(30), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "dialog"`);
    }

}
