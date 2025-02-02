import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.model';
import { LibService } from 'src/lib/lib.service';
import { JwtModule } from '@nestjs/jwt';
import { UploadService } from 'src/upload/upload.service';
import { FileDoc, FileSchema } from 'src/schemas/file.model';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    },
    {
      name: FileDoc.name,
      schema: FileSchema,
    }
  ]),
  JwtModule
],
  controllers: [UserController],
  providers: [UserService, LibService, UploadService]
})
export class UserModule {}
