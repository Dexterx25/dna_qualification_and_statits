import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { existsSync } from "fs";
import { join } from "path";
import { configSwagger } from './configurations/swagger.config';

import {
  NestExpressApplication,
  ExpressAdapter,
} from "@nestjs/platform-express";
import { LoggerService } from "./utils/logger";
import { LoggingInterceptor, TimeoutInterceptor } from "./configurations/interceptors";
import { ResponseInterceptor } from "./configurations/interceptors/response";

async function bootstrap() {
  const logger = new LoggerService();

  const paths = { public: "", views: "" };
  if (existsSync(join(__dirname, "views"))) {
    paths.public = join(__dirname, "public");
    paths.views = join(__dirname, "views");
  } else {
    const src = __dirname.split("/").filter((value) => value !== "dist");
    paths.public = join(src.join("/"), "public");
    paths.views = join(src.join("/"), "views");
  }
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  );
  app.useStaticAssets(join(__dirname.replace('dist', 'src'), 'public'));
  app.setBaseViewsDir(join(__dirname.replace('dist', 'src'), 'assets'));
  app.setBaseViewsDir(join(__dirname.replace('dist', '.'), 'utils/pdf/templates/hbs'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
  );
   await configSwagger(app)

  await app.listen(3000, () => {
    logger.log('APP', `testApp is running on http://localhost:${3000}`);
    logger.debug(
      'APP',
      `Swagger is running on http://localhost:${3000}/api/v1/testApp/docs`,
    );
  });
}
bootstrap();
