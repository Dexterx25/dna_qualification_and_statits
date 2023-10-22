import { DNA } from "src/dataAccess/databases/postgresql";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(DNA)
export class SequenceDNARepository extends Repository<DNA> {

}
