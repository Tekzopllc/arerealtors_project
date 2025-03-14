import { Menu, X, Home, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Home className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-secondary">AceRealtors</span>
              <img
                src='/assets/Flag-United-States-of-America.webp'
                alt="American flag"
                className="h-6 w-8 object-cover ml-2"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-secondary hover:text-primary transition-colors">
              About Us
            </Link>
            <HashLink
              to="/#more-resources"
              className="text-secondary hover:text-primary transition-colors"
              smooth
            >
              Blogs
            </HashLink>
            <HashLink
              to="/#reviews_section"
              className="text-secondary hover:text-primary transition-colors"
              smooth
            >
              Reviews
            </HashLink>
            <div className="flex items-center text-secondary">
              <Phone className="h-5 w-5 mr-2" />
              <a href="tel:855-696-1455" className="font-medium hover:text-primary transition-colors">
                855-696-1455
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <a href="tel:855-696-1455" className="mr-6 text-secondary hover:text-primary">
              <Phone className="h-6 w-6" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/about"
              className="block px-3 py-2 text-secondary hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <HashLink
              to="/#more-resources"
              className="block px-3 py-2 text-secondary hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
              smooth
            >
              Blogs
            </HashLink>
            <HashLink
              to="/#reviews_section"
              className="block px-3 py-2 text-secondary hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
              smooth
            >
              Reviews
            </HashLink>
          </div>
        </div>
      )}
    </nav>
  );
}





