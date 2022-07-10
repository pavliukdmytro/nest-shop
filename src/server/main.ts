import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log(join(__dirname, 'public'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  hbs.registerPartials(join(__dirname, '..', 'src/server/views/partials'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/server/views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
