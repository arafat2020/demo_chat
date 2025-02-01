import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomType } from 'src/interfaces/room.interface';
import { Room, RoomDocument } from 'src/schemas/room.model';
import { User, UserDocument } from 'src/schemas/user.model';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name) private readonly RoomModel: Model<RoomDocument>,
        @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
    ) { }

    public async createRoomOneToOne({
        room
    }: {
        room: RoomType
    }): Promise<Room> {

        const isBothUserExisting = await this.UserModel.findById(room.userOneId) && await this.UserModel.findById(room.userTwoId)
        
        if (!isBothUserExisting) throw new HttpException('Both users should exist', HttpStatus.BAD_REQUEST)
        
        const isExist = await this.RoomModel.findOne({
            users: {
                $all: [room.userOneId, room.userTwoId]
            }
        })
        

        if (isExist) return isExist

        return this.RoomModel.create({
            users: [room.userOneId, room.userTwoId]
        })
    }
}
