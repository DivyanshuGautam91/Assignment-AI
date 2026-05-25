import SpendForm from '../components/audit/SpendForm';
import { ShieldCheck, Info } from 'lucide-react';
import { navigate } from '../lib/router';
import { storage } from '../lib/storage';
import { auditEngine } from '../services/auditEngine';

export default function AuditPage() {
  const handleFormSubmit = (data) => {
    // 1. Run the audit engine on submitted form data
    const result = auditEngine.run(data);

    // 2. Persist the inputs and computed reports in localStorage
    storage.saveAuditInput(data);
    storage.saveAuditResult(result);

    // 3. Navigate to loading state
    navigate('/audit-loading');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="audit-form-page-wrapper">
      {/* Background glowing mesh */}
      <div className="glow-mesh-overlay"></div>

      <div className="section-container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        {/* Focused Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="hero-tag" style={{ marginBottom: '16px' }}>
            <ShieldCheck size={13} className="hero-tag-dot" style={{ animation: 'none', background: 'transparent' }} />
            <span>SECURE SOC2 COMPLIANT ENCRYPTED AUDITING</span>
          </div>
          
          <h1 className="title-large" style={{ fontSize: '48px', marginBottom: '16px', maxW: '600px' }}>
            Scale down your AI spend
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '15px' }}>
            Connect your SaaS profiles in 60 seconds. List active platforms, teams, and plan tiers to compile an automated cost consolidation audit.
          </p>
        </div>

        {/* Dynamic Form wrapper */}
        <div className="focused-form-card">
          <SpendForm 
            onSubmitSuccess={handleFormSubmit}
            onCancel={handleCancel}
          />
        </div>

        {/* Security / Compliance Tagline */}
        <div className="form-security-footer">
          <Info size={14} className="accent-text-icon" />
          <span>Your security is our absolute priority. We strictly read billing metadata registers. Zero prompt history, raw source code, or conversational contexts are ever analyzed or stored.</span>
        </div>
      </div>
    </div>
  );
}
