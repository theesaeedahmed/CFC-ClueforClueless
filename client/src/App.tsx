import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<div>Home login page</div>} />
      <Route path="/signup" element={<div>Home page</div>} />
    </Routes>
  );
}
