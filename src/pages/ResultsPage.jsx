import { useEffect, useState } from 'react';
import { navigate } from '../lib/router';
import { storage } from '../lib/storage';
import { 
  RotateCcw, 
  ArrowRight, 
  FileText, 
  Check, 
  ShieldCheck, 
  ArrowLeft,
  Sparkles,
  Inbox
} from 'lucide-react';

// Subcomponents
import SavingsHero from '../components/results/SavingsHero';
import ExecutiveSummary from '../components/results/ExecutiveSummary';
import Recommendations from '../components/results/Recommendations';
import SpendComparison from '../components/results/SpendComparison';
import StackHealthScore from '../components/results/StackHealthScore';

export default function ResultsPage() {
  const [auditInput, setAuditInput] = useState(null);
  const [auditResult, setAuditResult] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Load persisted report from storage
    const cachedInput = storage.loadAuditInput();
    const cachedResult = storage.loadAuditResult();

    if (cachedInput && cachedResult) {
      setAuditInput(cachedInput);
      setAuditResult(cachedResult);
    }
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const handleRunAnother = () => {
    // Clear final storage so they can execute fresh but keep the form draft for quick adjustments
    storage.clearAuditInput();
    storage.clearAuditResult();
    navigate('/audit');
  };

  // 1. Better Empty State if no audit report found
  if (!auditInput || !auditResult) {
    return (
      <div className="empty-results-screen">
        <div className="glow-mesh-overlay"></div>
        
        <div className="empty-state-card animated-card">
          <div className="empty-icon-box">
            <Inbox size={32} className="text-dim" />
          </div>
          <h2 className="empty-title">No Audit Report Found</h2>
          <p className="empty-description">
            You haven't run a subscription spend audit yet, or your previous report was cleared. Sift can analyze your active licenses in under a minute.
          </p>
          <div className="empty-actions">
            <button 
              onClick={() => navigate('/audit')} 
              className="btn-primary"
            >
              <span>Start Free Audit</span>
              <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="btn-secondary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page-wrapper">
      <div className="glow-mesh-overlay"></div>

      <section className="section-container" style={{ paddingTop: '110px', paddingBottom: '80px' }}>
        {/* Navigation Breadcrumb */}
        <div className="breadcrumb-nav">
          <button onClick={() => navigate('/')} className="back-link-btn">
            <ArrowLeft size={13} />
            <span>Home</span>
          </button>
          <span className="bread-sep">/</span>
          <span className="bread-active">Spend Report</span>
        </div>

        {/* Upgrade Header */}
        <div className="results-header-box" style={{ marginBottom: '32px' }}>
          <h1 className="title-large" style={{ fontSize: '44px', marginBottom: '12px', textAlign: 'left', marginLeft: 0 }}>
            Subscription Cost Recovery Report
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '720px' }}>
            We analyzed <strong>{auditInput.tools.length}</strong> active platform integrations across your enterprise team of <strong>{auditInput.teamSize}</strong> members using Sift Cost Optimization Engine.
          </p>
        </div>

        {/* 2. Upgraded Premium Layout */}
        <div className="results-layout-grid">
          
          {/* Main Hero Card Span */}
          <div className="results-hero-span">
            <SavingsHero 
              annualSavings={auditResult.annualSavings}
              monthlySavings={auditResult.monthlySavings}
              opportunitiesFound={auditResult.summary.opportunitiesFound}
            />
          </div>

          {/* Left Column: Summary & Specific Action Recommendations */}
          <div className="results-main-col">
            <ExecutiveSummary 
              recommendations={auditResult.recommendations}
              wasteScore={auditResult.summary.wasteScore}
              stackEfficiency={auditResult.summary.stackEfficiency}
            />

            <Recommendations 
              recommendations={auditResult.recommendations}
            />
          </div>

          {/* Right Column: Comparative projections, Health scales, and PDF Dispatcher */}
          <div className="results-side-col">
            <StackHealthScore 
              wasteScore={auditResult.summary.wasteScore}
            />

            <SpendComparison 
              totalSpend={auditResult.summary.totalSpend}
              monthlySavings={auditResult.monthlySavings}
              annualSavings={auditResult.annualSavings}
            />

            {/* Premium Download PDF Board */}
            <div className="results-optimizations-panel dispatch-pdf-card">
              <div className="pdf-decor-circle"></div>
              <h4 className="dispatch-title">
                <Sparkles size={14} className="accent-text-icon" />
                <span>Export Executive Report</span>
              </h4>
              <p className="dispatch-desc">
                Download a secure SOC2 compliant cost optimization breakdown PDF complete with structural guidelines and standard de-provisioning guides.
              </p>

              <div className="dispatch-action-group">
                {!isSubmitted ? (
                  <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                    <input
                      type="email"
                      required
                      placeholder="enter enterprise email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="cta-input-field"
                      style={{ width: '100%', fontSize: '13px', padding: '12px 14px', background: '#09090b' }}
                    />
                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 14px', fontSize: '13px', justifyContent: 'center' }}>
                      <FileText size={14} />
                      <span>Dispatch PDF Report</span>
                    </button>
                  </form>
                ) : (
                  <div className="cta-micro-feedback" style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', width: '100%' }}>
                    <Check size={14} />
                    <span>PDF Scheduled for delivery!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upgraded actions row */}
        <div className="results-action-row" style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-primary)', paddingTop: '24px' }}>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
            style={{ padding: '10px 20px', fontSize: '13px' }}
          >
            Return to Dashboard
          </button>
          
          <button
            onClick={handleRunAnother}
            className="btn-primary"
            style={{ padding: '10px 22px', fontSize: '13px', gap: '8px' }}
          >
            <RotateCcw size={13} />
            <span>Run Another Audit</span>
          </button>
        </div>
      </section>
    </div>
  );
}
