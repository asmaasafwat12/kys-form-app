import { useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, IconButton, Grid } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import KycForm from "./components/KycForm";
import getTheme from "./utils/getTheme";

const App = () => {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const theme = useMemo(() => getTheme(mode), [mode]);

    const toggleMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh", p: 2, position: "relative" }}>
                {/* Dark/Light Mode Toggle */}
                <IconButton sx={{ position: "absolute", top: 16, right: 16 }} onClick={toggleMode} color="inherit" aria-label="toggle theme">
                    {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                </IconButton>

                {/* Form Component */}
                <KycForm />
            </Grid>
        </ThemeProvider>
    );
};

export default App;
