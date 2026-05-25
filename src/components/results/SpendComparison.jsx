import { BarChart3, TrendingDown } from 'lucide-react';

export default function SpendComparison({ totalSpend, monthlySavings, annualSavings }) {
  const currentMonthly = totalSpend;
  const optimizedMonthly = Math.max(0, currentMonthly - monthlySavings);

  const currentAnnual = currentMonthly * 12;
  const optimizedAnnual = Math.max(0, currentAnnual - annualSavings);

  // Compute percentages for visual fill (minimum 10% to look good)
  const monthlyFillPct = currentMonthly > 0 ? (optimizedMonthly / currentMonthly) * 100 : 0;
  const annualFillPct = currentAnnual > 0 ? (optimizedAnnual / currentAnnual) * 100 : 0;

  return (
    <div className="results-optimizations-panel spend-comparison-card">
      <div className="panel-header">
        <div className="panel-title-sec">
          <BarChart3 size={16} className="accent-text-icon" />
          <h4>Financial Footprint Projection</h4>
        </div>
        <span className="saving-percent-badge font-mono">
          Save {currentMonthly > 0 ? Math.round((monthlySavings / currentMonthly) * 100) : 0}%
        </span>
      </div>

      <div className="comparison-meters-grid">
        {/* Monthly Projection */}
        <div className="meter-column">
          <div className="meter-column-header">
            <h5>Monthly Spend</h5>
            <span className="meter-diff font-mono">-${monthlySavings.toLocaleString()}/mo</span>
          </div>

          <div className="meter-bar-container">
            {/* Current */}
            <div className="single-meter-row">
              <div className="meter-label-row font-mono">
                <span className="lbl">Current Stack</span>
                <span className="val">${currentMonthly.toLocaleString()}</span>
              </div>
              <div className="meter-bar-bg">
                <div className="meter-bar-fill current" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Optimized */}
            <div className="single-meter-row" style={{ marginTop: '16px' }}>
              <div className="meter-label-row font-mono">
                <span className="lbl accent-text">Optimized with Sift</span>
                <span className="val accent-text">${optimizedMonthly.toLocaleString()}</span>
              </div>
              <div className="meter-bar-bg">
                <div 
                  className="meter-bar-fill optimized" 
                  style={{ width: `${monthlyFillPct}%`, transition: 'width 1s ease-in-out' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Annual Projection */}
        <div className="meter-column">
          <div className="meter-column-header">
            <h5>Yearly Spend</h5>
            <span className="meter-diff font-mono">-${annualSavings.toLocaleString()}/yr</span>
          </div>

          <div className="meter-bar-container">
            {/* Current */}
            <div className="single-meter-row">
              <div className="meter-label-row font-mono">
                <span className="lbl">Current Stack</span>
                <span className="val">${currentAnnual.toLocaleString()}</span>
              </div>
              <div className="meter-bar-bg">
                <div className="meter-bar-fill current" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Optimized */}
            <div className="single-meter-row" style={{ marginTop: '16px' }}>
              <div className="meter-label-row font-mono">
                <span className="lbl accent-text">Optimized with Sift</span>
                <span className="val accent-text">${optimizedAnnual.toLocaleString()}</span>
              </div>
              <div className="meter-bar-bg">
                <div 
                  className="meter-bar-fill optimized" 
                  style={{ width: `${annualFillPct}%`, transition: 'width 1s ease-in-out' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
