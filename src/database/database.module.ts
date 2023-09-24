import { databaseProvider } from "./database.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
