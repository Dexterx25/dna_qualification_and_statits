import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database";
import { ScheduleModule } from "@nestjs/schedule";
import { RecluterModule } from "./routes/index.routes";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    RecluterModule,
    DatabaseModule,
    RecluterModule
  ],
})
export class AppModule {}
 