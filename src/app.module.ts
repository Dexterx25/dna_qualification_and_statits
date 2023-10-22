import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "./dataAccess/databases";
import { RecluterModule } from "./routes/index.routes";
import { MongoDatabaseModule } from "./dataAccess/databases/mongodb/database.module";
import { StatsModule } from "./routes/stats/stats.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RecluterModule,
    StatsModule,
    DatabaseModule,
    MongoDatabaseModule,
  ],
})
export class AppModule {}
 