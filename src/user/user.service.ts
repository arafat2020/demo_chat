import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserFormHeaderSchema, UserLoginType, UserSigninType } from 'src/interfaces/user.interface';
import { LibService } from 'src/lib/lib.service';
import { User, UserDocument } from 'src/schemas/user.model';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
        private readonly lib: LibService,
        private readonly jwt: JwtService,
        private readonly config: ConfigService,
        private readonly uploadService: UploadService 
    ) { }

    public async signup({
        user
    }: { 
        user: UserLoginType,
        uploadFile: Express.Multer.File
     }): Promise<{
        user: Partial<User>
        token: string
    }> {
        user.password = await this.lib.hashPassword({ password: user.password });
        const created = await this.UserModel.create(user);
        const createdUser = await created.save();
        return {
            user: {
                name: createdUser.name,
                username: createdUser.username,
                email: createdUser.email,
                active: createdUser.active
            },
            token: await this.jwt.signAsync({ id: createdUser._id }, {
                secret: this.config.get('JWT_SECRET'),
                expiresIn: '24h'
            })
        }
    }

    public async signin({
        user
    }: {
        user: UserSigninType
    }): Promise<{
        user: Partial<User>
        token: string
    }> {
        const isExist = await this.UserModel.findOne({
            email: user.email
        })
        if (!isExist) throw new HttpException('User not found', HttpStatus.NOT_FOUND)


        const isMatch = await this.lib.comparePassword({
            hashedPassword: isExist.password,
            password: user.password
        })

        if (!isMatch) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
        return {
            user: {
                name: isExist.name,
                username: isExist.username,
                email: isExist.email,
                active: isExist.active
            },
            token: await this.jwt.signAsync({ id: isExist._id }, {
                secret: this.config.get('JWT_SECRET'),
                expiresIn: '24h'
            })
        }
    }

    public async getMe({ header }: {
        header: UserFormHeaderSchema
    }): Promise<Partial<User>> {
        const user = await this.UserModel.findOne({
            _id: header.user?.id
        })

        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        return {
            name: user.name,
            username: user.username,
            email: user.email,
            active: user.active,
            pic: user.pic
        }
    }

}
