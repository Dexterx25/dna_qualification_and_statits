"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProvider = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const entities = require("../database/postgreSQL");
const listEntities = Object.values(entities);
exports.databaseProvider = typeorm_1.TypeOrmModule.forRootAsync({
    imports: [config_1.ConfigModule.forRoot({})],
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        const stage = configService.get("STAGE");
        if (stage === "dev" || !stage) {
            return {
                type: "postgres",
                host: configService.get("DB_HOST_DEV"),
                port: configService.get("DB_PORT_DEV"),
                username: configService.get("DB_USER_DEV"),
                password: configService.get("DB_PASSWORD_DEV"),
                database: configService.get("DB_DATABASE_DEV"),
                entities: listEntities,
                synchronize: false,
                logging: ["error"],
                cache: {
                    duration: 1500,
                },
            };
        }
        else if (stage == 'prod') {
            return {
                type: "postgres",
                host: configService.get("PGHOST"),
                port: configService.get("PGPORT"),
                username: configService.get("PGUSER"),
                password: configService.get("PGPASSWORD"),
                database: configService.get("PGDATABASE"),
                entities: listEntities,
                synchronize: false,
                logging: false,
                cache: {
                    duration: 1500,
                },
            };
        }
        else {
            return {
                type: "postgres",
                host: configService.get("PGHOST"),
                port: configService.get("PGPORT"),
                username: configService.get("PGUSER"),
                password: configService.get("PGPASSWORD"),
                database: configService.get("PGDATABASE"),
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
//# sourceMappingURL=database.service.js.map