import {MigrationInterface, QueryRunner} from "typeorm";

export class newMigration1570194249080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "dialog" DROP CONSTRAINT "PK_09744e0ee61b1ddf028d8eb8497"`);
        await queryRunner.query(`ALTER TABLE "dialog" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "PK_ba01f0a3e0123651915008bc578"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "dialog" ADD CONSTRAINT "PK_5078827ae80f09a85911aee69f6" PRIMARY KEY ("dialog_id")`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "PK_06a563cdbd963a9f7cbcb25c447" PRIMARY KEY ("message_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_96aac72f1574b88752e9fb00089"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_96aac72f1574b88752e9fb00089" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_96aac72f1574b88752e9fb00089"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "PK_06a563cdbd963a9f7cbcb25c447"`);
        await queryRunner.query(`ALTER TABLE "dialog" DROP CONSTRAINT "PK_5078827ae80f09a85911aee69f6"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "message" ADD "id" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "dialog" ADD "id" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dialog" ADD CONSTRAINT "PK_09744e0ee61b1ddf028d8eb8497" PRIMARY KEY ("id")`);
    }

}
