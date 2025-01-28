import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './room.dto';
import { MongooseExceptionFilter } from 'src/filters/mongoose-exception.filter';

@Controller('room')
@UseFilters(MongooseExceptionFilter)
export class RoomController {
    constructor(private roomService: RoomService){}

    @Post('create')
    public createRoomOneToOne(@Body() credential: RoomDto){
        return this.roomService.createRoomOneToOne({ room: credential})
    }
}
