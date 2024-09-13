import React from 'react';
import Courses from '../Courses/CourseSection';
import BlogSection from '../Blogs/BlogSection';
import Footer from '../Layout/Footer/Footer';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate = useNavigate();
    return (
        <div className="">
            <div className="container mx-auto px-4">

                <section className=" text-white text-center py-16">
                    <div className="container mx-auto">
                        <h1 className="text-5xl font-bold mb-4">Welcome to Our Learning Platform</h1>
                        <p className="text-xl mb-8">Your journey to knowledge begins here. Explore our popular courses and start learning today.</p>
                        <button onClick={() => navigate('/signup')} className="bg-blue-900 p-3 rounded text-lg hover:bg-blue-700 mx-2">Sign Up</button>
                        <button className="bg-gray-700 p-3 rounded text-lg hover:bg-gray-800 mx-2">Start Learning</button>
                    </div>
                </section>


                <Courses></Courses>
                <BlogSection></BlogSection>
                <Footer></Footer>
            </div>

            {/* <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <BlogSection /> */}
        </div>
    );
};

export default Home;