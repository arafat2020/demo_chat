import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomType } from 'src/interfaces/room.interface';
import { Room, RoomDocument } from 'src/schemas/room.model';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name) private readonly RoomModel: Model<RoomDocument>
    ) { }

    public async createRoomOneToOne({
        room
    }: {
        room: RoomType
    }): Promise<Room> {
        const isExist = await this.RoomModel.findOne({
            users: room.userOneId
        }) || await this.RoomModel.findOne({
            users: room.userTwoId
        })

        if (isExist) return isExist

        return this.RoomModel.create({
            users: [room.userOneId, room.userTwoId]
        })
    }
}
