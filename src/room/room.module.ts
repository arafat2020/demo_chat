import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/schemas/room.model';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from 'src/schemas/user.model';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      }
    ])
  ],
  controllers: [RoomController],
  providers: [RoomService, JwtService]
})
export class RoomModule {}
