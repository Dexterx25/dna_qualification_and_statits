import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as entities from ".";

const listEntities = Object.values(entities);
export const databaseProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule.forRoot({})],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const stage = configService.get<string>("STAGE");
    if (stage === "dev" || !stage) {
      return {
        type: "postgres",
        host: configService.get<string>("DB_HOST_DEV"),
        port: configService.get<number>("DB_PORT_DEV"),
        username: configService.get<string>("DB_USER_DEV"),
        password: configService.get<string>("DB_PASSWORD_DEV"),
        database: configService.get<string>("DB_DATABASE_DEV"),
        entities: listEntities,
        synchronize: false,
        logging: ["error"],
        cache: {
          duration: 1500,
        },
      };
    } else if(stage == 'prod') {
      return {
        type: "postgres",
        host: configService.get<string>("PGHOST"),
        port: configService.get<number>("PGPORT"),
        username: configService.get<string>("PGUSER"),
        password: configService.get<string>("PGPASSWORD"),
        database: configService.get<string>("PGDATABASE"),
        entities: listEntities,
        synchronize: false,
        logging: false,
        cache: {
          duration: 1500,
        },
      };
    } else {
      return {
        type: "postgres",
        host: configService.get<string>("PGHOST"),
        port: configService.get<number>("PGPORT"),
        username: configService.get<string>("PGUSER"),
        password: configService.get<string>("PGPASSWORD"),
        database: configService.get<string>("PGDATABASE"),
        entities: listEntities,
        synchronize: false,
        logging: false,
        cache: {
          duration: 1500,
        },
      };
    }
  },
});
