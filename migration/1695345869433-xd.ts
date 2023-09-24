import {MigrationInterface, QueryRunner} from "typeorm";

export class xd1695345869433 implements MigrationInterface {
    name = 'xd1695345869433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nextto_roomsMembers" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roomsId" uuid, "userId" uuid, CONSTRAINT "PK_342d30c656932d25fd71039b98f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nextto_rooms" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "userId" uuid, CONSTRAINT "PK_53aac99002240637a60101e2f20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nextto_users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(200) NOT NULL, "full_name" character varying(200) NOT NULL, "nikename" character varying(200) NOT NULL, "names" character varying(200) NOT NULL, "lastnames" character varying(200) NOT NULL, CONSTRAINT "PK_a1a31af3ff650dc4849a509cfd8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nextto_auth" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "password" character varying(200) NOT NULL, "access_token" character varying, "refresh_token" character varying, "userIdId" uuid, CONSTRAINT "REL_47cb42e082fe4d38deef21d241" UNIQUE ("userIdId"), CONSTRAINT "PK_31eb3bc0e04dcd29d1344307949" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" ADD CONSTRAINT "FK_998f6ea8055b36f8a4790ba38cf" FOREIGN KEY ("roomsId") REFERENCES "nextto_rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" ADD CONSTRAINT "FK_080f141c2848a8263c3611b7bf7" FOREIGN KEY ("userId") REFERENCES "nextto_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nextto_rooms" ADD CONSTRAINT "FK_50c19ddc6604c2f16a319ebe0e9" FOREIGN KEY ("userId") REFERENCES "nextto_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nextto_auth" ADD CONSTRAINT "FK_47cb42e082fe4d38deef21d241e" FOREIGN KEY ("userIdId") REFERENCES "nextto_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nextto_auth" DROP CONSTRAINT "FK_47cb42e082fe4d38deef21d241e"`);
        await queryRunner.query(`ALTER TABLE "nextto_rooms" DROP CONSTRAINT "FK_50c19ddc6604c2f16a319ebe0e9"`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" DROP CONSTRAINT "FK_080f141c2848a8263c3611b7bf7"`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" DROP CONSTRAINT "FK_998f6ea8055b36f8a4790ba38cf"`);
        await queryRunner.query(`DROP TABLE "nextto_auth"`);
        await queryRunner.query(`DROP TABLE "nextto_users"`);
        await queryRunner.query(`DROP TABLE "nextto_rooms"`);
        await queryRunner.query(`DROP TABLE "nextto_roomsMembers"`);
    }

}
