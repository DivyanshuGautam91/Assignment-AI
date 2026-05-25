import { Sparkles, TrendingDown } from 'lucide-react';

export default function SavingsHero({ annualSavings, monthlySavings, opportunitiesFound }) {
  return (
    <div className="premium-savings-hero">
      <div className="hero-glow-back"></div>
      <div className="savings-hero-content">
        <div className="hero-top-badge">
          <Sparkles size={12} className="accent-text-icon" />
          <span>FINTECH COST AUDIT SUCCESSFULLY COMPILED</span>
        </div>
        
        <span className="savings-hero-sub">Estimated Annual Recovery Opportunity</span>
        <h2 className="savings-hero-big text-gradient-accent">
          You could save ${annualSavings.toLocaleString()}/year
        </h2>
        
        <p className="savings-hero-desc">
          Consolidating subscription packages and implementing prompt restrictions will recover approx. <strong>${monthlySavings.toLocaleString()}/month</strong> instantly across <strong>{opportunitiesFound}</strong> optimization channels.
        </p>

        <div className="savings-hero-footer">
          <div className="saving-pill">
            <TrendingDown size={14} />
            <span>Instant Recovery Enabled</span>
          </div>
          <span className="savings-engine-tag">Powered by Sift Auditing Algorithm v2.0</span>
        </div>
      </div>
    </div>
  );
}
