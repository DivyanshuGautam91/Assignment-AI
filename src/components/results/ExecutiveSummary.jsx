import { ShieldAlert, Info } from 'lucide-react';

export default function ExecutiveSummary({ recommendations, wasteScore, stackEfficiency }) {
  // Generate dynamic, intelligent summary text based on triggered recommendations
  const generateIntelligentSummary = () => {
    if (!recommendations || recommendations.length === 0) {
      return "Your organization’s generative AI stack is operating at peak financial efficiency. Sift AI Auditing found zero structural redundant seats, overlapping LLM interfaces, or API context leaks. Excellent configuration control.";
    }

    const hasConversationalOverlap = recommendations.some(r => r.tool.includes('ChatGPT & Claude'));
    const hasAutocompleteOverlap = recommendations.some(r => r.tool.includes('GitHub Copilot'));
    const hasTeamOverkill = recommendations.some(r => r.title.includes('Team') || r.title.includes('Business'));
    const hasIdleSeats = recommendations.some(r => r.title.includes('Prune') || r.title.includes('Idle'));
    const hasHighApi = recommendations.some(r => r.title.includes('Caching') || r.tool.includes('API'));

    let findings = [];
    if (hasConversationalOverlap) findings.push("conversational chatbot duplicate licensing (ChatGPT + Claude Pro)");
    if (hasAutocompleteOverlap) findings.push("overlapping developer autocompletion tools (GitHub Copilot alongside Cursor)");
    if (hasTeamOverkill) findings.push("excess premium business/team tiers with small footprints");
    if (hasIdleSeats) findings.push("dangling unallocated developer seat volumes");
    if (hasHighApi) findings.push("under-optimized billing keys lacking active prompt-caching headers");

    const severityText = wasteScore > 35 
      ? "exhibits severe financial leaks" 
      : wasteScore > 15 
      ? "appears moderately oversubscribed" 
      : "shows minor efficiency opportunities";

    let summaryText = `Based on our deep scan, your AI footprint ${severityText} across ${findings.slice(0, 2).join(" and ")}${findings.length > 2 ? `, as well as ${findings.slice(2).join(", ")}` : ""}. `;

    if (wasteScore > 30) {
      summaryText += "Immediate seat de-provisioning and prompt caching integration are highly recommended to prevent recurring monthly billing overhead.";
    } else if (wasteScore > 15) {
      summaryText += "Substantial savings can be captured by standardizing developer environments and downgrading unnecessary team administrative tiers.";
    } else {
      summaryText += "Minor adjustments will ensure your subscriptions are perfectly scaled to your team's size and workflows.";
    }

    return summaryText;
  };

  const getEfficiencyColorClass = () => {
    if (stackEfficiency === 'Low') return 'text-red font-mono';
    if (stackEfficiency === 'Moderate') return 'text-amber font-mono';
    return 'text-green font-mono';
  };

  return (
    <div className="results-optimizations-panel executive-summary-card">
      <div className="panel-header" style={{ marginBottom: '14px', borderBottom: 'none', paddingBottom: 0 }}>
        <div className="panel-title-sec">
          <ShieldAlert size={16} className="accent-text-icon" />
          <h4>Executive Audit Summary</h4>
        </div>
        <span className={`summary-efficiency-tag ${stackEfficiency.toLowerCase()}`}>
          Efficiency: {stackEfficiency}
        </span>
      </div>

      <div className="executive-summary-body">
        <p className="summary-text">{generateIntelligentSummary()}</p>
        
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
