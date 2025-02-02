import { z } from 'zod';

export const FileZodSchema = z.object({
  fileUrl: z.string().url({ message: "Invalid URL format" }), // Validate as a URL
  fileName: z.string().min(1, { message: "File name is required" }), // Required and non-empty
  bucket: z.string().min(1, { message: "Bucket is required" }), // Required and non-empty
});

// TypeScript type inferred from the Zod schema
export type FileZodType = z.infer<typeof FileZodSchema>;
