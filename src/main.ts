import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import * as bcrypt from 'bcrypt';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);


    setupSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));


  
  app.enableCors({
    origin: '*', 
  });


  
  
  await app.listen(port);
  console.log(`🚀 Server is running on http://localhost:${port}/api`);
  
const password = 'Zaripov05';
 const hash = await bcrypt.hash(password, 10);
console.log(hash);
}
bootstrap();
