import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import 'dotenv/config';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`🚀 listening on port: ${port}`);
}
bootstrap();
