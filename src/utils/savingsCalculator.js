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
  },

  getIdeOverlapSavings: (cursorTool, windsurfTool) => {
    // Consolidate onto a single IDE (e.g. standardizing on Cursor) and prune the cheaper Windsurf licenses
    const cursorSpend = cursorTool.monthlySpend || 0;
    const windsurfSpend = windsurfTool.monthlySpend || 0;
    return Math.min(cursorSpend, windsurfSpend);
  },

  getGeminiOverlapSavings: (geminiTool) => {
    // Prune duplicate conversational assistants
    return geminiTool.monthlySpend || 0;
  },

  getV0RedundancySavings: (v0Tool, teamSize) => {
    const seats = v0Tool.seats || 0;
    const spend = v0Tool.monthlySpend || 0;
    if (seats <= 1) return 0;
    
    // Assume only 30% of the active team size requires v0 frontend seat allocations
    const frontendEngineers = Math.max(1, Math.ceil(teamSize * 0.3));
    if (seats > frontendEngineers) {
      const excessSeats = seats - frontendEngineers;
      const costPerSeat = spend / seats;
      return excessSeats * costPerSeat;
    }
    return 0;
  }
};
