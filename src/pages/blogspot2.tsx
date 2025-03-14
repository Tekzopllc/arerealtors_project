import React, { useState, useEffect } from 'react';
import styles from '../BlogPost.module.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaBookmark, FaShare } from 'react-icons/fa';

const MortgageFinancingBlogPost: React.FC = () => {
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
            src="/blog2.jpg" 
            alt="Mortgage & Financing Options" 
            className={styles.featureImage}
          />
        </figure>

        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.heading}>Mortgage & Financing Options: A Guide for Home Buyers & Sellers</h1>
          <p className={styles.excerpt}>
            Navigate the complex world of home loans and financing to make informed decisions for your real estate journey.
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
            Buying a home is one of the biggest financial decisions you'll ever make, and understanding mortgage and financing options is crucial for making the right choice. 
            Whether you're a first-time homebuyer or an experienced investor, knowing how home loans work can help you secure the best deal and avoid costly mistakes. 
            In this blog, we'll explore different types of mortgages, financing options, and key factors to consider before securing a loan.
          </p>

          <h2 id="mortgage-basics">1. Understanding Mortgage Basics</h2>
          <p>
            A mortgage is a loan that allows you to buy a home without paying the full price upfront. Instead, you make monthly payments to a lender over a set period, typically 15 to 30 years. Your payments include:
          </p>
          <ul>
            <li><strong>Principal</strong> – The original loan amount.</li>
            <li><strong>Interest</strong> – The cost of borrowing the money.</li>
            <li><strong>Taxes & Insurance</strong> – Some lenders bundle property taxes and homeowners insurance into your mortgage payments.</li>
          </ul>
          <p>
            Your mortgage terms depend on factors like your credit score, income, and down payment amount.
          </p>

          <h2 id="mortgage-types">2. Types of Mortgages & Loans</h2>
          <h3>a) Fixed-Rate Mortgage</h3>
          <ul>
            <li><strong>Best for:</strong> Buyers who want predictable payments.</li>
            <li><strong>How it works:</strong> The interest rate stays the same throughout the loan term (e.g., 15, 20, or 30 years).</li>
            <li><strong>Pros:</strong> Stable monthly payments, good for long-term homeowners.</li>
            <li><strong>Cons:</strong> Higher interest rates compared to adjustable-rate loans.</li>
          </ul>

          <h3>b) Adjustable-Rate Mortgage (ARM)</h3>
          <ul>
            <li><strong>Best for:</strong> Buyers who plan to sell or refinance before the rate adjusts.</li>
            <li><strong>How it works:</strong> The interest rate starts low and changes periodically based on market conditions.</li>
            <li><strong>Pros:</strong> Lower initial payments.</li>
            <li><strong>Cons:</strong> Rates can rise, increasing monthly payments.</li>
          </ul>

          <h3>c) FHA Loans (Federal Housing Administration Loans)</h3>
          <ul>
            <li><strong>Best for:</strong> First-time homebuyers with low credit scores or smaller down payments.</li>
            <li><strong>How it works:</strong> Requires as little as 3.5% down but includes mortgage insurance.</li>
            <li><strong>Pros:</strong> Easier approval, lower credit score requirements.</li>
            <li><strong>Cons:</strong> Mandatory mortgage insurance adds to the cost.</li>
          </ul>

          <h3>d) VA Loans (For Veterans & Military Members)</h3>
          <ul>
            <li><strong>Best for:</strong> U.S. military veterans and active-duty service members.</li>
            <li><strong>How it works:</strong> No down payment or private mortgage insurance (PMI) required.</li>
            <li><strong>Pros:</strong> Lower interest rates, flexible credit requirements.</li>
            <li><strong>Cons:</strong> Only available to eligible military members.</li>
          </ul>

          <h3>e) USDA Loans (For Rural Areas)</h3>
          <ul>
            <li><strong>Best for:</strong> Buyers in eligible rural areas with lower incomes.</li>
            <li><strong>How it works:</strong> Offers 100% financing (no down payment).</li>
            <li><strong>Pros:</strong> Low interest rates, no down payment.</li>
            <li><strong>Cons:</strong> Location restrictions apply.</li>
          </ul>

          <h2 id="pre-approval">3. Mortgage Pre-Approval vs. Pre-Qualification</h2>
          <ul>
            <li><strong>Pre-Qualification:</strong> A quick estimate of how much you can borrow based on self-reported financial information.</li>
            <li><strong>Pre-Approval:</strong> A formal process where a lender verifies your income, credit, and debt-to-income ratio, giving you a more accurate loan amount.</li>
          </ul>
          <p>
            💡 <strong>Tip:</strong> Getting pre-approved before house hunting makes you a stronger buyer in a competitive market.
          </p>

          <h2 id="closing-costs">4. Down Payments & Closing Costs</h2>
          <p>
            Most lenders require a down payment, typically 5-20% of the home price. Some loans (FHA, VA, USDA) allow for lower down payments or none at all.
          </p>
          <ul>
            <li><strong>Closing Costs:</strong> These fees (typically 2-5% of the loan amount) cover lender charges, home appraisals, title insurance, and other legal processes.</li>
          </ul>
          <p>
            💡 <strong>Tip:</strong> Some sellers or lenders offer closing cost assistance—be sure to ask!
          </p>

          <h2 id="approval-factors">5. Mortgage Approval Factors</h2>
          <p>
            Lenders evaluate these key factors before approving your loan:
          </p>
          <ul>
            <li>✅ <strong>Credit Score:</strong> Higher scores (700+) get better interest rates.</li>
            <li>✅ <strong>Debt-to-Income Ratio (DTI):</strong> Lenders prefer a DTI below 43%.</li>
            <li>✅ <strong>Employment & Income Stability:</strong> Proof of steady employment is required.</li>
            <li>✅ <strong>Down Payment Amount:</strong> A larger down payment can reduce your loan costs.</li>
          </ul>

          <h2 id="best-deals">6. Tips to Get the Best Mortgage Deal</h2>
          <ul>
            <li>✔ <strong>Compare multiple lenders</strong> – Don't settle for the first offer.</li>
            <li>✔ <strong>Improve your credit score</strong> – Pay off debts and avoid new loans before applying.</li>
            <li>✔ <strong>Save for a larger down payment</strong> – Reduces loan amount and interest rates.</li>
            <li>✔ <strong>Lock in a low interest rate</strong> – Rates fluctuate, so secure a favorable one when possible.</li>
          </ul>

          <h2 id="conclusion">Conclusion</h2>
          <p>
            Choosing the right mortgage and financing option can save you thousands of dollars in interest and fees. Whether you opt for a fixed-rate loan, an FHA loan, or another option, understanding your financial situation and loan terms will help you make the best decision.
          </p>
          <p>
            Need help deciding? Talk to a mortgage lender or real estate expert to explore the best options for your situation.
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
              <a className={styles.tagsLink} href="/blog/mortgage-financing">Mortgage Financing</a>
            </li>
            <li className={styles.tagsItem}>
              <a className={styles.tagsLink} href="/blog/legal-tax">Legal Tax</a>
            </li>
            <li className={styles.tagsItem}>
              <a className={styles.tagsLink} href="/blog/home-inspection">Home Inspection</a>
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

export default MortgageFinancingBlogPost;