"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const auth = require("express-basic-auth");
const configSwagger = async (app) => {
    app.enableCors({
        origin: '*',
    });
    app.use("api/v1/testApp", auth({
        challenge: true,
        users: {
            [`${process.env.SWAGGER_USER}`]: `${process.env.SWAGGER_PASS}`,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Mixing Center')
        .addBearerAuth()
        .setDescription('Documentation novelties.')
        .setVersion('0.0.1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    return swagger_1.SwaggerModule.setup('api/v1/testApp/docs', app, document, {
        swaggerOptions: {
            showRequestDuration: true,
        }
    });
};
exports.configSwagger = configSwagger;
//# sourceMappingURL=swagger.config.js.map