import React,{useContext} from "react";
import StudentEnrollmentChart from "./StudentEnrollmentChart";
import StatsCard from "../adminComponents/StatsCard";
import { AuthContext } from "@/context/AuthContext";
import {
  FaBook,
  FaUser,
  FaChalkboardTeacher,
  FaTrophy,
  FaChartLine,
  FaPlay,
} from "react-icons/fa";

const Dashboard = () => {
  const { userData } = useContext(AuthContext);
  console.log("Dashboard User Data:", userData);
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Hello, {userData ? userData.name : 'User'}</h1>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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
          {/* <StatsCard
              title="Total Institutes"
              value={30}
              description="Institutes using the platform"
              icon={<FaUniversity size={30} />}
            /> */}
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
        </div>
      </div>
      <StudentEnrollmentChart />
    </div>
  );
};

export default Dashboard;
