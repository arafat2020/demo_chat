import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.model';
import { LibService } from 'src/lib/lib.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    }
  ]),
  JwtModule
],
  controllers: [UserController],
  providers: [UserService, LibService]
})
export class UserModule {}
