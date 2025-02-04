import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageDto } from 'src/interfaces/message.interface';
import { Message, MessageDocument } from 'src/schemas/message.model';
import { Room, RoomDocument } from 'src/schemas/room.model';
import { DeleteMessageDto, GetMessageDto, UpdateMessageDto } from './message.dto';
import { UploadService } from 'src/upload/upload.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name) private readonly MessageModel: Model<MessageDocument>,
        @InjectModel(Room.name) private readonly RoomModel: Model<RoomDocument>,
        private readonly uploadService: UploadService
    ) { }

    private async isRoomExist(roomId: string): Promise<boolean> {
        const isRoomExist = await this.RoomModel.findById(roomId)

        if (!isRoomExist) {
            throw new HttpException("Room not found", HttpStatus.NOT_FOUND)
        }


        return true

    }

    public async createMessage({
        message,
        file
    }: {
        message: MessageDto,
        file: Express.Multer.File
    }) {
        if (!message.content && !file) {
            throw new HttpException("Either message content or file must be provided", HttpStatus.BAD_REQUEST)
        }

        let fileInstance: Awaited<ReturnType<UploadService["uploadFile"]>> | null = null

        if (file) fileInstance = await this.uploadService.uploadFile(file)


        await this.isRoomExist(message.room as string)
        return this.MessageModel.create({
            file: fileInstance?.id,
            ...message
        })
    }

    public async getMessagesByRoomId({
        room,
        pagination
    }: {
        room: GetMessageDto,
        pagination: PaginationDto
    }): Promise<MessageDocument[]> {
        await this.isRoomExist(room.roomId as unknown as string)
        return await this.MessageModel.find({
            room: room.roomId
        })
            .skip(pagination.skip ?? 0)
            .limit(pagination.take ?? 10)
            .sort({
                created: -1
            })
            .exec();
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
