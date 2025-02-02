import { Global, Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileDoc, FileSchema } from 'src/schemas/file.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FileDoc.name,
        schema: FileSchema,
      }
    ])
  ],
  providers: [UploadService],
  controllers: [UploadController]
})

export class UploadModule { }
