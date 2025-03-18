import React, { useState, useEffect } from 'react';
import styles from '../BlogPost.module.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaBookmark, FaShare } from 'react-icons/fa';

const LegalTaxBlogPost: React.FC = () => {
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
            src="/blog3.jpg" 
            alt="Legal and Tax Considerations in Real Estate" 
            className={styles.featureImage}
          />
        </figure>

        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.heading}>Legal & Tax Considerations in Real Estate: A Guide for Buyers & Sellers</h1>
          <p className={styles.excerpt}>
            Navigate the complex legal landscape and tax implications of real estate transactions with our comprehensive guide.
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
            Buying or selling a home is more than just a financial transaction—it involves legal paperwork, tax implications, 
            and compliance with local property laws. Misunderstanding these aspects can lead to unexpected costs, disputes, 
            or even legal trouble. In this guide, we'll break down the essential legal and tax considerations that every buyer 
            and seller should be aware of before making a real estate move.
          </p>

          <h2 id="legal-documents">1. Essential Legal Documents in a Real Estate Transaction</h2>
          <p>
            Real estate transactions require multiple legal documents to ensure compliance and protect both parties. Key documents include:
          </p>
          <p><strong>For Buyers & Sellers:</strong></p>
          <ul>
            <li><strong>Purchase Agreement:</strong> A contract outlining the terms of the sale, including price, contingencies, and closing date.</li>
            <li><strong>Title Deed:</strong> Proves legal ownership of the property.</li>
            <li><strong>Disclosure Statements:</strong> Sellers must disclose known issues with the property (e.g., structural damage, water leaks).</li>
            <li><strong>Home Inspection & Appraisal Reports:</strong> Verifies the property's condition and value.</li>
          </ul>
          
          <p><strong>For Buyers:</strong></p>
          <ul>
            <li><strong>Loan Agreement (Mortgage Contract):</strong> Details loan terms, interest rates, and repayment obligations.</li>
            <li><strong>Property Insurance Policy:</strong> Protects against damage or liability.</li>
          </ul>
          
          <p><strong>For Sellers:</strong></p>
          <ul>
            <li><strong>Deed Transfer Documents:</strong> Legally transfers ownership to the buyer.</li>
            <li><strong>Bill of Sale:</strong> Lists included items (e.g., appliances, fixtures).</li>
          </ul>
          
          <p className={styles.tip}>
            💡 <strong>Tip:</strong> Always have a real estate attorney review contracts before signing.
          </p>

          <h2 id="property-title">2. Property Title & Ownership Issues</h2>
          <p>
            Before closing a deal, a title search is conducted to verify legal ownership and uncover any potential issues.
          </p>
          <p><strong>Common Title Problems:</strong></p>
          <ul>
            <li><strong>Unpaid Liens:</strong> Outstanding debts against the property (e.g., taxes, contractor fees).</li>
            <li><strong>Boundary Disputes:</strong> Unclear property lines that could lead to legal conflicts.</li>
            <li><strong>Fraudulent Titles:</strong> Forged documents or identity theft leading to ownership claims.</li>
          </ul>
          <p>
            <img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> <strong>Solution:</strong> Buyers should obtain title insurance to protect against hidden title defects.
          </p>

          <h2 id="real-estate-taxes">3. Real Estate Taxes You Need to Know</h2>
          <p><strong>For Buyers:</strong></p>
          <ul>
            <li><strong>Property Taxes:</strong> Homeowners must pay annual property taxes, which vary by location.</li>
            <li><strong>Stamp Duty (if applicable):</strong> Some regions require a tax on property transfers.</li>
          </ul>
          
          <p><strong>For Sellers:</strong></p>
          <ul>
            <li><strong>Capital Gains Tax (CGT):</strong> Applies if the property sells for a profit.</li>
            <li><strong>Depreciation Recapture:</strong> If you claimed tax deductions on rental property, you may owe additional taxes.</li>
          </ul>
          
          <p className={styles.tip}>
            💡 <strong>Tip:</strong> Sellers can reduce capital gains tax by reinvesting profits into another property (1031 exchange in the U.S.).
          </p>

          <h2 id="closing-costs">4. Closing Costs & Fees</h2>
          <p>
            Real estate transactions come with additional fees that buyers and sellers should budget for:
          </p>
          <p><strong>For Buyers:</strong></p>
          <ul>
            <li>Loan origination fees</li>
            <li>Home inspection fees</li>
            <li>Title insurance</li>
            <li>Property taxes & HOA fees</li>
          </ul>
          
          <p><strong>For Sellers:</strong></p>
          <ul>
            <li>Real estate agent commission (5-6% of the sale price)</li>
            <li>Attorney fees</li>
            <li>Capital gains tax (if applicable)</li>
          </ul>
          
          <p className={styles.tip}>
            💡 <strong>Tip:</strong> Negotiating closing costs with the other party can save thousands of dollars.
          </p>

          <h2 id="legal-risks">5. Legal Risks & How to Avoid Them</h2>
          <ul>
            <li><img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> <strong>Avoid verbal agreements</strong> – Always document everything in writing.</li>
            <li><img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> <strong>Verify property boundaries</strong> – Get a professional survey before purchase.</li>
            <li><img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> <strong>Check zoning laws</strong> – Ensure your intended property use is legal.</li>
            <li><img src="https://www.realestateagents.com/compare-agents/static/svgs/check-mark-icon.svg" alt="checkmark" className="inline-block w-4 h-4 mr-1"/> <strong>Know your rights & obligations</strong> – Understand tenant laws if selling a rental property.</li>
          </ul>

          <h2 id="conclusion">Conclusion</h2>
          <p>
            Understanding real estate legal and tax considerations helps buyers and sellers avoid costly mistakes and legal disputes.
            From reviewing contracts to managing tax obligations, being informed ensures a smooth and successful transaction.
          </p>
          <p>
            📌 <strong>Need legal advice?</strong> Always consult a real estate attorney or tax expert before making a decision.
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
              <a className={styles.tagsLink} href="/blog/legal-tax">Legal Tax</a>
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

export default LegalTaxBlogPost;