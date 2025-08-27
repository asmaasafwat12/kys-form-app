import { Controller } from "react-hook-form";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Typography,
    Button,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const renderField = (formSchema, control, register, errors) => {
    switch (formSchema.type) {
        case "text":
        case "email":
        case "number":
            return (
                <>
                    <TextField
                        key={formSchema.id}
                        label={formSchema.label}
                        type={formSchema.type}
                        fullWidth
                        margin="normal"
                        {...register(formSchema.id, { required: formSchema.required })}
                        error={!!errors[formSchema.id]}
                        helperText={errors[formSchema.id]?.message}
                    />
                </>
            );

        case "drop_down":
            return (
                <FormControl fullWidth margin="normal" key={formSchema.id} error={!!errors[formSchema.id]}>
                    <InputLabel>{formSchema.label}</InputLabel>
                    <Controller
                        name={formSchema.id}
                        defaultValue=""
                        control={control}
                        rules={{ required: formSchema.required }}
                        render={({ field }) => (
                            <Select {...field} label={formSchema.label}>
                                {formSchema.options.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    {errors[formSchema.id] && (
                        <Typography color="error" variant="caption">
                            {errors[formSchema.id]?.message as string}
                        </Typography>
                    )}
                </FormControl>
            );

        case "radio_buttons":
            return (
                <FormControl fullWidth margin="normal" key={formSchema.id} error={!!errors[formSchema.id]}>
                    <Typography>{formSchema.label}</Typography>
                    <Controller
                        name={formSchema.id}
                        control={control}
                        defaultValue={""}
                        rules={{ required: formSchema.required }}
                        render={({ field }) => (
                            <RadioGroup {...field}>
                                {formSchema.options.map((option) => (
                                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                                ))}
                            </RadioGroup>
                        )}
                    />
                    {errors[formSchema.id] && (
                        <Typography color="error" variant="caption">
                            {errors[formSchema.id]?.message as string}
                        </Typography>
                    )}
                </FormControl>
            );

        case "multi_choice":
            return (
                <FormControl fullWidth margin="normal" key={formSchema.id} error={!!errors[formSchema.id]}>
                    <Typography>{formSchema.label}</Typography>
                    <Controller
                        name={formSchema.id}
                        control={control}
                        rules={{ required: formSchema.required }}
                        render={({ field }) => (
                            <>
                                {formSchema.options.map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        control={
                                            <Checkbox
                                                checked={field.value?.includes(option) || false}
                                                onChange={(e) => {
                                                    const newValue = e.target.checked
                                                        ? [...(field.value || []), option]
                                                        : field.value.filter((v) => v !== option);
                                                    field.onChange(newValue);
                                                }}
                                            />
                                        }
                                        label={option}
                                    />
                                ))}
                            </>
                        )}
                    />
                    {errors[formSchema.id] && (
                        <Typography color="error" variant="caption">
                            {errors[formSchema.id]?.message as string}
                        </Typography>
                    )}
                </FormControl>
            );

        case "date_picker":
            return (
                <Controller
                    key={formSchema.id}
                    name={formSchema.id}
                    control={control}
                    defaultValue=""
                    render={({ field: controllerField }) => (
                        <TextField
                            {...controllerField}
                            type="date"
                            fullWidth
                            margin="normal"
                            label={formSchema.label}
                            slotProps={{ inputLabel: { shrink: true } }}
                            error={!!errors[formSchema.id]}
                            helperText={errors[formSchema.id]?.message}
                        />
                    )}
                />
            );

        case "file_upload":
            return (
                <Controller
                    key={formSchema.id}
                    name={formSchema.id}
                    control={control}
                    defaultValue={null}
                    render={({ field: controllerField }) => (
                        <FormControl fullWidth margin="normal" error={!!errors[formSchema.id]}>
                            <Typography>{formSchema.label}</Typography>

                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                {controllerField.value ? "Change File" : "Upload File"}
                                <input type="file" hidden onChange={(event) => controllerField.onChange(event.target.files?.[0] || null)} />
                            </Button>

                            {controllerField.value && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Selected: {controllerField.value.name}
                                </Typography>
                            )}

                            <Typography color="error" variant="caption">
                                {errors[formSchema.id]?.message}
                            </Typography>
                        </FormControl>
                    )}
                />
            );

        default:
            return null;
    }
};
