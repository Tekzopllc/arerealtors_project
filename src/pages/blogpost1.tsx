import React, { useState, useEffect } from 'react';
import styles from '../BlogPost.module.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaBookmark, FaShare } from 'react-icons/fa';

const RealEstateBlogPost: React.FC = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Track scroll progress for reading progress bar
  useEffect(() => {
    const scrollListener = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
    };

    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className={styles.blogContainer}>
      {/* Reading progress bar */}
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      <article className={styles.article}>
        {/* Feature Image */}
        <figure className={styles.featureImageWrapper}>
          <img 
            src="/blog1.jpg" 
            alt="Real Estate Market Trends" 
            className={styles.featureImage}
          />
        </figure>

        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.heading}>Real Estate Market Trends & Property Valuation: How to Price Your Home Right</h1>
          <p className={styles.excerpt}>
            Understanding market trends and property valuation is crucial for making informed real estate decisions.
          </p>
          
          <div className={styles.meta}>
            <time className={styles.timestamp} dateTime="2025-03-13">
              Published 13 Mar 2025
            </time>
            <br />
            <time className={styles.timestamp} dateTime="2025-03-13">
              Updated 13 Mar 2025
            </time>
          </div>
        </header>

        {/* Content */}
        <section className={styles.content}>
          <p>
            The real estate market is constantly evolving, influenced by factors like economic conditions, interest rates, and local demand. 
            Whether you're buying or selling, understanding market trends and property valuation is crucial for making informed decisions. 
            This guide will help you analyze real estate trends and determine the right price for your property.
          </p>

          <h2 id="market-trends">1. What Are Real Estate Market Trends?</h2>
          <p>
            Real estate trends refer to patterns and shifts in housing demand, property prices, and inventory levels. Key factors influencing trends include:
          </p>
          <ul>
            <li><strong>Supply & Demand:</strong> Low inventory increases home prices, while high inventory leads to a buyer's market.</li>
            <li><strong>Interest Rates:</strong> Higher mortgage rates reduce buyer affordability, while lower rates boost demand.</li>
            <li><strong>Economic Indicators:</strong> Employment rates, inflation, and GDP growth impact housing demand.</li>
            <li><strong>Local Market Conditions:</strong> Urban vs. suburban demand, neighborhood developments, and job opportunities affect home values.</li>
          </ul>

          <h2 id="analyze-trends">2. How to Analyze Market Trends</h2>
          <ul>
            <li><strong>Track Home Price Movements:</strong> Use platforms like Zillow, Redfin, or Realtor.com to monitor home prices in your area.</li>
            <li><strong>Monitor Inventory Levels:</strong> A low inventory suggests a seller's market, while high inventory favors buyers.</li>
            <li><strong>Study Recent Sales (Comps):</strong> Comparable properties (comps) in your area provide insight into fair pricing.</li>
            <li><strong>Observe Days on Market (DOM):</strong> Homes selling quickly indicate high demand, while longer listings suggest a slow market.</li>
          </ul>

          <h2 id="property-valuation">3. The Importance of Property Valuation</h2>
          <p>
            Property valuation determines the market value of a home based on various factors:
          </p>
          <ul>
            <li><strong>Location:</strong> Desirable areas command higher prices.</li>
            <li><strong>Home Condition & Age:</strong> Renovated homes with modern features sell at a premium.</li>
            <li><strong>Size & Layout:</strong> More square footage and functional layouts add value.</li>
            <li><strong>Comparable Sales:</strong> Nearby properties with similar features set pricing benchmarks.</li>
          </ul>

          <h2 id="valuation-methods">4. Methods for Valuing a Property</h2>
          <ul>
            <li><strong>Comparative Market Analysis (CMA):</strong> Real estate agents analyze recent sales of similar homes.</li>
            <li><strong>Appraisal Reports:</strong> Professional appraisers provide an unbiased valuation.</li>
            <li><strong>Online Home Value Estimators:</strong> Tools like Zillow's Zestimate offer price estimates (though not always precise).</li>
            <li><strong>Cost Approach:</strong> Based on rebuilding cost minus depreciation.</li>
          </ul>

          <h2 id="pricing-strategies">5. Pricing Strategies for Sellers</h2>
          <ul>
            <li><strong>Market-Competitive Pricing:</strong> Setting a price close to comps attracts buyers.</li>
            <li><strong>Slightly Lower Listing Price:</strong> Generates more interest and bidding wars.</li>
            <li><strong>Test the Market:</strong> If priced too high, consider adjusting based on buyer response.</li>
          </ul>

          <h2 id="conclusion">Preparing for Successful Real Estate Transactions</h2>
          <p>
            Understanding real estate market trends and valuation is key to making smart buying or selling decisions. 
            By analyzing market conditions, studying comparable sales, and using the right pricing strategy, you can optimize your real estate transaction.
          </p>
          <p>
            Whether you're a first-time homebuyer or a seasoned investor, taking the time to research and understand these factors can significantly 
            impact your success in the real estate market. Connect with a local real estate professional for personalized guidance based on your 
            specific market conditions and goals.
          </p>
        </section>

        {/* Interactive elements */}
        <div className={styles.interactiveContainer}>
          <button 
            className={`${styles.interactiveButton} ${isBookmarked ? styles.active : ''}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <FaBookmark /> {isBookmarked ? 'Saved' : 'Save Article'}
          </button>
          
          <div className={styles.shareContainer}>
            <button 
              className={styles.interactiveButton}
              onClick={() => setShowShareOptions(!showShareOptions)}
            >
              <FaShare /> Share
            </button>
            
            {showShareOptions && (
              <div className={styles.shareOptions}>
                <button className={`${styles.shareButton} ${styles.facebook}`}>
                  <FaFacebook /> Facebook
                </button>
                <button className={`${styles.shareButton} ${styles.twitter}`}>
                  <FaTwitter /> Twitter
                </button>
                <button className={`${styles.shareButton} ${styles.linkedin}`}>
                  <FaLinkedin /> LinkedIn
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <section className={styles.tags}>
          <ul className={styles.tagsList}>
            <li className={styles.tagsItem}>
              <a className={styles.tagsLink} href="/blog/real-estate-agent">Real Estate Agents</a>
            </li>
            <li className={styles.tagsItem}>
              <a className={styles.tagsLink} href="/blog/market-trends">Market Trends</a>
            </li>
            <li className={styles.tagsItem}>
              <a className={styles.tagsLink} href="/blog/mortgage-financing">Mortgage Financing</a>
            </li>
          </ul>
        </section>
      </article>
      
      {/* Back to top button */}
      <button 
        className={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </main>
  );
};

export default RealEstateBlogPost;