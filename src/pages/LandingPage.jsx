import { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';

// Routing & Storage
import { navigate } from '../lib/router';
import { storage } from '../lib/storage';
import { auditEngine } from '../services/auditEngine';
import { useAudit } from '../hooks/useAudit';

// Components
import InteractiveDashboard from '../components/InteractiveDashboard';

// Data constants
import {
  TIMELINE_STEPS,
  TOOLS_LIST,
  OVERSPEND_MISTAKES,
  FAQS
} from '../constants/landingData';

export default function LandingPage() {
  const { submitLead } = useAudit();

  // Timeline Step State
  const [activeStep, setActiveStep] = useState(0);

  // Email CTA State
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleScrollToForm = (e) => {
    e.preventDefault();
    navigate('/audit');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      const cachedInput = storage.loadAuditInput();
      const cachedResult = storage.loadAuditResult();
      const success = await submitLead(email, company, role, cachedInput, cachedResult);
      if (success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail('');
          setCompany('');
          setRole('');
        }, 5000);
      }
    }
  };

  const handleSeeSampleAudit = (e) => {
    e.preventDefault();

    // 1. Generate realistic, high-impact mock data for hyper-growth startup (Wasteful rating)
    const sampleInput = {
      tools: [
        { toolId: 'chatgpt', planId: 'team', seats: 2, monthlySpend: 60 },
        { toolId: 'claude', planId: 'pro', seats: 12, monthlySpend: 240 },
        { toolId: 'cursor', planId: 'business', seats: 8, monthlySpend: 320 },
        { toolId: 'copilot', planId: 'business', seats: 15, monthlySpend: 285 },
        { toolId: 'openai_api', planId: 'api', seats: 1, monthlySpend: 980 },
        { toolId: 'anthropic_api', planId: 'api', seats: 1, monthlySpend: 420 },
        { toolId: 'gemini', planId: 'ultra', seats: 5, monthlySpend: 150 },
        { toolId: 'windsurf', planId: 'team', seats: 4, monthlySpend: 120 },
        { toolId: 'v0', planId: 'premium', seats: 8, monthlySpend: 160 }
      ],
      teamSize: 15,
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
          Sift automatically audits your ChatGPT, Claude, Cursor, Copilot, Gemini, Windsurf, v0, and API usage. Discover duplicate active seats, overlapping models, and sandboxed key leaks instantly.
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
            {TIMELINE_STEPS.map((step, idx) => (
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
          {TOOLS_LIST.map((tool, idx) => {
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
          {OVERSPEND_MISTAKES.map((mistake, idx) => {
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
          {FAQS.map((faq, idx) => (
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

      {/* FINAL CTA SECTION */}
      <section id="cta" className="section-container">
        <div className="cta-banner-card">
          <span className="section-head-tag">Instant Stack Scan</span>
          <h2 className="cta-heading">Want a detailed optimization report?</h2>
          <p className="cta-desc">
            Receive a secured, comprehensive SOC2-compliant cost consolidation and model optimization blueprint in your inbox.
          </p>

          <div className="cta-form-container">
            {!isSubmitted ? (
              <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your enterprise email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cta-input-field"
                  style={{ width: '100%' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%' }}>
                  <input
                    type="text"
                    placeholder="Company (optional)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="cta-input-field"
                    style={{ width: '100%' }}
                  />
                  <input
                    type="text"
                    placeholder="Role (CTO, PM, etc.) (optional)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="cta-input-field"
                    style={{ width: '100%' }}
                  />
                </div>
                <button type="submit" className="btn-cta-submit" style={{ width: '100%', justifyContent: 'center' }}>
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
}
