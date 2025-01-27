import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LibModule } from './lib/lib.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, LibModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client', 'dist'), // Adjust if needed
  }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally
    }),
  ],
  exports: [UserModule, LibModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
