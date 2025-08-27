export const DEFAULT_FORM_SCHEMA = [
    {
        id: "full_name",
        label: "Full Name",
        type: "text",
        required: true,
    },
    {
        id: "gender",
        label: "Gender",
        type: "radio_buttons",
        options: ["Male", "Female", "Other"],
    },
    {
        id: "hobbies",
        label: "Hobbies",
        type: "multi_choice",
        options: ["Reading", "Traveling", "Sports", "Gaming"],
        min: 1,
        max: 3,
    },
    {
        id: "country",
        label: "Country of Residence",
        type: "drop_down",
        options: ["Egypt", "USA", "Germany", "Other"],
    },
    {
        id: "birth_date",
        label: "Birth Date",
        type: "date_picker",
        required: true,
    },
    {
        id: "profile_picture",
        label: "Profile Picture",
        type: "file_upload",
    },
];
