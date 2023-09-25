import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as auth from "express-basic-auth";

export const configSwagger = async (app:any) => {

    app.enableCors({
        origin: '*',
    });
    app.use(
        "api/v1/testApp",
        auth({
          challenge: true,
          users: {
            [`${process.env.SWAGGER_USER}`]: `${process.env.SWAGGER_PASS}`,
          },
        })
      );
    const config = new DocumentBuilder()
        .setTitle('Mixing Center')
        .addBearerAuth()
        .setDescription('Documentation novelties.')
        .setVersion('0.0.1')
        .build();

    const document = SwaggerModule.createDocument(app, config);
  
    return SwaggerModule.setup('api/v1/testApp/docs', app, document, {
      swaggerOptions:{
        showRequestDuration: true,
      }
    });

}
