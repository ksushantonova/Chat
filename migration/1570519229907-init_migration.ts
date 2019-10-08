import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigration1570519229907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "dialogs" ("dialog_id" character varying(30) NOT NULL, "message_id" character varying(30) NOT NULL, CONSTRAINT "PK_449b4143ab430335016e9dca603" PRIMARY KEY ("dialog_id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("message_id" character varying(30) NOT NULL, "time" character varying(30) NOT NULL, "user_id" character varying(30) NOT NULL, "dialog_id" character varying(30) NOT NULL, "message" character varying(500) NOT NULL, CONSTRAINT "PK_6187089f850b8deeca0232cfeba" PRIMARY KEY ("message_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" character varying(30) NOT NULL, "name" character varying(30), "email" character varying(30), "password" character varying(30), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "dialogs"`);
    }

}
