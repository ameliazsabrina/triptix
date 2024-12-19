import React from "react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <img src="LOGO.svg" className="h-8 w-auto" />
          <p className="text-sm py-4">© 2024 PABW TacTixMates.</p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center space-y-2 md:items-start">
          <p className="text-sm">Contact us at:</p>
          <a
            href="mailto:contact@mywebsite.com"
            className="text-sm text-gray-400 hover:text-white"
          >
            23523099@students.uii.ac.id (Amelia)
            <br />
            23523036@students.uii.ac.id (Kinanda)
            <br />
            23523176@students.uii.ac.id (Naufal)
            <br />
            23523253@students.uii.ac.id (Rafie)
            <br />
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500 transition duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500 transition duration-300"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
