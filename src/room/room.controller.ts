import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './room.dto';
import { MongooseExceptionFilter } from 'src/filters/mongoose-exception.filter';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('room')
@UseGuards(AuthGuard)
@UseFilters(MongooseExceptionFilter)
export class RoomController {
    constructor(private roomService: RoomService){}

    @Post('create')
    @ApiBearerAuth()
    public createRoomOneToOne(@Body() credential: RoomDto){
        return this.roomService.createRoomOneToOne({ room: credential})
    }
}

