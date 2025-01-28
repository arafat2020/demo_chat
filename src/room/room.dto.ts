import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { createZodDto } from "nestjs-zod";
import { RoomSchemaOneToOne } from "src/interfaces/room.interface";

export class RoomDto extends createZodDto(RoomSchemaOneToOne) {
    @ApiProperty({ example: 'Chat Room', description: 'The name of the room (optional)' })
    name?: string;
  
    @ApiProperty({
      example: '64f9382e8e4a9b3c80d12345',
      description: 'The ObjectId of the first user',
    })
    userOneId: mongoose.Schema.Types.ObjectId;
  
    @ApiProperty({
      example: '64f9382e8e4a9b3c80d67890',
      description: 'The ObjectId of the second user',
    })
    userTwoId: mongoose.Schema.Types.ObjectId;
  
    @ApiProperty({
      example: 'Hello, how are you?',
      description: 'The last message sent in the room (optional)',
    })
    lastMessage?: string;
  }