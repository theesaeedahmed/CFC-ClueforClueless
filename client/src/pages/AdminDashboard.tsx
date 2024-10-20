import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
        {/* Sidebar on the left */}
        <aside className="transition-width">
          <Sidebar />
        </aside>

        {/* Dashboard content on the right */}
        <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
          <Dashboard />
        </main>
      </div>

      {/* Footer at the bottom */}
      <Footer/>
    </div>
  );
};

export default AdminDashboard;
