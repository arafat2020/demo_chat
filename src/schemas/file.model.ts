import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


@Schema()
export class FileDoc {

    @Prop({
        required: true,
    })
    fileUrl: string;

    @Prop({
        required: true,
        unique: true,
    })
    fileName: string;

    @Prop({
        required: true,
    })
    bucket: string
}

export type FileDocument = HydratedDocument<FileDoc>

export const FileSchema = SchemaFactory.createForClass(FileDoc);