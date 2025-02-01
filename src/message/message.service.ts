import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageDto } from 'src/interfaces/message.interface';
import { Message, MessageDocument } from 'src/schemas/message.model';
import { Room, RoomDocument } from 'src/schemas/room.model';
import { DeleteMessageDto, GetMessageDto, UpdateMessageDto } from './message.dto';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name) private readonly MessageModel: Model<MessageDocument>,
        @InjectModel(Room.name) private readonly RoomModel: Model<RoomDocument>,
    ) { }

    private async isRoomExist(roomId: string): Promise<boolean> {
        const isRoomExist = await this.RoomModel.findOne({
            id: roomId
        })

        if (!isRoomExist) {
            throw new HttpException("Room not found", HttpStatus.NOT_FOUND)
            return false
        }


        return true

    }

    public async createMessage({
        message
    }: {
        message: MessageDto
    }) {

        await this.isRoomExist(message.room as string)
        return this.MessageModel.create(message)
    }

    public async getMessagesByRoomId({
        roomId
    }: GetMessageDto): Promise<MessageDocument[]> {
        this.isRoomExist(roomId as unknown as string)
        return await this.MessageModel.find({
            room: new Types.ObjectId(roomId)
        }).exec();
    }

    public async deleteMessageById({
        id
    }: DeleteMessageDto): Promise<MessageDocument> {
        const isDeleted = await this.MessageModel.findByIdAndUpdate(id, {
            isDeleted: true
        }, { new: true }).exec();

        if (!isDeleted) throw new HttpException("Message not found", HttpStatus.NOT_FOUND)

        return isDeleted
    }

    public async updateMessageById(payload: UpdateMessageDto): Promise<MessageDocument> {
        const {
            id,
            ...rest
        } = payload

       const updated = await this.MessageModel.findByIdAndUpdate(id, {
            ...rest
        }, { new: true }).exec()

        if (!updated) throw new HttpException("Message not found", HttpStatus.NOT_FOUND)

        return updated

    }
}
