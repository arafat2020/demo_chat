import mongoose from "mongoose";
import { z } from "zod";

export const RoomSchemaOneToOne = z.object({
    name: z.optional(z.string()),
    userOneId: z.instanceof(mongoose.Schema.Types.ObjectId),
    userTwoId: z.instanceof(mongoose.Schema.Types.ObjectId),
})

export type RoomType = z.infer<typeof RoomSchemaOneToOne>