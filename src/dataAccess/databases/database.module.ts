import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './postgresql/index'
const listEntities = Object.values(entities);

@Module({
  imports: [
    MongooseModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          uri: config.get<string>('MONGO_URI'),
        }),
      }),
    TypeOrmModule.forRootAsync({
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
    })
  ],
})
export class AppModule {}
