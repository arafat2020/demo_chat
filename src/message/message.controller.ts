import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MessageService } from './message.service';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { MessageDto } from 'src/interfaces/message.interface';
import { CreateMessageDto, DeleteMessageDto, GetMessageDto, UpdateMessageDto } from './message.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('message')
@UseGuards(AuthGuard)
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post('create')
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data') // 🚀 Important for Swagger/OpenAPI
    @UseInterceptors(FileInterceptor('file'))
    public async createMessage(
        @Body() message: CreateMessageDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 5MB limit
                ],
                fileIsRequired: false
            })) file: Express.Multer.File,
    ) {
        return this.messageService.createMessage({
            message,
            file
        })
    }


    @Get('getMessage')
    @ApiBearerAuth()
    public async getMessagesByRoomId(
        @Query() room: GetMessageDto,
        @Query() pagination: PaginationDto
    ) {
        return this.messageService.getMessagesByRoomId({
            pagination,
            room
        })
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
