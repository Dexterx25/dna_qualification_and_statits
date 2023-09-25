import { Injectable } from "@nestjs/common";
import { DNA } from "src/database/postgreSQL";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SequenceDNARepository extends Repository<DNA> {
    constructor(
          dataSource: DataSource
      ) {
        super(DNA, dataSource.createEntityManager());
    }
}
