import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
    return (
        <footer className="text-white py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-around items-start text-center md:text-left">
                

                {/* Navigation links */}
                <nav className="mb-6 md:mb-0">
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-gray-400 transition">Home</a></li>
                        <li><a href="/" className="hover:text-gray-400 transition">Courses</a></li>
                        <li><a href="/" className="hover:text-gray-400 transition">Blogs</a></li>
                        <li><a href="/" className="hover:text-gray-400 transition">About Us</a></li>
                        <li><a href="/" className="hover:text-gray-400 transition">Privacy Policy</a></li>
                        <li><a href="/" className="hover:text-gray-400 transition">Terms And Condition</a></li>

                    </ul>
                </nav>

                {/* Social media links with icons */}
                <div className="mb-6 md:mb-0">
                    <p className="text-center mb-2">Follow Us</p>
                    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 justify-center md:justify-start">
                        <a href="https://facebook.com" className="hover:text-gray-400 transition">
                            <FontAwesomeIcon icon={faFacebook} size="1x" />
                        </a>
                        <a href="https://instagram.com" className="hover:text-gray-400 transition">
                            <FontAwesomeIcon icon={faInstagram} size="1x" />
                        </a>
                        <a href="https://twiter.com" className="hover:text-gray-400 transition">
                            <FontAwesomeIcon icon={faTwitter} size="1x" />
                        </a>
                        <a href="https://linkedin.com" className="hover:text-gray-400 transition">
                            <FontAwesomeIcon icon={faLinkedin} size="1x" />
                        </a>
                        {/* Add more social media icons as needed */}
                    </div>
                </div>
            </div>
            <div className='pt-6'>
                <h4>All Right Reserved @Alamgir</h4>
            </div>
        </footer>
    );
};

export default Footer;
