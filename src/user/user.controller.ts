import { Body, Controller, Post } from '@nestjs/common';
import { UserDto, UserSigninDto } from './user.dto';
import { UserService } from './user.service';

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
}
