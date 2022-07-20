import { Controller, Get, Render } from '@nestjs/common';

@Controller('')
export class SpaController {
  @Get('*')
  @Render('index')
  getHello(): void {
    return;
  }
}
