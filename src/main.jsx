import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TemperatureProvider } from "./context/TemperatureContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TemperatureProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TemperatureProvider>
  </StrictMode>
);
