import { useState } from 'react';
import { 
  TrendingDown, 
  Sparkles, 
  Check, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers
} from 'lucide-react';

export default function InteractiveDashboard() {
  const [totalSpend, setTotalSpend] = useState(8820);
  const [identifiedWaste, setIdentifiedWaste] = useState(1120);
  const [totalSavings, setTotalSavings] = useState(1540);
  const [optimizations, setOptimizations] = useState([
    {
      id: 'openai',
      tool: 'OpenAI API',
      icon: Zap,
      issue: 'Playground test key active in sandbox env',
      potentialSavings: 680,
      actionText: 'Rotate Key',
      status: 'pending', // pending, optimizing, completed
      details: 'Recursive request loop processed 4.2M tokens in the last 48 hours without caching.'
    },
    {
      id: 'chatgpt',
      tool: 'ChatGPT Enterprise',
      icon: Sparkles,
      issue: '12 unassigned user seats allocated',
      potentialSavings: 360,
      actionText: 'Deprovision',
      status: 'pending',
      details: 'Assigned corporate licenses have shown 0 query sessions or logs for 60+ days.'
    },
    {
      id: 'claude',
      tool: 'Claude Pro',
      icon: Layers,
      issue: '4 duplicate Claude + ChatGPT seats active',
      potentialSavings: 80,
      actionText: 'Consolidate',
      status: 'pending',
      details: 'Users actively billed under both corporate tiers. Recommended: choose single platform.'
    }
  ]);

  const handleOptimize = (id, savings) => {
    // Set to optimizing
    setOptimizations(prev => 
      prev.map(opt => opt.id === id ? { ...opt, status: 'optimizing' } : opt)
    );

    // After a brief premium animation, mark completed and deduct values
    setTimeout(() => {
      setOptimizations(prev => 
        prev.map(opt => opt.id === id ? { ...opt, status: 'completed' } : opt)
      );
      setTotalSpend(prev => Math.max(0, prev - savings));
      setIdentifiedWaste(prev => Math.max(0, prev - savings));
      setTotalSavings(prev => prev + savings);
    }, 900);
  };

  return (
    <div className="premium-dashboard">
      {/* Dashboard Top Navigation Mock */}
      <div className="dashboard-nav">
        <div className="dashboard-logo-sec">
          <div className="logo-dot"></div>
          <span className="dashboard-logo-text">Sift AI Spend Console</span>
        </div>
        <div className="dashboard-status">
          <ShieldCheck size={14} className="accent-text-icon" />
          <span>Real-time monitoring active</span>
        </div>
      </div>

      {/* Grid of Spend Stat Cards */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="stat-label">Active Monthly Spend</div>
          <div className="stat-value-container">
            <span className="stat-symbol">$</span>
            <span className="stat-value font-mono">{totalSpend.toLocaleString()}</span>
          </div>
          <div className="stat-footer-text text-dim">
            <TrendingDown size={12} className="green-text-icon" />
            <span className="green-text">-{((totalSavings / 17270) * 100).toFixed(1)}%</span> this month
          </div>
        </div>

        <div className="dashboard-stat-card border-glow">
          <div className="stat-label flex-between">
            <span>Identified AI Waste</span>
            {identifiedWaste > 0 && <span className="pulse-tag">Action Needed</span>}
          </div>
          <div className="stat-value-container color-glow-text">
            <span className="stat-symbol">$</span>
            <span className="stat-value font-mono">{identifiedWaste.toLocaleString()}</span>
          </div>
          <div className="stat-footer-text">
            <AlertCircle size={12} className="warning-text-icon" />
            <span>{optimizations.filter(o => o.status === 'pending').length} items outstanding</span>
          </div>
        </div>

        <div className="dashboard-stat-card highlighted">
          <div className="stat-label">Realized Annual Savings</div>
          <div className="stat-value-container text-gradient-accent">
            <span className="stat-symbol">$</span>
            <span className="stat-value font-mono">{(totalSavings * 12).toLocaleString()}</span>
          </div>
          <div className="stat-footer-text">
            <Sparkles size={12} className="accent-text-icon" />
            <span>Optimized on Autopilot</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="dashboard-content-split">
        {/* Left: Interactive Alerts Feed */}
        <div className="dashboard-panel panel-alerts">
          <div className="panel-header">
            <div className="panel-title-sec">
              <Zap size={15} className="accent-text-icon animate-pulse-glow" />
              <h4>Sift AI Audit Alerts</h4>
            </div>
            <span className="panel-count font-mono">{optimizations.filter(o => o.status !== 'completed').length} Pending</span>
          </div>

          <div className="alerts-list">
            {optimizations.map((opt) => {
              const Icon = opt.icon;
              return (
                <div 
                  key={opt.id} 
                  className={`alert-item-card status-${opt.status}`}
                >
                  <div className="alert-item-body">
                    <div className="alert-tool-badge">
                      <Icon size={16} className="alert-tool-icon" />
                      <span className="alert-tool-name">{opt.tool}</span>
                    </div>
                    <div className="alert-text-group">
                      <p className="alert-issue-title">{opt.issue}</p>
                      <p className="alert-issue-desc">{opt.details}</p>
                    </div>
                  </div>

                  <div className="alert-item-actions">
                    <div className="alert-savings-badge">
                      <span className="text-dim">Save</span>
                      <span className="alert-savings-amount font-mono">${opt.potentialSavings}/mo</span>
                    </div>

                    {opt.status === 'pending' && (
                      <button 
                        onClick={() => handleOptimize(opt.id, opt.potentialSavings)}
                        className="btn-dashboard-action"
                      >
                        <span>{opt.actionText}</span>
                        <ArrowRight size={13} className="btn-dash-arrow" />
                      </button>
                    )}

                    {opt.status === 'optimizing' && (
                      <button className="btn-dashboard-action loading" disabled>
                        <div className="dash-spinner"></div>
                        <span>Sifting...</span>
                      </button>
                    )}

                    {opt.status === 'completed' && (
                      <div className="completed-badge">
                        <Check size={14} className="check-icon" />
                        <span>Optimized</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {optimizations.every(o => o.status === 'completed') && (
              <div className="all-clean-state">
                <div className="all-clean-icon-wrapper">
                  <ShieldCheck size={28} className="accent-text-icon" />
                </div>
                <h5>All Clear! Stack Optimized</h5>
                <p>Your subscription configuration is fully optimized. We will notify you when new anomalies arise.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Visual Savings Progress Graph */}
        <div className="dashboard-panel panel-chart">
          <div className="panel-header">
            <div className="panel-title-sec">
              <BarChart3 size={15} className="accent-text-icon" />
              <h4>Monthly AI Cost Projection</h4>
            </div>
          </div>
          
          <div className="chart-wrapper">
            <div className="chart-bars-container">
              {/* March */}
              <div className="chart-col-bar">
                <div className="bar-height-wrapper">
                  <div className="bar-block original" style={{ height: '100%' }}>
                    <span className="bar-value">$17,270</span>
                  </div>
                </div>
                <span className="bar-label">March</span>
              </div>
              
              {/* April */}
              <div className="chart-col-bar">
                <div className="bar-height-wrapper">
                  <div className="bar-block original" style={{ height: '88%' }}>
                    <span className="bar-value">$14,820</span>
                  </div>
                </div>
                <span className="bar-label">April (Current)</span>
              </div>

              {/* May (Projected) */}
              <div className="chart-col-bar">
                <div className="bar-height-wrapper">
                  <div 
                    className="bar-block optimized" 
                    style={{ 
                      height: `${(totalSpend / 17270) * 100}%`,
                      transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <span className="bar-value">${totalSpend.toLocaleString()}</span>
                  </div>
                </div>
                <span className="bar-label accent-label">May (Sifted)</span>
              </div>
            </div>
            
            <div className="chart-legend-box">
              <div className="legend-item">
                <span className="legend-dot color-original"></span>
                <span>Unoptimized Spend</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot color-optimized"></span>
                <span>Optimized Spend with Sift AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
