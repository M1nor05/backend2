import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./config/swagger.config";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  setupSwagger(app);

  const configService = app.get(ConfigService);

  // ✅ Render / Railway dynamic port birinchi o'rinda ishlatiladi
  const port = Number(process.env.PORT) || configService.get<number>('app.port') || 3000;

  // API prefix va global validation
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // CORS
  app.enableCors({ origin: '*' });

  // ✅ Render / Railway container ichidan tashqariga chiqish uchun 0.0.0.0
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server is running on port ${port}`);
}

bootstrap();
