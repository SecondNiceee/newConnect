import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;
  const config = new DocumentBuilder()
    .setTitle("Promo Database API")
    .setDescription("API для системы пользователей с промокодами")
    .setVersion("1.0")
    .addTag("Users")
    .build()

    app.enableCors({
      origin: [process.env.FRONTEND_MAIN_URL, process.env.FRONTEND_EXTRA_URL],
      credentials: true,
    });// Важно! Тут нужно поменять на url фронта

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
  await app.listen(PORT);
  console.log(`Server started listening on PORT = ${PORT}`);
}
bootstrap();
