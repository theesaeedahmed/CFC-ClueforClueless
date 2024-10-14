import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login"
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
  );
}
