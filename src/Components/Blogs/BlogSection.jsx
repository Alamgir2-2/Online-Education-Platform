import React from 'react';

const blogs = [
    { title: 'Blog Post 1', description: 'Brief description of the blog post.', image: 'path/to/blog1.jpg' },
    { title: 'Blog Post 2', description: 'Brief description of the blog post.', image: 'path/to/blog2.jpg' },
    { title: 'Blog Post 2', description: 'Brief description of the blog post.', image: 'path/to/blog2.jpg' },
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
