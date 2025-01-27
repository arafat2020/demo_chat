import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
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
