import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {

    constructor(private uploadService: UploadService){}

    @Post('img')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile(
        new ParseFilePipe({
            validators:[
                new MaxFileSizeValidator({ maxSize: 1024*100 }),
                new FileTypeValidator({ fileType: /(jpeg|png|jpg|gif|webp)$/ }),
            ]
        })
    ) file:Express.Multer.File) {
        return this.uploadService.uploadFile(file)
    }

}

