// import { useState } from 'react'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Header from './Components/Layout/Header/Header'
// import Home from './Components/Home/Home'
// import CoursePlayer from './Components/Courses/CoursePlayer/CoursePlayer'
// import Signup from './Components/Authentication/Signup/Signup'
// import LoginPage from './Components/Authentication/Login/Login'
// import InstructorDashboard from './Components/Instructor/InstrutcorProfile/InstructorDashboard'
// import BlogSection from './Components/Blogs/BlogSection'
// import CourseSection from './Components/Courses/CourseSection'
// import CreateNewCourse from './Components/Courses/CreateNewCourse'
// import CreateBlogPage from './Components/Blogs/CreateBlogPage'
// import ManageCoursesPage from './Components/Courses/ManageCourses/ManageCoursesPage'
// import EditCoursePage from './Components/Courses/ManageCourses/EditCoursePage'
// import StudentDashboard from './Components/Student/StudentDashboard/StudentDashboard'
// import StudentProfile from './Components/Student/StudentProfile/StudentProfile'
// import UpdatestudentProfile from './Components/Student/StudentProfile/UpdatestudentProfile';
// import { UserProvider } from '../src/Components/Layout/Header/UserContext'; 
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <UserProvider>

//     <Router>
//       <Header />
//       <main>
//         <Routes>
//           <Route path='/' element={<Home></Home>}></Route>
//           <Route path='/course-player' element={<CoursePlayer></CoursePlayer>} />
//           <Route path='/signup' element={<Signup></Signup>} />
//           <Route path='/login' element={<LoginPage></LoginPage>} />
//           <Route path='/blog' element={<BlogSection></BlogSection>} />
//           <Route path='/courses' element={<CourseSection></CourseSection>} />
//           <Route path="/instructor" element={<InstructorDashboard ></InstructorDashboard >} />
//           <Route path="/student" element={<StudentDashboard></StudentDashboard>} />
//           <Route path="/new-course" element={<CreateNewCourse></CreateNewCourse>} />
//           <Route path="/write-blog" element={<CreateBlogPage></CreateBlogPage>} />
//           <Route path="/manage-courses" element={<ManageCoursesPage></ManageCoursesPage>} />
//           <Route path="/edit-course/:id" element={<EditCoursePage></EditCoursePage>} />
//           <Route path="/student-profile" element={<StudentProfile></StudentProfile>} />
//           <Route path="/update-profile" element={<UpdatestudentProfile />} />

//         </Routes>
//         {/* <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/courses" element={<CoursesPage />} />
//           <Route path="/blog" element={<BlogPage />} />
//           Add other routes as needed
//         </Routes> */}
//       </main>
//       <ToastContainer
//         position="top-right"
//         autoClose={500}
//         hideProgressBar={false}
//         closeOnClick
//         draggable
//         pauseOnHover
//       />
//       {/* <Footer /> */}

//     </Router>
//     </UserProvider>

//   )
// }

// export default App




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
import { UserProvider } from '../src/Components/Layout/Header/UserContext'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/ProtectionRoute/ProtectionRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/course-player' element={<CoursePlayer />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/blog' element={<BlogSection />} />
            <Route path='/courses' element={<CourseSection />} />
            <Route 
              path='/instructor' 
              element={
                <ProtectedRoute allowedRoles={['Instructor', 'Admin']}>
                  <InstructorDashboard />
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
              path='/update-profile' 
              element={
                <ProtectedRoute allowedRoles={['Student', 'Instructor']}>
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
