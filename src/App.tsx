import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SellProperty from './pages/SellProperty';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminLogin from './pages/adminlogin';
import AdminPanel from './pages/adminpanel';
import CompareAgents from './pages/compare_agents';
import RealEstateBlogPost from './pages/blogpost1';
import MortgageFinancingBlogPost from './pages/blogspot2';
import LegalTaxBlogPost from './pages/blogspot3';
import HomeInspectionAppraisalBlogPost from './pages/blogspot4';
import RealEstateAgentBlogPost from './pages/blogspot5';


function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/adminlogin' || location.pathname === '/compare_agents';
  
  console.log('Current path:', location.pathname);
  console.log('Hide navbar:', hideNavbar);

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbar && <Navbar />}
      <main className={!hideNavbar ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<SellProperty />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/compare_agents" element={<CompareAgents />} />
          <Route path="/blog/market-trends" element={<RealEstateBlogPost />} />
          <Route path="/blog/mortgage-financing" element={<MortgageFinancingBlogPost />} />
          <Route path="/blog/legal-tax" element={<LegalTaxBlogPost />} />
          <Route path="/blog/home-inspection" element={<HomeInspectionAppraisalBlogPost />} />
          <Route path="/blog/real-estate-agent" element={<RealEstateAgentBlogPost />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;