import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/schemas/message.model';
import { JwtService } from '@nestjs/jwt';
import { Room, RoomSchema } from 'src/schemas/room.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
      {
        name: Room.name,
        schema: RoomSchema,
      }
    ])
  ],
  controllers: [MessageController],
  providers: [MessageService, JwtService]
})
export class MessageModule { }
