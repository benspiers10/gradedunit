import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from '../components/assets/images/scoutslogofooter.png'

const Footer = () => {
    return (
        <footer className="bg-[#7413DC] text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                        <div className="flex flex-col items-center lg:items-start">
                            <div className="flex space-x-4 mb-4">
                                <a href="https://facebook.com" className="text-white hover:text-gray-300">
                                    <FaFacebookF size={24} />
                                </a>
                                <a href="https://instagram.com" className="text-white hover:text-gray-300">
                                    <FaInstagram size={24} />
                                </a>
                                <a href="https://twitter.com" className="text-white hover:text-gray-300">
                                    <FaTwitter size={24} />
                                </a>
                                <a href="https://youtube.com" className="text-white hover:text-gray-300">
                                    <FaYoutube size={24} />
                                </a>
                            </div>
                            <p className="text-center lg:text-left">Connect with us on social media!</p>
                            <br />

                            <ul className="flex flex-col space-y-2">
                            <li>
                                <a href="https://www.scouts.org.uk/contact-us" className="hover:text-gray-300">Scouts Contact</a>
                            </li>
                            <li>
                                <a href="https://www.scouts.scot/disclaimer/" className="hover:text-gray-300">Terms of Service</a>
                            </li>
                            <li>
                                <a href="https://www.scouts.scot/" className="hover:text-gray-300">Scouts Scotland</a>
                            </li>
                            <li>
                                <a href="https://www.scouts.scot/privacy-policy/" className="hover:text-gray-300">Privacy Policy</a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
                        <img src={Logo} alt="Logo" className="h-20" />
                    </div>
                </div>
                <div className="mt-8 text-center border-t border-gray-400 pt-4">
                    <p>&copy; {new Date().getFullYear()} Scouts Obanshire (Ben Spiers). All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
