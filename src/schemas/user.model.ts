import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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

}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
