import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen } from 'lucide-react';
import styles from '../BlogPost.module.css';

const blogs = [
  {
    path: '/blog/market-trends',
    image: '/blog1.jpg',
    category: 'Market Analysis',
    title: 'Real Estate Market Trends & Property Valuation',
    description: 'Learn how to analyze market trends and determine the right price for your property.'
  },
  {
    path: '/blog/mortgage-financing',
    image: '/blog2.jpg',
    category: 'Home Financing',
    title: 'Mortgage & Financing Options Guide',
    description: 'Navigate the complex world of home loans and financing options.'
  },
  {
    path: '/blog/legal-tax',
    image: '/blog3.jpg',
    category: 'Legal & Tax Guide',
    title: 'Legal & Tax Considerations in Real Estate',
    description: 'Essential legal and tax knowledge for property transactions.'
  },
  {
    path: '/blog/home-inspection',
    image: '/blog4.jpg',
    category: 'Buyer\'s Guide',
    title: 'Home Inspection & Appraisal Guide',
    description: 'Understanding these crucial steps in real estate transactions.'
  },
  {
    path: '/blog/real-estate-agent',
    image: '/blog5.jpg',
    category: 'Agent Guide',
    title: 'The Role of a Real Estate Agent',
    description: 'Learn about effective selling strategies and agent responsibilities.'
  },
  {
    path: '/blog/social-media-marketing',
    image: '/blog6.jpg',
    category: 'Digital Marketing',
    title: 'Social Media Marketing in Real Estate',
    description: 'Master the art of social media marketing for real estate success.'
  }
];

const Blogs: React.FC = () => {
  return (
    <div className={styles.blogContainer}>
      <header className={styles.header} style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 className={styles.heading}>Real Estate Insights & Guides</h1>
        <p className={styles.excerpt}>
          Explore our collection of expert guides and insights to help you navigate the real estate market successfully.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogs.map((blog, index) => (
          <Link to={blog.path} key={index} className="block">
            <div className="bg-gray-50 rounded-lg overflow-hidden h-full transition-transform hover:-translate-y-1 duration-300 shadow-lg">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-primary mb-3">
                  <BookOpen className="w-4 h-4" />
                  <span>{blog.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <div className="flex justify-end">
                  <button className="text-primary hover:text-primary-dark font-semibold flex items-center gap-2 transition-colors">
                    Read More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;