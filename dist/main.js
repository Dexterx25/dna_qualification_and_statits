"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs_1 = require("fs");
const path_1 = require("path");
const swagger_config_1 = require("./configurations/swagger.config");
const platform_express_1 = require("@nestjs/platform-express");
const logger_1 = require("./utils/logger");
const interceptors_1 = require("./configurations/interceptors");
const response_1 = require("./configurations/interceptors/response");
async function bootstrap() {
    const logger = new logger_1.LoggerService();
    const paths = { public: "", views: "" };
    if ((0, fs_1.existsSync)((0, path_1.join)(__dirname, "views"))) {
        paths.public = (0, path_1.join)(__dirname, "public");
        paths.views = (0, path_1.join)(__dirname, "views");
    }
    else {
        const src = __dirname.split("/").filter((value) => value !== "dist");
        paths.public = (0, path_1.join)(src.join("/"), "public");
        paths.views = (0, path_1.join)(src.join("/"), "views");
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter());
    app.useStaticAssets((0, path_1.join)(__dirname.replace('dist', 'src'), 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname.replace('dist', 'src'), 'assets'));
    app.setBaseViewsDir((0, path_1.join)(__dirname.replace('dist', '.'), 'utils/pdf/templates/hbs'));
    app.setViewEngine('hbs');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new interceptors_1.LoggingInterceptor(logger), new response_1.ResponseInterceptor(), new interceptors_1.TimeoutInterceptor());
    await (0, swagger_config_1.configSwagger)(app);
    await app.listen(3000, () => {
        logger.log('APP', `testApp is running on http://localhost:${3000}`);
        logger.debug('APP', `Swagger is running on http://localhost:${3000}/api/v1/testApp/docs`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map