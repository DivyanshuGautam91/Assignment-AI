import { useRouter, navigate } from './lib/router';

// Page components
import LandingPage from './pages/LandingPage';
import AuditPage from './pages/AuditPage';
import LoadingPage from './pages/LoadingPage';
import ResultsPage from './pages/ResultsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const { path, params } = useRouter();

  // Premium cross-route section scrolling
  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (path !== '/') {
      navigate('/');
      // Delay slightly to allow LandingPage to mount, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavAudit = (e) => {
    e.preventDefault();
    navigate('/audit');
  };

  // Route Dispatcher
  const renderRoutedPage = () => {
    if (path.startsWith('/report/') && params.id) {
      return <ResultsPage reportId={params.id} />;
    }

    switch (path) {
      case '/':
        return <LandingPage />;

      case '/audit':
        return <AuditPage />;

      case '/audit-loading':
        return <LoadingPage />;

      case '/results':
        return <ResultsPage />;

      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="landing-layout">
      {/* Mesh Glow Background */}
      <div className="glow-mesh-overlay"></div>

      {/* STICKY NAVBAR */}
      <header className="sticky-navbar">
        <div className="nav-container">
          <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <div className="brand-dot"></div>
            <span>Sift AI</span>
          </a>

          <nav className="nav-links">
            <a href="#mistakes" className="nav-item" onClick={(e) => handleScrollToSection(e, 'mistakes')}>Why Audit</a>
            <a href="#how-it-works" className="nav-item" onClick={(e) => handleScrollToSection(e, 'how-it-works')}>How it Works</a>
            <a href="#supported-tools" className="nav-item" onClick={(e) => handleScrollToSection(e, 'supported-tools')}>Supported AI</a>
            <a href="#faq" className="nav-item" onClick={(e) => handleScrollToSection(e, 'faq')}>FAQ</a>
          </nav>

          <button onClick={handleNavAudit} className="nav-cta-btn">
            Audit My Spend
          </button>
        </div>
      </header>

      {/* RENDER THE ACTIVE SCREEN */}
      {renderRoutedPage()}

      {/* FOOTER */}
      <footer className="premium-footer">
        <div className="footer-inner">
          <div className="footer-grid-nav">
            <div className="footer-brand-column">
              <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                <div className="brand-dot"></div>
                <span>Sift AI</span>
              </a>
              <p className="footer-desc">
                The modern, automated platform to audit ChatGPT, Claude, Cursor, Copilot, Gemini, Windsurf, v0, and API overspend on autopilot.
              </p>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">Audit Engine</span>
              <div className="footer-links-list">
                <a href="#mistakes" className="footer-link" onClick={(e) => handleScrollToSection(e, 'mistakes')}>AI Mistakes</a>
                <a href="#how-it-works" className="footer-link" onClick={(e) => handleScrollToSection(e, 'how-it-works')}>How it Works</a>
                <button onClick={handleNavAudit} className="footer-link-btn-text">Audit Form</button>
              </div>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">Supported AI</span>
              <div className="footer-links-list">
                <a href="#supported-tools" className="footer-link" onClick={(e) => handleScrollToSection(e, 'supported-tools')}>ChatGPT &amp; Claude</a>
                <a href="#supported-tools" className="footer-link" onClick={(e) => handleScrollToSection(e, 'supported-tools')}>Cursor &amp; Copilot</a>
                <a href="#supported-tools" className="footer-link" onClick={(e) => handleScrollToSection(e, 'supported-tools')}>API Keys</a>
              </div>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">Compliance</span>
              <div className="footer-links-list">
                <span className="footer-link" style={{ cursor: 'default' }}>SOC2 Type II Certified</span>
                <span className="footer-link" style={{ cursor: 'default' }}>Prompt Data Protected</span>
                <span className="footer-link" style={{ cursor: 'default' }}>GDPR Compliant</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>&copy; {new Date().getFullYear()} Sift Cost Intelligence Inc. All rights reserved.</span>
            <div className="footer-social-row">
              <a href="#" className="footer-link">Twitter</a>
              <a href="#" className="footer-link">GitHub</a>
              <a href="#" className="footer-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
