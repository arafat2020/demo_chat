import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config:ConfigService) {}
  getHello() {    
    return {
      msg: 'Hello from nestjs',
    }
  }

  greetings(name){
    return {
      greeting: `Hello ${name}!`,
    }
  }
}
