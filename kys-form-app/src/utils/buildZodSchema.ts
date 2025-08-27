import { z } from "zod";

export const buildZodSchema = (formSchemaArray: any[]) => {
    const shape: Record<string, z.ZodTypeAny> = {};

    formSchemaArray.forEach((field) => {
        switch (field.type) {
            case "text":
            case "email": {
                let schema = z.string();

                if (field.required) {
                    schema = schema.min(1, `${field.label} is required`);
                }

                if (field.type === "email") {
                    schema = schema.email("Invalid email");
                }

                shape[field.id] = schema;
                break;
            }

            case "drop_down":
            case "radio_buttons": {
                let schema: z.ZodTypeAny;
                if (field.required) {
                    schema = z.string({ message: `${field.label} is required` }).min(1, `${field.label} is required`);
                } else {
                    schema = z.string().optional();
                }
                shape[field.id] = schema;
                break;
            }

            case "multi_choice": {
                let schema: z.ZodTypeAny = z.array(z.string(), { message: `${field.label} is required` }); // base schema

                if (field.required) {
                    schema = z.array(z.string(), { message: `${field.label} is required` }).min(1, { message: `${field.label} is required` });
                }
                if (field.min !== undefined) {
                    schema = (schema as z.ZodArray<z.ZodString>).min(field.min, { message: `Select at least ${field.min} ${field.label}` });
                }

                if (field.max !== undefined) {
                    schema = (schema as z.ZodArray<z.ZodString>).max(field.max, { message: `Select at most ${field.max} ${field.label}` });
                } else {
                    schema = schema.optional();
                }

                shape[field.id] = schema;
                break;
            }

            case "date_picker": {
                let schema: z.ZodTypeAny;
                if (field.required) schema = z.string({ message: `${field.label} is required` }).min(1, `${field.label} is required`);
                else schema = z.string().optional();
                shape[field.id] = schema;
                break;
            }

            case "file_upload": {
                let schema: z.ZodTypeAny;
                if (field.required) schema = z.any().refine((file) => file != null, `${field.label} is required`);
                else schema = z.any().optional();
                shape[field.id] = schema;
                break;
            }

            default: {
                shape[field.id] = z.any();
            }
        }
    });

    return z.object(shape);
};
