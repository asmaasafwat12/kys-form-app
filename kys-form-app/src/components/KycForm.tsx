import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Box, Typography, Stepper, Step, StepLabel, Snackbar, Alert } from "@mui/material";
import { renderField } from "../utils/renderField";
import { DEFAULT_FORM_SCHEMA } from "../constants/formSchema";
import { buildZodSchema } from "../utils/buildZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORM_STEPS } from "../constants/formSteps";
import { KycFormData } from "../types/kycForm";

const KycForm = () => {
    const schema = buildZodSchema(DEFAULT_FORM_SCHEMA);
    const [currentStep, setCurrentStep] = React.useState(0);
    const LOCAL_STORAGE_KEY = "kycFormData";
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success",
    });
    const {
        control,
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<KycFormData>({
        resolver: zodResolver(schema),
        defaultValues: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"),
    });
    const formData = watch();

    // Save to localStorage whenever form data changes
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    const onSubmit = (data: KycFormData) => {
        console.log("Form Data:", data);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        reset({}, { keepDefaultValues: false });
        setCurrentStep(0);
        setSnackbar({ open: true, message: "Form submitted successfully!", severity: "success" });
    };

    const handleFormError = () => {
        setSnackbar({ open: true, message: "Please fill all required fields", severity: "error" });
    };

    return (
        <Box sx={{ width: "50%", margin: "auto", padding: 4 }}>
            <Typography variant="h1" align="center" gutterBottom>
                KYC Form
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                Please fill out the form below to complete your KYC process.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stepper activeStep={currentStep}>
                    {FORM_STEPS.map((step) => (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {/* Render fields for the current step */}
                {FORM_STEPS[currentStep].fields.map((field) => (
                    <React.Fragment key={field.id}>{renderField(field, control, register, errors)}</React.Fragment>
                ))}
                {/* Navigation Buttons */}
                <Box sx={{ mt: 2 }}>
                    <Button disabled={currentStep === 0} onClick={() => setCurrentStep((prev) => prev - 1)}>
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => {
                            if (currentStep === FORM_STEPS.length - 1) {
                                handleSubmit(onSubmit, handleFormError)();
                            } else {
                                // Check if current step has errors
                                const stepHasErrors = FORM_STEPS[currentStep].fields.some((field) => errors[field.id]);
                                if (stepHasErrors) {
                                    handleFormError();
                                } else {
                                    setCurrentStep((prev) => prev + 1);
                                }
                            }
                        }}>
                        {currentStep === FORM_STEPS.length - 1 ? "Submit" : "Next"}
                    </Button>
                </Box>
            </form>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default KycForm;
