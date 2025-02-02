import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { FileDoc } from "./file.model";

@Schema()
export class User {

    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
        unique: true,
    })
    username: string;

    @Prop()
    password: string;

    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    pic: string;

    @Prop({
        default: Date.now(),
    })
    joiningDate: Date;

    @Prop({
        default: false,
    })
    active: boolean;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'File'
    })
    files: FileDoc

}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
