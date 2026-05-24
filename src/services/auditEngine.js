import { AUDIT_RULES } from '../constants/auditRules';
import { savingsCalculator } from '../utils/savingsCalculator';

export const auditEngine = {
  run: (input) => {
    if (!input || !Array.isArray(input.tools)) {
      return {
        monthlySavings: 0,
        annualSavings: 0,
        recommendations: [],
        summary: {
          wasteScore: 0,
          stackEfficiency: 'Optimal',
          opportunitiesFound: 0,
          totalSpend: 0
        }
      };
    }

    const { tools = [], teamSize = 1 } = input;
    const recommendations = [];

    // Helper to find tool in list
    const findTool = (id) => tools.find(t => t.toolId === id);

    // Track which tools triggered overlap/consolidation rules so we don't double count idle seats
    const overlapSavingsDeductions = {};

    // 1. ChatGPT Team Overkill
    const chatgpt = findTool('chatgpt');
    if (chatgpt && chatgpt.planId === 'team' && chatgpt.seats <= 2) {
      const rule = AUDIT_RULES.find(r => r.id === 'chatgpt-team-overkill');
      const savings = Math.round(savingsCalculator.getChatGPTTeamSavings(chatgpt));
      if (savings > 0) {
        recommendations.push({
          tool: 'ChatGPT',
          title: rule.title,
          reason: rule.reason,
          monthlySavings: savings,
          severity: rule.severity
        });
      }
    }

    // 2. Cursor Business Unnecessary
    const cursor = findTool('cursor');
    if (cursor && cursor.planId === 'business' && teamSize < 10) {
      const rule = AUDIT_RULES.find(r => r.id === 'cursor-business-unnecessary');
      const savings = Math.round(savingsCalculator.getCursorBusinessSavings(cursor));
      if (savings > 0) {
        recommendations.push({
          tool: 'Cursor',
          title: rule.title,
          reason: rule.reason,
          monthlySavings: savings,
          severity: rule.severity
        });
      }
    }

    // 3. Duplicate Conversational Stack
    const claude = findTool('claude');
    if (chatgpt && claude) {
      const rule = AUDIT_RULES.find(r => r.id === 'duplicate-chat-assistants');
      const savings = Math.round(savingsCalculator.getConversationalOverlapSavings(chatgpt, claude));
      if (savings > 0) {
        recommendations.push({
          tool: 'ChatGPT & Claude',
          title: rule.title,
          reason: rule.reason,
          monthlySavings: savings,
          severity: rule.severity
        });
        // Log overlap so we don't double count idle seats on these same tools
        overlapSavingsDeductions['chatgpt'] = true;
        overlapSavingsDeductions['claude'] = true;
      }
    }

    // 4. Idle Seat Suspicion
    tools.forEach(tool => {
      if (tool.seats > teamSize && !overlapSavingsDeductions[tool.toolId]) {
        const rule = AUDIT_RULES.find(r => r.id === 'idle-seat-suspicion');
        const savings = Math.round(savingsCalculator.getIdleSeatSavings(tool, teamSize));
        if (savings > 0) {
          const formattedToolName = tool.toolId === 'openai_api' 
            ? 'OpenAI API' 
            : tool.toolId === 'anthropic_api' 
            ? 'Anthropic API' 
            : tool.toolId.toUpperCase();
          recommendations.push({
            tool: formattedToolName,
            title: `${rule.title} (${formattedToolName})`,
            reason: `Your active seats for ${formattedToolName} (${tool.seats}) exceed your total team size (${teamSize}). ${rule.reason}`,
            monthlySavings: savings,
            severity: rule.severity
          });
        }
      }
    });

    // 5. High API Spend / Prompt Caching
    const openaiApi = findTool('openai_api');
    if (openaiApi && openaiApi.monthlySpend > 300) {
      const rule = AUDIT_RULES.find(r => r.id === 'high-api-spend');
      const savings = Math.round(savingsCalculator.getHighAPISavings(openaiApi));
      if (savings > 0) {
        recommendations.push({
          tool: 'OpenAI API Direct',
          title: rule.title,
          reason: rule.reason,
          monthlySavings: savings,
          severity: rule.severity
        });
      }
    }
    const anthropicApi = findTool('anthropic_api');
    if (anthropicApi && anthropicApi.monthlySpend > 300) {
      const rule = AUDIT_RULES.find(r => r.id === 'high-api-spend');
      const savings = Math.round(savingsCalculator.getHighAPISavings(anthropicApi));
      if (savings > 0) {
        recommendations.push({
          tool: 'Anthropic API Direct',
          title: rule.title,
          reason: rule.reason,
          monthlySavings: savings,
          severity: rule.severity
        });
      }
    }

    // 6. Coding Autocompletes Duplication
    const copilot = findTool('copilot');
    if (cursor && copilot) {
      const rule = AUDIT_RULES.find(r => r.id === 'copilot-cursor-duplication');
      const savings = Math.round(savingsCalculator.getCopilotRedundancySavings(copilot));
      if (savings > 0) {
        recommendations.push({
          tool: 'GitHub Copilot',
          title: rule.title,
          reason: rule.reason,
          monthlySavings: savings,
          severity: rule.severity
        });
      }
    }

    // Calculate totals
    const totalSpend = tools.reduce((sum, t) => sum + (t.monthlySpend || 0), 0);
    const totalSavings = Math.min(totalSpend, recommendations.reduce((sum, r) => sum + r.monthlySavings, 0));
    const annualSavings = totalSavings * 12;

    const wasteScore = totalSpend > 0 ? Math.min(100, Math.round((totalSavings / totalSpend) * 100)) : 0;
    
    let stackEfficiency = 'Optimal';
    if (wasteScore > 35) {
      stackEfficiency = 'Low';
    } else if (wasteScore > 15) {
      stackEfficiency = 'Moderate';
    }

    return {
      monthlySavings: totalSavings,
      annualSavings,
      recommendations,
      summary: {
        wasteScore,
        stackEfficiency,
        opportunitiesFound: recommendations.length,
        totalSpend
      }
    };
  }
};
