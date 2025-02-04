import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/schemas/message.model';
import { JwtService } from '@nestjs/jwt';
import { Room, RoomSchema } from 'src/schemas/room.model';
import { UploadService } from 'src/upload/upload.service';
import { FileDoc, FileSchema } from 'src/schemas/file.model';

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
      }, {
        name: FileDoc.name,
        schema: FileSchema
      }
    ])
  ],
  controllers: [MessageController],
  providers: [MessageService, JwtService, UploadService]
})
export class MessageModule { }
