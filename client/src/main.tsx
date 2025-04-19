import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext.tsx";
import { RoadmapProvider } from "./context/RoadmapContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RoadmapProvider>
        <ChakraProvider>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </ChakraProvider>
      </RoadmapProvider>
    </AuthProvider>
  </StrictMode>
);
