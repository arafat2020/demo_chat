import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, Query, UploadedFile, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MessageService } from './message.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MessageDto } from 'src/interfaces/message.interface';
import { DeleteMessageDto, GetMessageDto, UpdateMessageDto } from './message.dto';

@Controller('message')
@UseGuards(AuthGuard)
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post('create')
    @ApiBearerAuth()
    public async createMessage(
        @Body() message: MessageDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB limit
                ],
                fileIsRequired: false
            })) file: Express.Multer.File,
    ) {
        return this.messageService.createMessage({ message })
    }
    

    @Get('getMessage')
    @ApiBearerAuth()
    public async getMessagesByRoomId(@Query('roomId') roomId: GetMessageDto) {
        return this.messageService.getMessagesByRoomId(roomId)
    }

    @Post('delete')
    @ApiBearerAuth()
    public async deleteMessageById(@Query('id') id: DeleteMessageDto) {
        return this.messageService.deleteMessageById(id)
    }

    @Post('update')
    @ApiBearerAuth()
    public async updateMessageById(@Body() payload: UpdateMessageDto) {
        return this.messageService.updateMessageById(payload)
    }

}
