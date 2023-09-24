import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database";
import { RecluterModule } from "./routes/index.routes";
import { MongoDatabaseModule } from "./database/mongo/database.module";
import { StatsModule } from "./routes/stats/stats.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RecluterModule,
    StatsModule,
    DatabaseModule,
    RecluterModule,
    MongoDatabaseModule,
  ],
})
export class AppModule {}
 