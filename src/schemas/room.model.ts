import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.model";

@Schema()
export class Room{

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    })
    users: User[]

    @Prop({
        required: true,
        default: false
    })
    isGroup: boolean

    @Prop()
    name: string

} 

export type RoomDocument = HydratedDocument<Room>;

export const RoomSchema = SchemaFactory.createForClass(Room);
