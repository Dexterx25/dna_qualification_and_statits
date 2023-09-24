import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export abstract class Timestamps {
  @CreateDateColumn({ type: "timestamp", select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp", select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: "timestamp", select: false })
  deletedAt?: Date;
}
