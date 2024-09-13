import React from 'react';
import algo from '../../assets/CourseImage/algo.png'
import python from '../../assets/CourseImage/python.png'
import cprogram from '../../assets/CourseImage/cprogram.jpeg'


const CourseSection = () => {

    const courses = [
        { title: 'Algorithm', description: 'Brief description of the course.', image: [algo] },
        { title: 'Python Course', description: 'Brief description of the course.', image: [python] },
        { title: 'C Programming', description: 'Brief description of the course.', image: [cprogram] },
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Popular Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-2xl  text-white"
                        >
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full  rounded object-cover transition duration-500 hover:scale-110"
                            />
                            <h3 className="text-xl font-semibold py-2 m-2">{course.title}</h3>
                            <p className="mb-4">{course.description}</p>
                            <button className="bg-blue-900 text-white p-2 rounded hover:bg-yellow-500 transition duration-300">Enroll Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourseSection;
