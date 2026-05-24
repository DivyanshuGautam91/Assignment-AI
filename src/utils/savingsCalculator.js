/**
 * Calculations for specific rule-based savings
 */
export const savingsCalculator = {
  getChatGPTTeamSavings: (tool) => {
    // Team plan is $30/mo, Plus is $20/mo
    const seats = tool.seats || 1;
    const spend = tool.monthlySpend || 0;
    // Standard savings is $10 per seat, capped by total spend
    return Math.min(spend, seats * 10);
  },

  getCursorBusinessSavings: (tool) => {
    // Business is $40/mo, Pro is $20/mo
    const seats = tool.seats || 1;
    const spend = tool.monthlySpend || 0;
    // Standard savings is $20 per seat, capped by total spend
    return Math.min(spend, seats * 20);
  },

  getConversationalOverlapSavings: (chatgptTool, claudeTool) => {
    // Completely consolidate the cheaper platform into the other
    const chatgptSpend = chatgptTool.monthlySpend || 0;
    const claudeSpend = claudeTool.monthlySpend || 0;
    return Math.min(chatgptSpend, claudeSpend);
  },

  getIdleSeatSavings: (tool, teamSize) => {
    const seats = tool.seats || 0;
    const spend = tool.monthlySpend || 0;
    if (seats > teamSize && seats > 0) {
      const excessSeats = seats - teamSize;
      const seatCost = spend / seats;
      return excessSeats * seatCost;
    }
    return 0;
  },

  getHighAPISavings: (tool) => {
    const spend = tool.monthlySpend || 0;
    // Prompt caching can reduce total token usage costs by 30%
    return spend * 0.30;
  },

  getCopilotRedundancySavings: (copilotTool) => {
    // If developers are already using Cursor, GitHub Copilot is 100% redundant
    return copilotTool.monthlySpend || 0;
  }
};
