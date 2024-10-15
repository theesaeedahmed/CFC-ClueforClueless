import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
    <ChakraProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </ChakraProvider>
    </AuthProvider>
  </StrictMode>
);
