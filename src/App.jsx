import { useState } from 'react';
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
import InteractiveDashboard from './components/InteractiveDashboard';
import SpendForm from './components/audit/SpendForm';
import { auditEngine } from './services/auditEngine';

export default function App() {
  // State Router: 'landing' | 'results'
  const [currentRoute, setCurrentRoute] = useState('landing');
  const [auditData, setAuditData] = useState(null);

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
    const formEl = document.getElementById('calculator');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (data) => {
    setAuditData(data);
    setCurrentRoute('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  // Computations for Results screen via deterministic Fintech Cost Optimization Engine
  const auditResult = auditData 
    ? auditEngine.run(auditData)
    : { monthlySavings: 0, annualSavings: 0, recommendations: [], summary: { wasteScore: 0, stackEfficiency: 'Optimal', opportunitiesFound: 0, totalSpend: 0 } };

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


  return (
    <div className="landing-layout">
      {/* Mesh Glow Background */}
      <div className="glow-mesh-overlay"></div>

      {/* STICKY NAVBAR */}
      <header className="sticky-navbar">
        <div className="nav-container">
          <a href="#" className="brand-logo" onClick={() => setCurrentRoute('landing')}>
            <div className="brand-dot"></div>
            <span>Sift AI</span>
          </a>
          {currentRoute === 'landing' ? (
            <nav className="nav-links">
              <a href="#mistakes" className="nav-item">Why Audit</a>
              <a href="#how-it-works" className="nav-item">How it Works</a>
              <a href="#supported-tools" className="nav-item">Supported AI</a>
              <a href="#calculator" className="nav-item">Spend Form</a>
              <a href="#faq" className="nav-item">FAQ</a>
            </nav>
          ) : (
            <nav className="nav-links">
              <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); setCurrentRoute('landing'); }}>Home Page</a>
            </nav>
          )}
          <a href="#calculator" className="nav-cta-btn" onClick={handleScrollToForm}>Audit My Spend</a>
        </div>
      </header>

      {/* RENDER HOME LANDING PAGE */}
      {currentRoute === 'landing' && (
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
              <a href="#calculator" className="btn-primary" onClick={handleScrollToForm}>
                <span>Audit My AI Spend</span>
                <ArrowRight size={16} />
              </a>
              <a href="#calculator" className="btn-secondary" onClick={handleScrollToForm}>
                <span>See Sample Audit</span>
              </a>
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

          {/* DYNAMIC SPEND AUDIT INPUT FORM SECTION */}
          <section id="calculator" className="section-container">
            <SpendForm
              onSubmitSuccess={handleFormSubmit}
              onCancel={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
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
              <h2 className="cta-heading">Get your free AI Spend Audit</h2>
              <p className="cta-desc">
                See how much your team could save on ChatGPT, Claude, Cursor, Copilot, and API spend. Connect Sift AI in under a minute.
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
                    <span>Audit scheduled! We have dispatched setup instructions to your inbox.</span>
                  </div>
                )}
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  SOC2 Certified. Safe read-only API connectors. No credit card required.
                </span>
              </div>
            </div>
          </section>
        </>
      )}

      {/* RENDER AUDIT RESULTS PAGE */}
      {currentRoute === 'results' && auditData && (
        <section className="section-container" style={{ padding: '40px 24px' }}>
          {/* Header */}
          <div className="results-header-box">
            <div className="hero-tag">
              <div className="hero-tag-dot"></div>
              <span>Fintech Cost Audit Complete</span>
            </div>
            <h1 className="title-large" style={{ marginBottom: '16px', fontSize: '48px' }}>
              Your Cost Recovery Report
            </h1>
            <p className="hero-subtitle" style={{ maxWidth: '640px', marginBottom: '24px' }}>
              We analyzed {auditData.tools.length} active platform integrations across your enterprise team of {auditData.teamSize} members using our rule-based Fintech Audit Engine.
            </p>
          </div>

          <div className="results-console-card">
            {/* SAVINGS HERO */}
            <div className="premium-savings-hero">
              <div className="hero-glow-back"></div>
              <div className="savings-hero-content">
                <span className="savings-hero-sub">Estimated Annual Recovery Opportunity</span>
                <h2 className="savings-hero-big text-gradient-accent">
                  You can save ${auditResult.annualSavings.toLocaleString()}/year
                </h2>
                <p className="savings-hero-desc">
                  Consolidating subscription packages and implementing prompt restrictions will recover approx. <strong>${auditResult.monthlySavings.toLocaleString()}/month</strong> instantly.
                </p>
              </div>
            </div>

            {/* AUDIT SCORE AND METER DETAILS */}
            <div className="results-stats-row">
              <div className="dashboard-stat-card">
                <div className="stat-label">Stack Waste Index</div>
                <div className="stat-value-container">
                  <span className="stat-value font-mono color-glow-text" style={{ color: auditResult.summary.wasteScore > 30 ? '#ff8b77' : auditResult.summary.wasteScore > 15 ? '#f59e0b' : '#10b981' }}>
                    {auditResult.summary.wasteScore}%
                  </span>
                </div>
                <div className="stat-footer-text">
                  <TrendingDown size={12} className="warning-text-icon" />
                  <span>Gross billing rate inefficiencies</span>
                </div>
              </div>

              <div className="dashboard-stat-card">
                <div className="stat-label">Stack Efficiency Rank</div>
                <div className="stat-value-container">
                  <span className="stat-value" style={{ color: auditResult.summary.stackEfficiency === 'Low' ? '#ff8b77' : auditResult.summary.stackEfficiency === 'Moderate' ? '#f59e0b' : '#10b981' }}>
                    {auditResult.summary.stackEfficiency}
                  </span>
                </div>
                <div className="stat-footer-text">
                  <ShieldCheck size={12} className="accent-text-icon" />
                  <span>Cost-to-benefit profile score</span>
                </div>
              </div>

              <div className="dashboard-stat-card highlighted">
                <div className="stat-label">Optimization Paths Found</div>
                <div className="stat-value-container text-gradient-accent">
                  <span className="stat-value font-mono">{auditResult.summary.opportunitiesFound}</span>
                </div>
                <div className="stat-footer-text">
                  <Sparkles size={12} className="accent-text-icon" />
                  <span>Actionable recovery guidelines</span>
                </div>
              </div>
            </div>

            {/* SPLIT LAYOUT: LEFT RECOMMENDATIONS, RIGHT SPENDING BREAKDOWN & CTA */}
            <div className="results-grid-split">
              {/* Recommendations List */}
              <div className="results-optimizations-panel" style={{ flexGrow: 1 }}>
                <div className="panel-header" style={{ marginBottom: '16px' }}>
                  <div className="panel-title-sec">
                    <Zap size={15} className="accent-text-icon" />
                    <h4>Recommended Recovery Operations</h4>
                  </div>
                  <span className="panel-count font-mono">{auditResult.recommendations.length} Flagged</span>
                </div>

                <div className="checklist-list">
                  {auditResult.recommendations.length > 0 ? (
                    auditResult.recommendations.map((rec, idx) => (
                      <div key={idx} className="results-checklist-item" style={{ borderLeft: rec.severity === 'high' ? '3px solid #ff8b77' : rec.severity === 'medium' ? '3px solid #f59e0b' : '3px solid var(--accent)' }}>
                        <div className="results-checklist-item-text" style={{ width: '100%' }}>
                          <div className="results-audit-item-head" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <h5 style={{ fontSize: '14px', margin: 0 }}>{rec.title}</h5>
                              <span className={`severity-badge severity-${rec.severity}`}>
                                {rec.severity}
                              </span>
                            </div>
                            <span className="results-reclaim-badge font-mono">
                              Save ${rec.monthlySavings}/mo
                            </span>
                          </div>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', marginTop: '6px', lineHeight: '1.5' }}>
                            {rec.reason}
                          </p>
                          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', display: 'block', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Affected Stack: {rec.tool}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="all-clean-state" style={{ padding: '32px 16px' }}>
                      <div className="all-clean-icon-wrapper">
                        <ShieldCheck size={28} className="accent-text-icon" />
                      </div>
                      <h5>Excellent Configuration!</h5>
                      <p>Our cost optimization engine discovered no obvious overspending paths for your stack setup. All systems are running efficiently.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Side Panel: Spending Breakdown & Email Capture */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Spending Breakdown */}
                <div className="results-optimizations-panel">
                  <div className="panel-header" style={{ marginBottom: '16px' }}>
                    <div className="panel-title-sec">
                      <Settings size={15} className="accent-text-icon" />
                      <h4>Monthly Spend Breakdown</h4>
                    </div>
                  </div>

                  <div className="breakdown-details-panel">
                    <div className="breakdown-meter-container">
                      <div className="breakdown-meter-label flex-between">
                        <span>Current Monthly Spend</span>
                        <span className="font-mono" style={{ fontWeight: 600 }}>${auditResult.summary.totalSpend.toLocaleString()}</span>
                      </div>
                      <div className="breakdown-meter-bar-bg">
                        <div className="breakdown-meter-bar current" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="breakdown-meter-container" style={{ marginTop: '20px' }}>
                      <div className="breakdown-meter-label flex-between">
                        <span>Optimized Monthly Spend</span>
                        <span className="font-mono" style={{ color: 'var(--accent-soft)', fontWeight: 600 }}>
                          ${(auditResult.summary.totalSpend - auditResult.monthlySavings).toLocaleString()}
                        </span>
                      </div>
                      <div className="breakdown-meter-bar-bg">
                        <div 
                          className="breakdown-meter-bar optimized" 
                          style={{ 
                            width: `${auditResult.summary.totalSpend > 0 ? ((auditResult.summary.totalSpend - auditResult.monthlySavings) / auditResult.summary.totalSpend) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                    </div>

                    <hr className="form-section-divider" style={{ margin: '20px 0' }} />

                    <div className="breakdown-row" style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '13px' }}>Primary Use Case</span>
                      <span style={{ textTransform: 'capitalize', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{auditData.primaryUseCase}</span>
                    </div>
                    <div className="breakdown-row" style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '13px' }}>Total Team Size</span>
                      <span className="font-mono" style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{auditData.teamSize} members</span>
                    </div>
                    <div className="breakdown-row">
                      <span style={{ fontSize: '13px' }}>Monthly Recovery Yield</span>
                      <span className="font-mono" style={{ color: '#10b981', fontWeight: 600, fontSize: '13px' }}>
                        +${auditResult.monthlySavings.toLocaleString()}/mo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Get Full Audit Report Email Capture */}
                <div className="results-optimizations-panel highlighted-card">
                  <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} className="accent-text-icon" />
                    <span>Get Full Audit Report</span>
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.5, marginBottom: '16px' }}>
                    Download a comprehensive SOC2-compliant cost optimization breakdown PDF complete with step-by-step downgrade guides.
                  </p>

                  <div className="cta-email-box">
                    {!isSubmitted ? (
                      <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                          type="email"
                          required
                          placeholder="enter enterprise email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="cta-input-field"
                          style={{ width: '100%', fontSize: '12px', padding: '10px 14px' }}
                        />
                        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '10px 14px', fontSize: '12px', justifyContent: 'center' }}>
                          <span>Dispatch PDF Report</span>
                          <ArrowRight size={12} />
                        </button>
                      </form>
                    ) : (
                      <div className="cta-micro-feedback" style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
                        <Check size={12} />
                        <span>PDF Scheduled for delivery!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <button
              onClick={() => {
                setCurrentRoute('landing');
                setAuditData(null);
              }}
              className="results-back-btn"
              style={{ marginTop: '40px' }}
            >
              <RotateCcw size={14} />
              <span>Audit Another Stack</span>
            </button>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="premium-footer">
        <div className="footer-inner">
          <div className="footer-grid-nav">
            <div className="footer-brand-column">
              <a href="#" className="brand-logo" onClick={() => setCurrentRoute('landing')}>
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
                <a href="#mistakes" className="footer-link">AI Mistakes</a>
                <a href="#how-it-works" className="footer-link">How it Works</a>
                <a href="#calculator" className="footer-link">Audit Form</a>
              </div>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">Supported AI</span>
              <div className="footer-links-list">
                <a href="#supported-tools" className="footer-link">ChatGPT &amp; Claude</a>
                <a href="#supported-tools" className="footer-link">Cursor &amp; Copilot</a>
                <a href="#supported-tools" className="footer-link">API Keys</a>
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
