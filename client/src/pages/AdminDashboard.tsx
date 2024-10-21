import { useNavigate } from 'react-router-dom'; 
import Navbar from '../adminComponents/Navbar';
import Sidebar from '../adminComponents/Sidebar';
import Dashboard from '../adminComponents/Dashboard';
import toast from 'react-hot-toast';
import Footer from '@/adminComponents/Footer';


const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Show a success message
    toast.success('Logged out successfully');
    // Redirect to the landing page
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <header className="w-full">
        <Navbar onLogout={handleLogout} /> {/* Pass the handleLogout function directly */}
      </header>

      {/* Main content with sidebar and dashboard */}
      <div className="flex flex-1">
        <aside className="transition-width">
          <Sidebar />
        </aside>

        {/* Dashboard content on the right */}
        <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
          
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatsCard
              title="Total Programs Enrolled"
              value={125}
              description="Total learners enrolled across all programs"
              icon={<FaBook size={30} />}
            />
            <StatsCard
              title="Total Learners"
              value={1520}
              description="Total active learners"
              icon={<FaUser size={30} />}
            />
            <StatsCard
              title="Total Institutes"
              value={30}
              description="Institutes using the platform"
              icon={<FaUniversity size={30} />}
            />
            <StatsCard
              title="Total Trainers"
              value={85}
              description="Trainers assigned to courses"
              icon={<FaChalkboardTeacher size={30} />}
            />
            <StatsCard
              title="Programs Completed"
              value={300}
              description="Total programs completed by learners"
              icon={<FaTrophy size={30} />}
            />
            <StatsCard
              title="New Learners (This Month)"
              value={240}
              description="New learners enrolled this month"
              icon={<FaChartLine size={30} />}
            />
            <StatsCard
              title="Active Programs"
              value={40}
              description="Programs currently active"
              icon={<FaPlay size={30} />}
            />
            </div> */}

          <Dashboard />
        </main>
      </div>

      {/* Footer at the bottom */}
      <Footer/>
    </div>
  );
};

export default AdminDashboard;
