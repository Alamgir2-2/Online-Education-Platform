import React, { useState } from 'react';

const CourseOutline = () => {
  // Sample course data
  const courseData = {
    title: 'Course OutLine',
    // description: 'Learn the basics of web development, including HTML, CSS, and JavaScript. Build your first website with a responsive design and interactivity!',
    modules: [
      {
        title: 'Milestone 1: Getting Started',
        lessons: [
          'Lesson 1.1: Introduction to HTML',
          'Lesson 1.2: Basic CSS Styling',
          'Lesson 1.3: Introduction to JavaScript',
        ],
      },
      {
        title: 'Milestone 2: Building Your First Webpage',
        lessons: [
          'Lesson 2.1: Structuring HTML',
          'Lesson 2.2: Styling with CSS',
          'Lesson 2.3: Adding Interactivity with JavaScript',
        ],
      },
      {
        title: 'Milestone 3: Advanced Concepts',
        lessons: [
          'Lesson 3.1: Responsive Design',
          'Lesson 3.2: Introduction to Frameworks',
          'Lesson 3.3: Final Project',
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 mt-40">
      <div className="bg-white bg-opacity-10 text-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold">{courseData.title}</h1>
        <p className="mt-2 text-lg">{courseData.description}</p>

        <h2 className="text-3xl font-semibold mt-6">Course Milestone</h2>
        <div className="mt-4 space-y-4">
          {courseData.modules.map((module, index) => {
            const [isOpen, setIsOpen] = useState(false); // State for expanding/collapsing modules
            
            return (
              <div key={index} className=" rounded-md shadow-md transition-transform transform hover">
                <div 
                  className="p-4 cursor-pointer bg-gray-400 bg-opacity-15 text-white rounded-t-md hover:bg-gray-500"
                  onClick={() => setIsOpen(!isOpen)} // Toggle module visibility
                >
                  <h3 className="text-xl font-semibold">{module.title}</h3>
                </div>
                {isOpen && (
                  <ul className="mt-2 border-t border-gray-300">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="p-4 border-b border-gray-200 text-gray-200 hover:bg-gray-600">
                        {lesson}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <button className='mt-4 bg-blue-900 text-white p-2 rounded hover:bg-yellow-500 transition duration-300'>Enroll Now</button>
      </div>
    </div>
  );
};

export default CourseOutline;
