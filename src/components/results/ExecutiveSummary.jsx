import { useState, useEffect } from 'react';
import { ShieldAlert, Sparkles } from 'lucide-react';
import { aiSummaryService } from '../../services/aiSummaryService';

export default function ExecutiveSummary({ 
  recommendations, 
  wasteScore, 
  stackEfficiency,
  auditInput,
  auditResult
}) {
  // Compute fallback summary immediately to avoid empty space/flicker
  const fallbackText = aiSummaryService.generateDeterministicFallback(
    auditInput || { tools: [] }, 
    auditResult || { recommendations, monthlySavings: 0, annualSavings: 0 }
  );

  const [summaryText, setSummaryText] = useState(fallbackText);
  const [isAiGenerated, setIsAiGenerated] = useState(false);

  useEffect(() => {
    if (auditInput && auditResult) {
      aiSummaryService.generateSummary(auditInput, auditResult)
        .then(content => {
          if (content && content !== fallbackText) {
            setSummaryText(content);
            const hasApiKey = Boolean(import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_ANTHROPIC_API_KEY);
            if (hasApiKey) {
              setIsAiGenerated(true);
            }
          }
        })
        .catch(err => {
          console.error('Failed to resolve AI summary', err);
        });
    }
  }, [auditInput, auditResult, fallbackText]);

  return (
    <div className="results-optimizations-panel executive-summary-card">
      <div className="panel-header" style={{ marginBottom: '14px', borderBottom: 'none', paddingBottom: 0 }}>
        <div className="panel-title-sec">
          <ShieldAlert size={16} className="accent-text-icon" />
          <h4>Executive Audit Summary</h4>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {isAiGenerated && (
            <span className="summary-efficiency-tag font-mono" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: 'var(--accent-soft)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={11} />
              <span>AI GENERATED</span>
            </span>
          )}
          <span className={`summary-efficiency-tag ${stackEfficiency.toLowerCase()}`}>
            Efficiency: {stackEfficiency}
          </span>
        </div>
      </div>

      <div className="executive-summary-body">
        <p className="summary-text" style={{ lineHeight: '1.6', fontSize: '14px', color: 'var(--text-secondary)' }}>
          {summaryText}
        </p>
        
        <div className="summary-insights-box">
          <div className="insight-stat">
            <span className="insight-label">Waste Index</span>
            <span className="insight-value text-gradient-accent">{wasteScore}%</span>
          </div>
          <div className="insight-divider"></div>
          <div className="insight-stat">
            <span className="insight-label">Action Priority</span>
            <span className="insight-value" style={{ color: wasteScore > 30 ? '#ff8b77' : wasteScore > 15 ? '#f59e0b' : '#10b981' }}>
              {wasteScore > 30 ? 'CRITICAL' : wasteScore > 15 ? 'HIGH' : 'STANDARD'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
