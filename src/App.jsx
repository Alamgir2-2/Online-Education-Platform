import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Layout/Header/Header'
import Home from './Components/Home/Home'
import CoursePlayer from './Components/Courses/CoursePlayer/CoursePlayer'
import Signup from './Components/Authentication/Signup/Signup'
import LoginPage from './Components/Authentication/Login/Login'
import InstructorProfilePage from './Components/Instructor/InstrutcorProfile/InProfilePage';
import BlogSection from './Components/Blogs/BlogSection'
import CourseSection from './Components/Courses/CourseSection'
import CreateNewCourse from './Components/Courses/CreateNewCourse'
import CreateBlogPage from './Components/Blogs/CreateBlogPage'
import ManageCoursesPage from './Components/Courses/ManageCourses/ManageCoursesPage'
import EditCoursePage from './Components/Courses/ManageCourses/EditCoursePage'
import StudentDashboard from './Components/Student/StudentDashboard/StudentDashboard'
import StudentProfile from './Components/Student/StudentProfile/StudentProfile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/course-player' element={<CoursePlayer></CoursePlayer>} />
          <Route path='/signup' element={<Signup></Signup>} />
          <Route path='/login' element={<LoginPage></LoginPage>} />
          <Route path='/blog' element={<BlogSection></BlogSection>} />
          <Route path='/courses' element={<CourseSection></CourseSection>} />
          <Route path="/instructor" element={<InstructorProfilePage></InstructorProfilePage>} />
          <Route path="/student" element={<StudentDashboard></StudentDashboard>} />
          <Route path="/new-course" element={<CreateNewCourse></CreateNewCourse>} />
          <Route path="/write-blog" element={<CreateBlogPage></CreateBlogPage>} />
          <Route path="/manage-courses" element={<ManageCoursesPage></ManageCoursesPage>} />
          <Route path="/edit-course/:id" element={<EditCoursePage></EditCoursePage>} />
          <Route path="/student-profile" element={<StudentProfile></StudentProfile>} />

        </Routes>
        {/* <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          Add other routes as needed
        </Routes> */}
      </main>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
      />
      {/* <Footer /> */}

    </Router>

  )
}

export default App
