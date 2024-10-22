import React from 'react'; 
import { useNavigate } from "react-router-dom";
import Navbar from "../adminComponents/Navbar";
import Sidebar from "../adminComponents/Sidebar";
import toast from "react-hot-toast";
import Footer from "@/adminComponents/Footer";
import adminData from '@/DummyData/adminData';
import CourseCard from '@/adminComponents/CourseCard';
import Carousel from "@/components/Carousel";  // Import Carousel component

const AdminViewCourse = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleDelete = (id: number) => {
    console.log(`Course with ID ${id} deleted.`);
    // Add logic to delete the course from state or backend
  };

  const handleMoveToDraft = (id: number) => {
    console.log(`Course with ID ${id} moved to draft.`);
    // Add logic to update the course state or backend to set isPublished = false
  };

  const handlePublish = (id: number) => {
    console.log(`Course with ID ${id} published.`);
    // Add logic to publish the course (set isPublished = true)
  };

  // Separate the courses into published and draft based on isPublished property
  const publishedCourses = adminData.filter(course => course.isPublished);
  const draftCourses = adminData.filter(course => !course.isPublished);

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="w-full">
          <Navbar onLogout={handleLogout} />
        </header>
        <div className="flex flex-1">
          <aside className="transition-width">
            <Sidebar />
          </aside>
          <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
            <div className="container mx-auto p-6">
              
              {/* Published Courses Section */}
              <h2 className="text-2xl font-bold mb-4">Published Courses</h2>
              <Carousel>
                {publishedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    thumbnail={course.thumbnail}
                    category={course.category}
                    price={course.price}
                    description={course.description}
                    moduleName={course.moduleName}
                    sectionName={course.sectionName}
                    isPublished={course.isPublished}
                    onDelete={() => handleDelete(course.id)}
                    onPublish={undefined}  // Remove the publish button for published courses
                    extraButton={
                      <button 
                        className="text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleMoveToDraft(course.id)}
                      >
                        Move to Draft
                      </button>
                    }
                  />
                ))}
              </Carousel>

              {/* Draft Courses Section */}
              <h2 className="text-2xl font-bold mt-8 mb-4">Draft Courses</h2>
              <Carousel>
                {draftCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    thumbnail={course.thumbnail}
                    category={course.category}
                    price={course.price}
                    description={course.description}
                    moduleName={course.moduleName}
                    sectionName={course.sectionName}
                    isPublished={course.isPublished}
                    onDelete={() => handleDelete(course.id)}
                    onPublish={() => handlePublish(course.id)}  // Add the publish button for draft courses
                  />
                ))}
              </Carousel>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminViewCourse;
