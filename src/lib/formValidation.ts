import { z } from "zod";
import { FORM_CONFIG } from "@/config/constants";

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(FORM_CONFIG.maxNameLength, {
      message: `Name must be less than ${FORM_CONFIG.maxNameLength} characters`,
    }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(FORM_CONFIG.maxEmailLength, {
      message: `Email must be less than ${FORM_CONFIG.maxEmailLength} characters`,
    }),
  projectType: z.string().min(1, { message: "Please select a project type" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(FORM_CONFIG.maxMessageLength, {
      message: `Message must be less than ${FORM_CONFIG.maxMessageLength} characters`,
    }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Sanitize user input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, "") // Remove angle brackets
    .trim();
};
