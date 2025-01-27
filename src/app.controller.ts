import { Controller, Get, Res, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getHello()
  }
  @Get('greetings/:name')
  greetings( @Param('name') name) {
    return this.appService.greetings(name);
  }
}
