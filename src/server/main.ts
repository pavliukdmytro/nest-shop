import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import * as hbs from 'hbs';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  hbs.registerPartials(join(__dirname, '..', 'src/server/views/partials'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/server/views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
