import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-gray-300 pt-20 pb-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0CF2A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#0CF2A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#0CF2A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold text-white">
                Votera
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-md">
              Secure, transparent, and accessible voting solutions for organizations of all sizes. 
              Empowering democratic processes worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-[#0CF2A0] transition-colors">
                <Twitter className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#0CF2A0] transition-colors">
                <Linkedin className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#0CF2A0] transition-colors">
                <Github className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0CF2A0] mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-[#0CF2A0] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-400 hover:text-[#0CF2A0] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-400 hover:text-[#0CF2A0] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-sm text-gray-400 hover:text-[#0CF2A0] transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0CF2A0] mb-6">
              Resources
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/docs" className="text-sm text-gray-400 hover:text-[#0CF2A0] transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-sm text-gray-400 hover:text-[#0CF2A0] transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-sm text-gray-400 hover:text-[#0CF2A0] transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-sm text-gray-400 hover:text-[#0CF2A0] transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0CF2A0] mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-[#0CF2A0] mr-3 shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-gray-400">contact@votera.io</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-[#0CF2A0] mr-3 shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#0CF2A0] mr-3 shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-gray-400">
                  123 Democracy Way<br />
                  San Francisco, CA 94107
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Made by AbdulRehman.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-[#0CF2A0] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-[#0CF2A0] transition-colors">
              Terms of Service
            </Link>
            <Link to="/security" className="text-xs text-gray-500 hover:text-[#0CF2A0] transition-colors">
              Security
            </Link>
            <Link to="/cookies" className="text-xs text-gray-500 hover:text-[#0CF2A0] transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0CF2A0]/5 to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;