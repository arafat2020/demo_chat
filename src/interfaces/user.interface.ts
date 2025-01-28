import mongoose from "mongoose";
import { z } from "zod";

export const UserSignUpSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  pic: z.string().url(),
  joiningDate: z.date(),
  active: z.boolean(),
});

export const UserSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const BaseHeaderSchema = z.object({
  authorization: z.string().min(1, 'Authorization header is required'),
  'x-custom-header': z.string().optional(),
});

export const ExtendedHeaderSchema = BaseHeaderSchema.extend({
  user: z.object({
    id: z.instanceof(mongoose.Schema.Types.ObjectId),
    iat: z.string(),
    exp: z.string(),
  }).optional(),
});

export type UserFormHeaderSchema = z.infer<typeof ExtendedHeaderSchema>
export type UserLoginType = z.infer<typeof UserSignUpSchema>;
export type UserSigninType = z.infer<typeof UserSigninSchema>;
