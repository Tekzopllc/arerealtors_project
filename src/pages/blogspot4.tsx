import React, { useState, useEffect } from 'react';
import styles from '../BlogPost.module.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaBookmark, FaShare } from 'react-icons/fa';

const HomeInspectionAppraisalBlogPost: React.FC = () => {
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
            src="/assets/blog4.jpg" 
            alt="Home Inspection and Appraisal" 
            className={styles.featureImage}
          />
        </figure>

        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.heading}>Home Inspection & Appraisal: Why They Matter in Real Estate Transactions</h1>
          <p className={styles.excerpt}>
            Understanding these crucial steps can help buyers avoid costly surprises and ensure lenders don't overfinance properties.
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
            When buying or selling a home, two crucial steps can significantly impact the deal: the home inspection and the appraisal. 
            These processes help buyers avoid costly surprises and ensure lenders don't overfinance a property.
            In this guide, we'll explore what home inspections and appraisals are, how they differ, and why they are essential in real estate transactions.
          </p>

          <h2 id="home-inspection">1. What is a Home Inspection?</h2>
          <p>
            A home inspection is a detailed assessment of a property's condition conducted by a professional inspector. It helps buyers identify potential issues before closing a deal.
          </p>
          <p><strong>What Inspectors Check:</strong></p>
          <ul>
            <li><strong>Structural Integrity:</strong> Foundation, walls, roof, and flooring</li>
            <li><strong>Electrical Systems:</strong> Wiring, outlets, circuit breakers</li>
            <li><strong>Plumbing:</strong> Pipes, water pressure, drainage systems</li>
            <li><strong>HVAC Systems:</strong> Heating, ventilation, and air conditioning</li>
            <li><strong>Appliances:</strong> Functionality of installed appliances</li>
            <li><strong>Pest Infestation:</strong> Termites, mold, or rodent damage</li>
          </ul>
          <div className={styles.tipBox}>
            <p>💡 <strong>Tip:</strong> Buyers should always attend the home inspection to ask questions and gain insights about the property.</p>
          </div>

          <h2 id="inspection-importance">2. Why a Home Inspection is Important</h2>
          <p><strong>🔹 For Buyers:</strong></p>
          <ul>
            <li>Identifies costly repairs before finalizing the purchase</li>
            <li>Provides negotiation power (requesting repairs or price adjustments)</li>
            <li>Avoids future safety hazards</li>
          </ul>
          <p><strong>🔹 For Sellers:</strong></p>
          <ul>
            <li>Prevents surprises that could delay or cancel a sale</li>
            <li>Justifies listing price if the home is in excellent condition</li>
            <li>Boosts buyer confidence, leading to faster sales</li>
          </ul>
          <div className={styles.tipBox}>
            <p>💡 <strong>Tip:</strong> Sellers can conduct a pre-listing inspection to fix issues beforehand and attract more buyers.</p>
          </div>

          <h2 id="home-appraisal">3. What is a Home Appraisal?</h2>
          <p>
            A home appraisal is an unbiased estimate of a property's value conducted by a licensed appraiser. It ensures that buyers and lenders do not overpay for the home.
          </p>
          <p><strong>Factors That Affect an Appraisal:</strong></p>
          <ul>
            <li><strong>Location & Neighborhood:</strong> Property value trends in the area</li>
            <li><strong>Size & Layout:</strong> Square footage, number of bedrooms and bathrooms</li>
            <li><strong>Comparable Sales (Comps):</strong> Prices of recently sold homes nearby</li>
            <li><strong>Home Condition & Upgrades:</strong> Renovations and modern features</li>
            <li><strong>Market Conditions:</strong> Supply and demand, interest rates</li>
          </ul>
          <div className={styles.tipBox}>
            <p>💡 <strong>Tip:</strong> If an appraisal comes in lower than the agreed purchase price, buyers can negotiate a lower price or cover the difference out-of-pocket.</p>
          </div>

          <h2 id="handling-issues">4. What Happens If Issues Are Found?</h2>
          <p><strong>After an Inspection:</strong></p>
          <ul>
            <li><strong>🔹 For Buyers:</strong> You can request repairs, negotiate a lower price, or walk away if issues are severe.</li>
            <li><strong>🔹 For Sellers:</strong> Address critical repairs to keep the deal on track.</li>
          </ul>
          <p><strong>After an Appraisal:</strong></p>
          <ul>
            <li><strong>🔹 If the Appraisal is High:</strong> The deal continues smoothly.</li>
            <li><strong>🔹 If the Appraisal is Low:</strong> Buyers may need to renegotiate or pay the difference in cash.</li>
          </ul>
          <div className={styles.tipBox}>
            <p>💡 <strong>Tip:</strong> A second appraisal can be requested if you believe the first one was inaccurate.</p>
          </div>

          <h2 id="conclusion">Conclusion</h2>
          <p>
            Both home inspections and appraisals play vital roles in real estate transactions. Inspections protect buyers from costly repairs, while appraisals ensure fair pricing for lenders and buyers alike.
          </p>
          <p>
            <strong>📌 Thinking of buying or selling a home?</strong> Don't skip these essential steps—they can save you thousands of dollars and provide peace of mind.
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
              <a className={styles.tagsLink} href="/blog/home-inspection">Home Inspection</a>
            </li>
            <li className={styles.tagsItem}>
              <a className={styles.tagsLink} href="/blog/market-trends">Market Trends</a>
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

export default HomeInspectionAppraisalBlogPost;