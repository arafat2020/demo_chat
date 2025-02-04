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
        user,
        uploadFile
    }: {
        user: UserLoginType,
        uploadFile: Express.Multer.File
    }): Promise<{
        user: Partial<User>
        token: string
    }> {
        if (await this.UserModel.findOne({ email: user.email })) throw new HttpException('Email already taken', HttpStatus.CONFLICT)
        if (await this.UserModel.findOne({ username: user.username })) throw new HttpException('Username already taken', HttpStatus.CONFLICT)
        user.password = await this.lib.hashPassword({ password: user.password });
        const fileInstance = await this.uploadService.uploadFile(uploadFile)
        const created = await this.UserModel.create({
            name: user.name,
            username: user.username,
            password: user.password,
            email: user.email,
            active: true,
            file: fileInstance.id
        });
        const createdUser = await created.save();
        return {
            user: {
                name: createdUser.name,
                username: createdUser.username,
                email: createdUser.email,
                active: createdUser.active,
                file: fileInstance
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
        }).populate("file")
        if (!isExist) throw new HttpException('User not found', HttpStatus.NOT_FOUND)


        const isMatch = await this.lib.comparePassword({
            hashedPassword: isExist.password,
            password: user.password
        })

        if (!isMatch) throw new HttpException('Wrong Password', HttpStatus.UNAUTHORIZED)
        return {
            user: {
                name: isExist.name,
                username: isExist.username,
                email: isExist.email,
                active: isExist.active,
                file: isExist.file
            },
            token: await this.jwt.signAsync({ id: isExist.id }, {
                secret: this.config.get('JWT_SECRET'),
                expiresIn: '24h'
            })
        }
    }

    public async getMe({ header }: {
        header: UserFormHeaderSchema
    }): Promise<Partial<User>> {
        console.log(header.user);
        
        const user = await this.UserModel.findById(header.user?.id).populate("file")

        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        return {
            name: user.name,
            username: user.username,
            email: user.email,
            active: user.active,
            file: user.file
        }
    }

}
