import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./config/swagger.config";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3000; // ❌ o‘rniga 'app.port'

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({ origin: '*' });

  await app.listen(port, '0.0.0.0'); // Railway uchun 0.0.0.0 kerak
  console.log(`🚀 Server is running on http://localhost:${port}/api`);

}
bootstrap();
