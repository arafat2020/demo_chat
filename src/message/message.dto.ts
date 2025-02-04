import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import mongoose, { Types } from "mongoose";
import { createZodDto } from "nestjs-zod";
import { MessageSchemaZod, UpdateMessageSchema } from "src/interfaces/message.interface";
import { z } from "zod";

export class CreateMessageDto extends createZodDto(MessageSchemaZod) {

    @ApiProperty({
        example: "Hello, this is a test message.",
        description: "The content of the message",
        required: false
    })
    content?: string;

    @ApiProperty({
        type: 'string', 
        format: 'binary', 
        example: "https://example.com/file.jpg",
        description: "The file URL associated with the message (optional)",
        required: false,
    })
    file?: Express.Multer.File;

    @ApiProperty({
        example: "64f9382e8e4a9b3c80d12345",
        description: "The ObjectId of the room",
        type: String, // 👈 Ensure Swagger recognizes it as a string
    })
    room: string | Types.ObjectId; // 👈 Allow both string and ObjectId

    @ApiProperty({
        example: false,
        description: "Flag indicating if the message is deleted",
    })
    isDeleted: boolean = false;

    @ApiProperty({
        example: "64f9382e8e4a9b3c80d67890",
        description: "The ObjectId of the user sending the message",
        type: String, // 👈 Ensure Swagger recognizes it as a string
    })
    user: string | Types.ObjectId; // 👈 Allow both string and ObjectId
}

export class DeleteMessageDto extends createZodDto(z.object({
    id: z.instanceof(Types.ObjectId)
})){

    @ApiProperty({
        example: "64f9382e8e4a9b3c80d67890",
        description: "The ObjectId of message",
        type: String, // 👈 Ensure Swagger recognizes it as a string
    })
    id: Types.ObjectId; // 👈 Al
}

export class GetMessageDto extends createZodDto(z.object({
    id: z.instanceof(Types.ObjectId)
})){

    @ApiProperty({
        example: "64f9382e8e4a9b3c80d67890",
        description: "The ObjectId of Room",
        type: String, // 👈 Ensure Swagger recognizes it as a string
    })
    roomId: Types.ObjectId; // 👈 Al
}

export class UpdateMessageDto extends createZodDto(UpdateMessageSchema) {
    @ApiProperty({
        example: "64f9382e8e4a9b3c80d12345",
        description: "The ObjectId of the message to update",
        type: String,
    })
    id: string | Types.ObjectId;

    @ApiPropertyOptional({
        example: "Updated message content.",
        description: "The updated content of the message (optional)",
    })
    content?: string;

    @ApiPropertyOptional({
        example: "https://example.com/updated-file.jpg",
        description: "The updated file URL associated with the message (optional)",
    })
    file?: string;

    @ApiPropertyOptional({
        example: "2025-02-01T12:00:00.000Z",
        description: "The timestamp of when the message was last updated (optional, defaults to current date)",
        type: String,
    })
    updated?: Date;
}