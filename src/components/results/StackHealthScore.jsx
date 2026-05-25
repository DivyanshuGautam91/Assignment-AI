import { ShieldCheck, ShieldAlert, Heart } from 'lucide-react';

export default function StackHealthScore({ wasteScore }) {
  const score = Math.max(0, 100 - wasteScore);
  
  let category = 'Excellent';
  let color = '#10b981'; // Emerald
  let description = 'Perfect alignment between seat provision and usage footprint.';
  let icon = ShieldCheck;

  if (score < 50) {
    category = 'Wasteful';
    color = '#f43f5e'; // Rose
    description = 'Severe overspend detected. Redundant subscriptions require immediate consolidation.';
    icon = ShieldAlert;
  } else if (score < 70) {
    category = 'Moderate';
    color = '#f59e0b'; // Amber
    description = 'Moderate waste. Multi-token processing leaks and duplicate seats exist.';
    icon = ShieldAlert;
  } else if (score < 85) {
    category = 'Good';
    color = '#6366f1'; // Indigo
    description = 'Healthy configuration with minor optimization adjustments outstanding.';
    icon = ShieldCheck;
  }

  const IconComponent = icon;

  // Circle circumference is 2 * Math.PI * r = 2 * 3.14159 * 38 = 238.76
  const strokeDashoffset = 238.76 - (238.76 * score) / 100;

  return (
    <div className="results-optimizations-panel health-score-card">
      <div className="panel-header" style={{ marginBottom: '16px', borderBottom: 'none', paddingBottom: 0 }}>
        <div className="panel-title-sec">
          <Heart size={16} className="accent-text-icon" />
          <h4>Stack Health Index</h4>
        </div>
      </div>

      <div className="health-score-body">
        {/* Radial SVG Gauge */}
        <div className="radial-gauge-wrapper">
          <svg className="radial-gauge-svg" viewBox="0 0 100 100">
            <circle className="gauge-circle-bg" cx="50" cy="50" r="38" />
            <circle 
              className="gauge-circle-fill" 
              cx="50" 
              cy="50" 
              r="38" 
              style={{
                stroke: color,
                strokeDasharray: 238.76,
                strokeDashoffset: strokeDashoffset,
                filter: `drop-shadow(0 0 6px ${color}55)`
              }}
            />
          </svg>
          <div className="gauge-content">
            <span className="gauge-score font-mono" style={{ color }}>{score}</span>
            <span className="gauge-label">SCORE</span>
          </div>
        </div>

        {/* Category Description */}
        <div className="health-details-block">
          <div className="health-category-pill" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}35`, color }}>
            <IconComponent size={14} />
            <span className="font-mono">{category.toUpperCase()}</span>
          </div>
          <p className="health-desc-text">{description}</p>
        </div>
      </div>
    </div>
  );
}
