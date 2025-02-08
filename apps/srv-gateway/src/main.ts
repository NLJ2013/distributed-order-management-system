import { NestFactory } from '@nestjs/core';
import { SrvGatewayModule } from './srv-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(SrvGatewayModule);
  app.setGlobalPrefix('api-gateway');
  const port = process.env.port ?? 3000;
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
