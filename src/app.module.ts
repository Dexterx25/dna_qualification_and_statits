import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { 
  RecluterModule, 
  StatsModule
} from "./modules/index.modules";
import { DatabaseModule } from "./dataAccess/databases/database.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RecluterModule,
    StatsModule,
    DatabaseModule,
    DatabaseModule,
  ],
})
export class AppModule {}
 