import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Layout/Header/Header';
import Home from './Components/Home/Home';
import CoursePlayer from './Components/Courses/CoursePlayer/CoursePlayer';
import Signup from './Components/Authentication/Signup/Signup';
import LoginPage from './Components/Authentication/Login/Login';
import InstructorDashboard from './Components/Instructor/InstrutcorProfile/InstructorDashboard';
import BlogSection from './Components/Blogs/BlogSection';
import CourseSection from './Components/Courses/CourseSection';
import CreateNewCourse from './Components/Courses/CreateNewCourse';
import CreateBlogPage from './Components/Blogs/CreateBlogPage';
import ManageCoursesPage from './Components/Courses/ManageCourses/ManageCoursesPage';
import EditCoursePage from './Components/Courses/ManageCourses/EditCoursePage';
import StudentDashboard from './Components/Student/StudentDashboard/StudentDashboard';
import StudentProfile from './Components/Student/StudentProfile/StudentProfile';
import UpdatestudentProfile from './Components/Student/StudentProfile/UpdatestudentProfile';
import { UserProvider } from './Components/Layout/Header/UserContext';
import CreateCourse from './Components/Courses/ManageCourses/CreateCourse'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/ProtectionRoute/ProtectionRoute'; // Import the ProtectedRoute component
import InstructorProfile from './Components/Instructor/InstrutcorProfile/InstructorProfile';
import CourseOutline from './Components/Courses/CourseOutLine';
import Contact from './Components/Contact';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/course-player' element={<CoursePlayer />} /> */}
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/blog' element={<BlogSection />} />
            <Route path='/courses' element={<CourseSection />} />
            <Route path='/upload-course' element={<CreateCourse />} />
            <Route path='/course-outline' element={<CourseOutline />} />
            <Route path='/contact' element={<Contact />} />
            <Route
              path='/instructor'
              element={
                <ProtectedRoute allowedRoles={['Instructor', 'Admin']}>
                  <InstructorDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path='/course-player'
              element={
                <ProtectedRoute allowedRoles={['Student']}>
                  < CoursePlayer />
                </ProtectedRoute>
              }
            />

            <Route
              path='/student'
              element={
                <ProtectedRoute allowedRoles={['Student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/new-course'
              element={
                <ProtectedRoute allowedRoles={['Instructor', 'Admin']}>
                  <CreateNewCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path='/write-blog'
              element={
                <ProtectedRoute allowedRoles={['Instructor', 'Admin']}>
                  <CreateBlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/manage-courses'
              element={
                <ProtectedRoute allowedRoles={['Instructor', 'Admin']}>
                  <ManageCoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/edit-course/:id'
              element={
                <ProtectedRoute allowedRoles={['Instructor', 'Admin']}>
                  <EditCoursePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/student-profile'
              element={
                <ProtectedRoute allowedRoles={['Student']}>
                  <StudentProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path='/instructor-profile'
              element={
                <ProtectedRoute allowedRoles={['Instructor']}>
                  <InstructorProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path='/update-profile'
              element={
                <ProtectedRoute allowedRoles={['Student']}>
                  <UpdatestudentProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={false}
          closeOnClick
          draggable
          pauseOnHover
        />
      </Router>
    </UserProvider>
  );
}

export default App;
