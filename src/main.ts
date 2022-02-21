import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';

const port = process.env.SERVER_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`🚀 listening on port: ${port}`);
}
bootstrap();
