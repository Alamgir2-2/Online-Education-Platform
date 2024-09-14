import React from 'react';
import { Bar } from 'react-chartjs-2';
import { PieChart } from 'react-minimal-pie-chart';
import { Line } from 'react-chartjs-2';
import Footer from '../../Layout/Footer/Footer';
import man from '../../../assets/man.webp'; // Dummy profile image
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, Filler } from 'chart.js';

// Dummy data for user profile
const user = {
  name: "Student One",
  email: "student1@example.com",
  role: "Student",
  bio: "A passionate learner who loves exploring new technologies and concepts.",
  joinedDate: "January 12, 2023",
  coursesCompleted: 5,
  totalCourses: 10,
  certificatesEarned: 3,
  correctAnswers: 75,
  totalAnswers: 100,
  monthlyProgress: [2, 1, 1, 1, 0, 1], // Example: Completed courses per month for the last 6 months
  videoDuration: [45, 60, 30, 50], // Example: Minutes watched each week
};

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, Filler);

const StudentProfile = () => {
  // Data for the Bar Chart (Monthly Course Progress)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Example months
    datasets: [
      {
        label: 'Courses Completed',
        data: user.monthlyProgress,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Data for the Pie Chart (Correct Answers)
  const correctAnswersPercentage = (user.correctAnswers / user.totalAnswers) * 100;
  const pieChartData = [
    { title: 'Correct', value: correctAnswersPercentage, color: '#4caf50' },
    { title: 'Incorrect', value: 100 - correctAnswersPercentage, color: '#f44336' },
  ];

  // Data for the Line Chart (Video Duration)
  const videoDurationData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Example weeks
    datasets: [
      {
        label: 'Minutes Watched',
        data: user.videoDuration,
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
              src={man} // Replace with user image if available
              alt="User Avatar"
              className="rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 mx-auto"
            />
            <div className="mt-2 lg:mt-4">
              <h1 className="text-lg lg:text-xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-200">{user.email}</p>
              <p className="text-gray-300">Role: {user.role}</p>
              <p className="text-gray-300">Joined: {user.joinedDate}</p>
            </div>
          </div>
        </div>

        {/* Center Section - Profile Details */}
        <div className="flex-grow space-y-4 lg:space-y-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Card 1: Monthly Course Progress */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 lg:p-8 shadow-lg">
              <h3 className="text-base lg:text-lg font-semibold text-gray-300">Monthly Course Progress:</h3>
              <div className="w-full h-64 lg:h-80">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </div>

            {/* Card 2: Quiz Performance (Pie Chart) */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 lg:p-8 shadow-lg">
              <h3 className="text-base lg:text-lg font-semibold text-gray-300">Quiz Performance:</h3>
              <p className="text-gray-400 mt-2">{`Answered ${user.correctAnswers} out of ${user.totalAnswers} questions correctly.`}</p>
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

            {/* Card 3: Module Finish Track */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 lg:p-8 shadow-lg col-span-2">
              <h3 className="text-base lg:text-lg font-semibold text-gray-300">Module Finish Track:</h3>
              <div className="grid grid-cols-7 gap-2">
                {/* Example grid for modules (You can customize based on actual data) */}
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 lg:w-8 lg:h-8 text-center ${i < user.coursesCompleted ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Video Duration */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 lg:p-8 shadow-lg col-span-2">
              <h3 className="text-base lg:text-lg font-semibold text-gray-300">Video Duration:</h3>
              <div className="w-full h-64 lg:h-80">
                <Line data={videoDurationData} options={chartOptions} />
              </div>
              <p className="text-gray-400 mt-2">Shows the total minutes spent watching videos over the last month.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentProfile;
