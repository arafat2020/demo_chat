import { Body, Controller, FileTypeValidator, Get, Headers, MaxFileSizeValidator, ParseFilePipe, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ExtendedHeaderDto, UserDto, UserSigninDto } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserSignUpSchema } from 'src/interfaces/user.interface';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('signup')
    @ApiConsumes('multipart/form-data') // 🚀 Important for Swagger/OpenAPI
    @UseInterceptors(FileInterceptor('file')) // Assuming a file field named 'profilePicture'
    public async signup(
        @Body() credential: UserDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB limit
                    new FileTypeValidator({ fileType: /(jpeg|png|jpg|gif|webp)$/ }),
                ],
            }))   profilePicture: Express.Multer.File,
    ) {
        // const parseData = UserSignUpSchema.parse(credential)
        console.log(credential.active);
        
        return this.userService.signup({
            user: credential,
            uploadFile: profilePicture,
        });
    }

    @Post('signin')
    public async signin(@Body() credential: UserSigninDto) {
        return this.userService.signin({
            user: credential
        })
    }

    @Get('/me')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    public async me(@Request() req: ExtendedHeaderDto) {
        return this.userService.getMe({
            header: req
        })
    }
}
