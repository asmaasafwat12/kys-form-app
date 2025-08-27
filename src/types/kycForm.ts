import { z } from "zod";
import { buildZodSchema } from "../utils/buildZodSchema";
import { DEFAULT_FORM_SCHEMA } from "../constants/formSchema";

export const kycSchema = buildZodSchema(DEFAULT_FORM_SCHEMA);

export type KycFormData = z.infer<typeof kycSchema>;
