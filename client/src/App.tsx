import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectRoute from "./hooks/ProtectedRoute";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import RoadmapGenerator from "./pages/RoadmapGenerator";
import RoadmapFullscreen from "./pages/RoadmapFullScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/home"
        element={
          <ProtectRoute redirect="/login">
            <Home />
          </ProtectRoute>
        }
      />
      <Route
        path="/roadmap"
        element={
          <ProtectRoute>
            <RoadmapGenerator />
          </ProtectRoute>
        }
      />
      <Route
        path="/roadmap/:roadmapId"
        element={
          <ProtectRoute>
            <RoadmapGenerator />
          </ProtectRoute>
        }
      />
      <Route
        path="/roadmap/:roadmapId/fullscreen"
        element={
          <ProtectRoute>
            <RoadmapFullscreen />
          </ProtectRoute>
        }
      />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
}
