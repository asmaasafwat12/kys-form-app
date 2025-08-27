# KYC Form App

A multi-step KYC (Know Your Customer) form built with **React**, **Material UI**, **react-hook-form**, and **Zod**.  
It supports validation, local storage persistence, file uploads, and dynamic rendering of form fields.

---

## Features

-   Multi-step form with **Next / Back** navigation
-   Form validation using **Zod** schema
-   Local storage persistence of form data
-   Support for multiple field types:
    -   Text, Email, Number
    -   Drop-down, Radio buttons, Multi-choice (checkboxes)
    -   File upload
    -   Date picker
-   Responsive UI using Material UI
-   Clear error messages for required fields
-   Multi-step navigation with progress stepper
-   Reset form and clear local storage on submit

---

## Project Structure

src/
├─ components/ # Form components and field renderers
├─ constants/ # Form schema and steps definitions
├─ types/ # TypeScript types
├─ utils/ # Helper functions like renderField & buildZodSchema
└─ App.tsx # Main app entry point

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
Start the development server:
npm run dev

Build for production:
npm run build

Preview production build:
npm run preview

