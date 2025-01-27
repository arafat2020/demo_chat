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


export type UserLoginType = z.infer<typeof UserSignUpSchema>;
export type UserSigninType = z.infer<typeof UserSigninSchema>;
