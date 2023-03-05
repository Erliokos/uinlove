import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DEFAULT_PORT = 4001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('API_PORT');
  await app.listen(port || DEFAULT_PORT, () => {
    console.log(
      `Сервер запущен на порту ${port ?? `стандартном порту ${DEFAULT_PORT}`}`,
    );
  });
}
bootstrap();
