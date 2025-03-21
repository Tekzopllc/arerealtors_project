import { Menu, X, Home, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };

    // Only add scroll event listener on home page
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Reset scroll state when not on home page
      setHasScrolled(true);
    }
  }, [isHomePage]);

  // Dynamic navbar classes based on scroll position and current page
  const navbarClasses = !isHomePage || hasScrolled
    ? "bg-black/50 backdrop-blur shadow-lg fixed w-full z-50 transition-all duration-300 h-16"
    : "bg-transparent fixed w-full z-50 transition-all duration-300 h-16";

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/new_logo.png"
                alt="RealEstateAgents.com"
                className="w-[120px] md:w-[180px] h-auto mix-blend-screen brightness-200 contrast-200"
              />
              <img
                src='/Flag-United-States-of-America.webp'
                alt="American flag"
                className="w-[30px] md:w-[40px] h-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-white hover:text-primary transition-colors">
              About Us
            </Link>
            <HashLink
              to="/#more-resources"
              className="text-white hover:text-primary transition-colors"
              smooth
            >
              Blogs
            </HashLink>
            <HashLink
              to="/#reviews_section"
              className="text-white hover:text-primary transition-colors"
              smooth
            >
              Reviews
            </HashLink>
            <div className="flex items-center text-white">
              <Phone className="h-5 w-5 mr-2" />
              <a href="tel:855-696-1455" className="font-medium hover:text-primary transition-colors">
                855-696-1455
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <a href="tel:855-696-1455" className="mr-4 text-white hover:text-primary transition-colors">
              <Phone className="h-5 w-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="py-3 space-y-1">
              <Link
                to="/about"
                className="block px-4 py-2 text-secondary hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <HashLink
                to="/#more-resources"
                className="block px-4 py-2 text-secondary hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
                smooth
              >
                Blogs
              </HashLink>
              <HashLink
                to="/#reviews_section"
                className="block px-4 py-2 text-secondary hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
                smooth
              >
                Reviews
              </HashLink>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}