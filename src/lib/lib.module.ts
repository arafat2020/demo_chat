import { Global, Module } from '@nestjs/common';
import { LibService } from './lib.service';

@Global()
@Module({
  providers: [LibService]
})
export class LibModule {}
