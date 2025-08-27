import { DEFAULT_FORM_SCHEMA } from "./formSchema";

export const FORM_STEPS = [
    {
        label: "Personal Info",
        fields: [DEFAULT_FORM_SCHEMA[0], DEFAULT_FORM_SCHEMA[1] /* full_name, gender */],
    },
    {
        label: "Preferences",
        fields: [DEFAULT_FORM_SCHEMA[2], DEFAULT_FORM_SCHEMA[3] /* hobbies, country */],
    },
    {
        label: "Additional Info",
        fields: [DEFAULT_FORM_SCHEMA[4], DEFAULT_FORM_SCHEMA[5] /* birth_date, profile_picture */],
    },
];
