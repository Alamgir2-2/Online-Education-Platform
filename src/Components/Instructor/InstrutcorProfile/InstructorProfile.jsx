import React from 'react';
import { Bar } from 'react-chartjs-2';
import { PieChart } from 'react-minimal-pie-chart';
import { Line } from 'react-chartjs-2';
import Footer from '../../Layout/Footer/Footer';
import { useUser } from '../../Layout/Header/UserContext';
import instructorImage from '../../../assets/photo.jpg'; // Dummy profile image for instructor
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, Filler } from 'chart.js';

// Dummy data for instructor profile
const instructor = {
  name: "Instructor One",
  email: "instructor1@example.com",
  role: "Instructor",
  bio: "An experienced instructor with a passion for teaching and mentoring.",
  joinedDate: "January 5, 2022",
  coursesTaught: 15,
  totalStudents: 150,
  certificatesEarned: 5,
  monthlyEngagement: [5, 7, 3, 8, 4, 6], // Example: Engagement metrics per month for the last 6 months
  feedbackScore: [4.5, 4.7, 4.3, 4.8, 4.6, 4.7], // Example: Feedback scores for the last 6 months
};

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, Filler);

const InstructorProfile = () => {
  const { user } = useUser();

  // Data for the Bar Chart (Monthly Engagement)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Example months
    datasets: [
      {
        label: 'Student Engagement',
        data: instructor.monthlyEngagement,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Data for the Pie Chart (Feedback Score)
  const averageFeedbackScore = (instructor.feedbackScore.reduce((a, b) => a + b, 0) / instructor.feedbackScore.length).toFixed(1);
  const pieChartData = [
    { title: 'Positive Feedback', value: 80, color: '#4caf50' },
    { title: 'Neutral Feedback', value: 15, color: '#ffeb3b' },
    { title: 'Negative Feedback', value: 5, color: '#f44336' },
  ];

  // Data for the Line Chart (Feedback Score)
  const feedbackData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'], // Example weeks
    datasets: [
      {
        label: 'Average Feedback Score',
        data: instructor.feedbackScore,
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row py-4 lg:py-20 px-4 lg:px-0">
        {/* Left Sidebar - Profile Picture and Info */}
        <div className="w-full lg:w-1/4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 lg:p-8 shadow-lg mb-4 lg:mb-0 lg:mr-4 flex-shrink-0">
          <div className="text-center mb-4 lg:mb-6">
            <img
              src={instructorImage} // Replace with instructor image if available
              alt="Instructor Avatar"
              className="rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 mx-auto"
            />
            <div className="mt-2 lg:mt-4">
              <h1 className="text-lg lg:text-xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-200">{user.email}</p>
              <p className="text-gray-300">Role: {user.role}</p>
              <p className="text-gray-300">Joined: {instructor.joinedDate}</p>
              <p className="text-gray-300">{instructor.bio}</p>
            </div>
          </div>
        </div>

        {/* Center Section - Profile Details */}
        <div className="flex-grow space-y-4 lg:space-y-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Card: Courses Taught and Student Engagement */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 lg:p-8 shadow-lg col-span-2">
              <h3 className="text-base lg:text-lg font-semibold text-gray-300">Courses & Engagement:</h3>
              <div className="flex flex-col lg:flex-row justify-between items-center">
                {/* Total Courses Taught */}
                <div className="text-center mb-4 lg:mb-0">
                  <h4 className="text-3xl font-bold text-white">{instructor.coursesTaught}</h4>
                  <p className="text-gray-400">Courses Taught</p>
                </div>

                {/* Total Students */}
                <div className="text-center mb-4 lg:mb-0">
                  <h4 className="text-3xl font-bold text-green-400">{instructor.totalStudents}</h4>
                  <p className="text-gray-400">Total Students</p>
                </div>

                {/* Certificates Earned */}
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-red-400">{instructor.certificatesEarned}</h4>
                  <p className="text-gray-400">Certificates Earned</p>
                </div>
              </div>
            </div>

            {/* Card 1: Monthly Engagement Progress */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 lg:p-8 shadow-lg">
              <h3 className="text-base lg:text-lg font-semibold text-gray-300">Monthly Engagement Progress:</h3>
              <div className="w-full h-64 lg:h-80">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </div>

            {/* Card 2: Feedback Performance (Pie Chart) */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 lg:p-8 shadow-lg">
              <h3 className="text-base lg:text-lg font-semibold text-gray-300">Feedback Performance:</h3>
              <p className="text-gray-400 mt-2">{`Average Feedback Score: ${averageFeedbackScore}`}</p>
              <div className="w-full h-64 lg:h-80">
                <PieChart
                  data={pieChartData}
                  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                  labelStyle={{
                    fontSize: '5px',
                    fontFamily: 'sans-serif',
                    fill: '#fff',
                  }}
                  radius={42}
                  labelPosition={70}
                />
              </div>
            </div>

            {/* Card 3: Feedback Score Tracking */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 lg:p-8 shadow-lg col-span-2">
              <h3 className="text-base lg:text-lg font-semibold text-gray-300">Feedback Score Tracking:</h3>
              <div className="w-full h-64 lg:h-80">
                <Line data={feedbackData} options={chartOptions} />
              </div>
              <p className="text-gray-400 mt-2">Shows the average feedback score over the last 6 months.</p>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InstructorProfile;
