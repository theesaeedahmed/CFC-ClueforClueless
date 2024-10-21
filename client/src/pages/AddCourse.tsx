import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../adminComponents/Navbar";
import Sidebar from "../adminComponents/Sidebar";
import toast from "react-hot-toast";
import Footer from "@/adminComponents/Footer";
import AddCourseForm from "@/adminComponents/AddCourseForm";

const AddCourse = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show a success message
    toast.success("Logged out successfully");
    // Redirect to the landing page
    navigate("/");
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="w-full">
        <Navbar onLogout={handleLogout} />{" "}
      </header>
      <div className="flex flex-1">
        <aside className="transition-width">
          <Sidebar />
        </aside>
        <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
          <AddCourseForm />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AddCourse;
