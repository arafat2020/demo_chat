import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Room } from "./room.model";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.model";
import { FileDoc } from "./file.model";

@Schema()
export class Message {

    @Prop()
    content: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'FileDoc'
    })
    file: FileDoc

    @Prop({
        default: Date.now()
    })
    created: Date

    @Prop({
        default: Date.now()
    })
    updated: Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
    room: Room

    @Prop({
        default: false
    })
    isDeleted: boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

}

export type MessageDocument = HydratedDocument<Message>;
export const MessageSchema = SchemaFactory.createForClass(Message);

