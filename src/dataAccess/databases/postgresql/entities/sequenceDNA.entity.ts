import { Timestamps } from "../timestamp/timestamp.entity";
import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity("ficohsa_dna")
export class DNA extends Timestamps {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({unique: true})
  dna!: string;
  
}
