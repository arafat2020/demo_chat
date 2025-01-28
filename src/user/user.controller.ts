import { Body, Controller, Get, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { ExtendedHeaderDto, UserDto, UserSigninDto } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    
    @Post('/signup')
    public async signup(@Body() credential: UserDto){
        return this.userService.signup({
            user: credential
        });
    }

    @Post('/signin')
    public async signin(@Body() credential: UserSigninDto) {
         return this.userService.signin({
             user: credential
         })
    }

    @Get('/me')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    public async me(@Request() req:ExtendedHeaderDto) {
        return 
    }
}
