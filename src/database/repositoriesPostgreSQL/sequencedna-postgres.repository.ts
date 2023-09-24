import { DNA } from "src/database/postgreSQL";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(DNA)
export class SequenceDNARepository extends Repository<DNA> {

}
