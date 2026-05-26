import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  Sparkles,
  GitBranch,
  ShieldCheck,
  TrendingDown,
  Layers,
  Search,
  Zap,
  Globe,
  Settings,
  Database,
  ChevronDown,
  Terminal,
  RotateCcw
} from 'lucide-react';

// Routing & Storage
import { useRouter, navigate } from './lib/router';
import { storage } from './lib/storage';
import { auditEngine } from './services/auditEngine';
import { useAudit } from './hooks/useAudit';

// Page components
import AuditPage from './pages/AuditPage';
import LoadingPage from './pages/LoadingPage';
import ResultsPage from './pages/ResultsPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import InteractiveDashboard from './components/InteractiveDashboard';

export default function App() {
  const { path, params } = useRouter();
  const { submitLead, error: leadError } = useAudit();

  // Timeline Step State
  const [activeStep, setActiveStep] = useState(0);

  // Email CTA State
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleScrollToForm = (e) => {
    e.preventDefault();
    if (path !== '/') {
      navigate('/audit');
      return;
    }
    const formEl = document.getElementById('calculator');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/audit');
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      const cachedInput = storage.loadAuditInput();
      const cachedResult = storage.loadAuditResult();
      const success = await submitLead(email, cachedInput, cachedResult);
      if (success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail('');
        }, 5000);
      }
    }
  };

  // See Sample Audit CTA Trigger
  const handleSeeSampleAudit = (e) => {
    e.preventDefault();

    // 1. Generate realistic, high-impact mock data for hyper-growth startup (Wasteful rating)
    const sampleInput = {
      tools: [
        { toolId: 'chatgpt', planId: 'team', seats: 2, monthlySpend: 60 },
        { toolId: 'claude', planId: 'pro', seats: 12, monthlySpend: 240 },
        { toolId: 'cursor', planId: 'business', seats: 8, monthlySpend: 320 },
        { toolId: 'copilot', planId: 'business', seats: 15, monthlySpend: 285 },
        { toolId: 'openai_api', planId: 'pay_as_you_go', seats: 1, monthlySpend: 980 },
        { toolId: 'anthropic_api', planId: 'pay_as_you_go', seats: 1, monthlySpend: 420 }
      ],
      teamSize: 18,
      primaryUseCase: 'mixed'
    };

    // 2. Compute cost consolidation audit metrics
    const sampleResult = auditEngine.run(sampleInput);

    // 3. Save mock report logs to localStorage for seamless refresh persistence
    storage.saveAuditInput(sampleInput);
    storage.saveAuditResult(sampleResult);

    // 4. Navigate to loading screen so investors/recruiters experience the premium loading progress
    navigate('/audit-loading');
  };

  const timelineSteps = [
    {
      title: "Input AI stack & details",
      description: "Securely input your active AI platforms, active plan tiers, total seats, and estimated monthly budgets. Takes less than 60 seconds.",
      label: "STACK INGESTION"
    },
    {
      title: "Scan via AI Audit Engine",
      description: "Our intelligence engine maps employee access logs, flags redundant model subscriptions, and discovers abandoned API keys.",
      label: "AUDIT ALGORITHM"
    },
    {
      title: "Receive Savings Report",
      description: "Get an instant, actionable breakdown of active cost leaks, seat downgrade pathways, and optimized fallback configurations.",
      label: "RECOVERY ANALYSIS"
    }
  ];

  const toolsList = [
    { name: "ChatGPT Plus/Team", category: "General Chat", icon: Sparkles, bg: "rgba(16, 163, 127, 0.05)", text: "Many teams overpay by using Team plans unnecessarily when individual Plus is enough." },
    { name: "Claude Pro/Team", category: "Creative & Coding", icon: Layers, bg: "rgba(217, 119, 6, 0.05)", text: "Overlapping subscriptions with ChatGPT. Highly common to pay for both for single users." },
    { name: "Cursor Business", category: "IDE Composer", icon: Terminal, bg: "rgba(255, 255, 255, 0.03)", text: "Business tier features often inactive or unused by junior development teams." },
    { name: "GitHub Copilot", category: "Inline Autocomplete", icon: GitBranch, bg: "rgba(99, 102, 241, 0.05)", text: "Assigned licenses often redundant for developers already using Cursor Composer." },
    { name: "Gemini Advanced", category: "Workspace AI", icon: Globe, bg: "rgba(66, 133, 244, 0.05)", text: "Duplicate workspace additions active for employees who only require base models." },
    { name: "OpenAI API Keys", category: "Model Integration", icon: Zap, bg: "rgba(16, 163, 127, 0.05)", text: "Untracked testing sandboxes and developer sandbox keys leaking recurring context spend." },
    { name: "Anthropic API", category: "Developer API", icon: Database, bg: "rgba(217, 119, 6, 0.05)", text: "Missing prompt caching setups leading to expensive multi-token repetitive processing." },
    { name: "Windsurf / v0", category: "Generative UI & IDE", icon: Zap, bg: "rgba(14, 165, 233, 0.05)", text: "Active team seats running during idle prototyping or planning cycles." }
  ];

  const overspendMistakes = [
    {
      title: "Redundant Team plans with 2 users",
      description: "Subscribing to ChatGPT/Claude Team tiers which mandate minimum seat purchases, when separate Pro/Plus keys serve the same role.",
      icon: Search
    },
    {
      title: "Paying for ChatGPT + Claude together",
      description: "Over 40% of tech employees hold concurrent individual accounts under both OpenAI and Anthropic, paying double for overlapping capabilities.",
      icon: Layers
    },
    {
      title: "Idle Cursor developer seats",
      description: "Corporate dev licenses sit allocated to product managers or offboarded engineers who have logged 0 compiler requests for months.",
      icon: GitBranch
    },
    {
      title: "Untracked Sandbox API tokens",
      description: "Development sandbox keys left embedded in testing scripts, triggering recurring recursive backend loops without active rate restricts.",
      icon: Zap
    },
    {
      title: "Underutilized Enterprise suites",
      description: "Paying for expensive Enterprise contracts when standard Pro seat tiers are fully sufficient for 90% of your staff workflows.",
      icon: ShieldCheck
    }
  ];

  const faqs = [
    {
      question: "How does the Sift AI Spend Audit work?",
      answer: "Sift scans your active SaaS inventory, employee platform directories, and API billing logs. It crosses developer tools (Cursor/Copilot) and chat platforms (ChatGPT/Claude) to discover duplicate accounts and unoptimized seat plans."
    },
    {
      question: "Are our prompt contexts, codebases, or raw queries read?",
      answer: "Absolutely not. Sift does not interface with your code repositories, model prompt histories, raw chatbot queries, or completions. We integrate strictly with billing configurations and active workspace seating registers."
    },
    {
      question: "Is Sift secure and compliant for enterprise tech stacks?",
      answer: "Yes, Sift operates under read-only metadata APIs and is fully SOC2 Type II certified. All authentication parameters are encrypted using AES-256 at-rest, and we follow strict GDPR privacy rules."
    },
    {
      question: "Can Sift automate active downgrades or seat removals?",
      answer: "You are in complete control. Sift acts as a recommendation engine. When Sift flags duplicate seats or sandbox key leaks, you can approve the optimization in 1-Click from the console, or automate routine audits."
    }
  ];

  // Route Controller Dispatcher
  const renderRoutedPage = () => {
    if (path.startsWith('/report/') && params.id) {
      return <ResultsPage reportId={params.id} />;
    }

    switch (path) {
      case '/':
        return (
          <>
            {/* HERO SECTION */}
            <section className="section-container hero-sec">
              <div className="hero-tag">
                <div className="hero-tag-dot"></div>
                <span>Announcing Sift AI Audit 2.0</span>
              </div>

              <h1 className="title-large">
                Stop overpaying for AI tools. <span className="text-gradient-accent">See where your budget leaks.</span>
              </h1>

              <p className="hero-subtitle">
                Sift automatically audits your ChatGPT, Claude, Cursor, Copilot, and API usage. Discover duplicate active seats, overlapping models, and sandboxed key leaks instantly.
              </p>

              <div className="hero-cta-group">
                <button onClick={() => navigate('/audit')} className="btn-primary">
                  <span>Audit My AI Spend</span>
                  <ArrowRight size={16} />
                </button>
                <button onClick={handleSeeSampleAudit} className="btn-secondary">
                  <span>See Sample Audit</span>
                </button>
              </div>

              {/* Live Mock Interactive Dashboard */}
              <div className="premium-dashboard-wrapper">
                <InteractiveDashboard />
              </div>
            </section>

            {/* TRUSTED BY LOGOS MOCK */}
            <section className="section-container" style={{ padding: '0 24px' }}>
              <div className="trust-container">
                <h4 className="trust-title">Trusted by AI-native hyper-growth tech teams</h4>
                <div className="logos-grid">
                  <div className="mock-logo">
                    <div className="logo-shape"></div>
                    <span>VERTEX</span>
                  </div>
                  <div className="mock-logo">
                    <div className="logo-shape ring"></div>
                    <span>ORBIT</span>
                  </div>
                  <div className="mock-logo">
                    <div className="logo-shape triangle"></div>
                    <span>LINEAR</span>
                  </div>
                  <div className="mock-logo">
                    <div className="logo-shape"></div>
                    <span>ACME.IO</span>
                  </div>
                  <div className="mock-logo">
                    <div className="logo-shape ring"></div>
                    <span>NUCLEUS</span>
                  </div>
                </div>
              </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section id="how-it-works" className="section-container">
              <div className="section-head">
                <span className="section-head-tag">Process Flow</span>
                <h2 className="section-title">AI Cost Ingestion in three steps</h2>
                <p className="section-desc">
                  Connect Sift to your subscription consoles and workspace registries to compile a complete, secure model overspend audit.
                </p>
              </div>

              <div className="timeline-section-split">
                {/* Left: Navigation Steps */}
                <div className="timeline-navigation">
                  {timelineSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`timeline-step-item ${activeStep === idx ? 'active' : ''}`}
                      onClick={() => setActiveStep(idx)}
                    >
                      <div className="step-number-badge font-mono">
                        {idx + 1}
                      </div>
                      <div className="step-info-block">
                        <span style={{ fontSize: '11px', color: 'var(--accent-soft)', fontWeight: 600, display: 'block', marginBottom: '4px', letterSpacing: '0.05em' }}>{step.label}</span>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Step Visualizations */}
                <div className="timeline-preview-frame">
                  {activeStep === 0 && (
                    <div className="mock-connect-hub">
                      <span className="section-head-tag">Step 1: Ingest AI Stack</span>
                      <h3 style={{ marginBottom: '12px' }}>Enter your team's AI footprint</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
                        List active platforms, plan tiers, monthly budget estimates, and team size.
                      </p>

                      <div style={{ background: '#0e0e12', border: '1px solid var(--border-primary)', padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Core Model Tool</span>
                            <div style={{ background: '#18181b', border: '1px solid var(--border-primary)', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>ChatGPT Plus</span>
                              <ChevronDown size={10} />
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Seats Allocated</span>
                            <div style={{ background: '#18181b', border: '1px solid var(--border-primary)', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', color: '#ffffff' }} className="font-mono">
                              45 seats
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', color: 'var(--accent-soft)' }}>
                          <Sparkles size={12} />
                          <span>Selected: Claude Pro, Cursor Developer, OpenAI API</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div>
                      <span className="section-head-tag">Step 2: AI Audit Engine</span>
                      <h3 style={{ marginBottom: '12px' }}>Scan for seat duplication & context leaks</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
                        Our algorithm runs cross-platform checks mapping workspace seat histories and sandbox API records.
                      </p>

                      <div style={{ background: '#0e0e12', border: '1px solid var(--border-primary)', padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
                          <span>Audit Search Progress</span>
                          <span className="font-mono">88%</span>
                        </div>
                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ width: '88%', height: '100%', background: 'var(--accent)' }}></div>
                        </div>
                        <span style={{ fontSize: '11px', color: '#ff8b77', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                          <Zap size={10} />
                          <span>Flagged: 4 overlapping ChatGPT+Claude Pro sets, $680 playground test loop</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div>
                      <span className="section-head-tag">Step 3: Instant Cost Recovery</span>
                      <h3 style={{ marginBottom: '12px' }}>Personalized PDF savings report</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                        Receive custom recommendations detailing active Pro licenses downgrade paths and key consolidations.
                      </p>
                      <div style={{ background: '#111815', border: '1px solid rgba(16, 185, 129, 0.15)', padding: '20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, paddingLeft: '2px' }}>
                          <ShieldCheck size={18} style={{ color: '#10b981' }} />
                        </div>
                        <div>
                          <h5 style={{ color: '#ffffff', fontSize: '13px', marginBottom: '4px' }}>Sift AI Audit Successful</h5>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                            Identified $1,120 monthly overspend. Custom optimization checklist generated.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SUPPORTED TOOLS */}
            <section id="supported-tools" className="section-container tools-hub-sec">
              <div className="section-head">
                <span className="section-head-tag">Supported AI Connectors</span>
                <h2 className="section-title">Integrates across your active model stack</h2>
                <p className="section-desc">
                  Sift maps subscription plans, licensing logs, and raw token usage across all major generative AI interfaces and API channels.
                </p>
              </div>

              <div className="tools-hub-grid">
                {toolsList.map((tool, idx) => {
                  const ToolIcon = tool.icon;
                  return (
                    <div
                      key={idx}
                      className="tool-hub-card"
                      style={{ '--accent-local': tool.bg }}
                    >
                      <div className="tool-icon-wrapper">
                        <ToolIcon size={24} />
                      </div>
                      <div>
                        <span>{tool.name}</span>
                        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{tool.category}</p>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{tool.text}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* COMMON AI OVERSPENDING MISTAKES */}
            <section id="mistakes" className="section-container">
              <div className="section-head">
                <span className="section-head-tag">Diagnostics Matrix</span>
                <h2 className="section-title">Common AI overspending mistakes</h2>
                <p className="section-desc">
                  With fast AI adoption comes unchecked billing pipelines. Most development teams leak thousands on duplicate active tiers.
                </p>
              </div>

              <div className="features-grid">
                {overspendMistakes.map((mistake, idx) => {
                  const MistakeIcon = mistake.icon;
                  return (
                    <div key={idx} className="feature-card">
                      <div className="feature-icon-wrapper">
                        <MistakeIcon size={20} />
                      </div>
                      <h3>{mistake.title}</h3>
                      <p>{mistake.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FAQ INTERACTIVE SECTION */}
            <section id="faq" className="section-container">
              <div className="section-head">
                <span className="section-head-tag">Audit Details</span>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-desc">
                  Got questions about integrations, enterprise security, and pricing audit recommendations? Review our answers.
                </p>
              </div>

              <div className="faq-grid">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`faq-accordion-item ${openFaq === idx ? 'open' : ''}`}
                  >
                    <button
                      className="faq-trigger-btn"
                      onClick={() => toggleFaq(idx)}
                    >
                      <h4>{faq.question}</h4>
                      <ChevronDown size={16} className="faq-chevron" />
                    </button>

                    <div className="faq-content-drawer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FINAL CTA NEWSLETTER SECTION */}
            <section id="cta" className="section-container">
              <div className="cta-banner-card">
                <span className="section-head-tag">Instant Stack Scan</span>
                <h2 className="cta-heading">Want a detailed optimization report?</h2>
                <p className="cta-desc">
                  Receive a secured, comprehensive SOC2-compliant cost consolidation and model optimization blueprint in your inbox.
                </p>

                <div className="cta-form-container">
                  {!isSubmitted ? (
                    <form onSubmit={handleEmailSubmit} className="cta-input-group">
                      <input
                        type="email"
                        required
                        placeholder="Enter your enterprise email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="cta-input-field"
                      />
                      <button type="submit" className="btn-cta-submit">
                        <span>Get My Free Audit</span>
                        <ArrowRight size={14} />
                      </button>
                    </form>
                  ) : (
                    <div className="cta-micro-feedback">
                      <Check size={16} />
                      <span>Your audit report has been saved.</span>
                    </div>
                  )}
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    SOC2 Certified. Safe read-only API connectors. No credit card required.
                  </span>
                </div>
              </div>
            </section>
          </>
        );

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
            {path === '/' ? (
              <>
                <a href="#mistakes" className="nav-item">Why Audit</a>
                <a href="#how-it-works" className="nav-item">How it Works</a>
                <a href="#supported-tools" className="nav-item">Supported AI</a>
                <a href="#faq" className="nav-item">FAQ</a>
              </>
            ) : (
              <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home Console</a>
            )}
          </nav>

          <button onClick={handleScrollToForm} className="nav-cta-btn">
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
                The modern, automated platform to audit ChatGPT, Claude, Cursor, Copilot, and API overspend on autopilot.
              </p>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">Audit Engine</span>
              <div className="footer-links-list">
                <a href="#mistakes" className="footer-link" onClick={handleScrollToForm}>AI Mistakes</a>
                <a href="#how-it-works" className="footer-link" onClick={handleScrollToForm}>How it Works</a>
                <button onClick={() => navigate('/audit')} className="footer-link-btn-text">Audit Form</button>
              </div>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">Supported AI</span>
              <div className="footer-links-list">
                <a href="#supported-tools" className="footer-link" onClick={handleScrollToForm}>ChatGPT &amp; Claude</a>
                <a href="#supported-tools" className="footer-link" onClick={handleScrollToForm}>Cursor &amp; Copilot</a>
                <a href="#supported-tools" className="footer-link" onClick={handleScrollToForm}>API Keys</a>
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
