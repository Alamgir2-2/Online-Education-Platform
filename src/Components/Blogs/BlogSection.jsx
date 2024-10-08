import React from 'react';
import py from '../../assets/py.jpeg'
import ai from '../../assets/ai.png'
import Data from '../../assets/Data.jpg'

const blogs = [
    { title: 'Translations for Scientific Python projects', description: 'We are happy to announce that we have organized the necessary infrastructure and processes to allow volunteers to start translating multiple project websites. In this blog post, we will discuss how we set up manage translations for Scientific Python projects, and how you can participate in the translation and localization effort. Read more....', image: [py] },


    { title: 'From Experimentation to Adoption', description: 'AI has captured the imagination and attention of people globally. But in the business world, the rate of adoption of artificial intelligence has lagged behind the level of interest through 2019. Even though we hear that most business leaders believe AI provides a competitive advantage, up until recently...', image: [ai] },



    { title: 'Towards Data Science', description: 'Towards Data Science is a thought-provoking platform that bridges the gap between data science theory and practical application. The blog offers a rich collection of articles that cover a wide spectrum of topics, from machine learning and artificial intelligence to data visualization and statistical modeling...', image: [Data] },
    // { title: 'Blog Post 2', description: 'Brief description of the blog post.', image: 'path/to/blog2.jpg' },
];

const BlogSection = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <div 
                            key={index} 
                            className="bg-gray-300 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl text-black"
                        >
                            <div className="relative overflow-hidden rounded-t-lg mb-4">
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="w-full h-40 object-cover transition duration-500 hover:scale-110"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                            <p className="mb-4">{blog.description}</p>
                            <button className="bg-blue-900 p-2 rounded text-white hover:bg-yellow-500 transition duration-300">Read More</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
