import { z } from "zod";
import { Types } from "mongoose";

// Zod schema for Message
export const MessageSchemaZod = z.object({
    content: z.string().min(1, "Content is required").optional(), // Ensures content is not empty
    created: z.preprocess((val) => new Date(val as string), z.date()).default(new Date()), // Defaults to current date
    updated: z.preprocess((val) => new Date(val as string), z.date()).default(new Date()), // Defaults to current date
    room: z.instanceof(Types.ObjectId).or(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Room ID")), // Ensures valid ObjectId
    isDeleted: z.boolean().default(false), // Default is false
    user: z.instanceof(Types.ObjectId).or(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID")) // Ensures valid ObjectId
});

export const UpdateMessageSchema = z.object({
    id: z.instanceof(Types.ObjectId).or(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Room ID")),
    content: z.optional(z.string().min(1, "Content is required")), // Ensures content is not empty
    file: z.optional(z.string().optional()),
    updated: z.optional(z.preprocess((val) => new Date(val as string), z.date()).default(new Date()),) // Defaults to current date
})

// TypeScript Type (Inferred from Zod Schema)
export type MessageDto = z.infer<typeof MessageSchemaZod>;
