import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';

// console.log(process.env.SERVER_PORT);
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  hbs.registerPartials(join(__dirname, '..', 'src/server/views/partials'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/server/views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
