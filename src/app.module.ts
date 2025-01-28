import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LibModule } from './lib/lib.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    LibModule,
    RoomModule,
    MessageModule,
  ],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
