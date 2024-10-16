import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import ProtectRoute from "./hooks/ProtectedRoute";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      {/* <Route path="/home" element={
        <ProtectRoute redirect="/login">
          <Home/>
        </ProtectRoute>
      }></Route> */}
      <Route path="/home" element={<Home/>}/>
    </Routes>
  );
}
