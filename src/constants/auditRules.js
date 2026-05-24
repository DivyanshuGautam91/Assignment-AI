export const AUDIT_RULES = [
  {
    id: 'chatgpt-team-overkill',
    title: 'Downgrade ChatGPT Team to Plus',
    reason: 'Small teams of 2 or fewer seats rarely benefit from the administrative control and workspace sharing features of ChatGPT Team. Plus provides identical model limits at $20/mo instead of $30/mo.',
    severity: 'medium',
    toolId: 'chatgpt',
    planId: 'team'
  },
  {
    id: 'cursor-business-unnecessary',
    title: 'Downgrade Cursor Business to Pro',
    reason: 'For smaller engineering teams (fewer than 10 members), Cursor Pro ($20/mo) provides identical composer speed and context lengths as Cursor Business ($40/mo) without enterprise markup.',
    severity: 'medium',
    toolId: 'cursor',
    planId: 'business'
  },
  {
    id: 'duplicate-chat-assistants',
    title: 'Consolidate Conversational Stack',
    reason: 'Both ChatGPT and Claude accounts are active. Conversational capabilities overlap by 95%. Consolidating your team onto a single tool (e.g. Claude Pro or ChatGPT Plus) eliminates duplicate costs.',
    severity: 'high'
  },
  {
    id: 'idle-seat-suspicion',
    title: 'Prune Excess Unallocated Seats',
    reason: 'Active allocated tool subscription seats exceed your total declared enterprise team size, indicating unassigned developer licenses or offboarded user accounts still being billed.',
    severity: 'high'
  },
  {
    id: 'high-api-spend',
    title: 'Implement Prompt Caching & Restricts',
    reason: 'High recurring API usage patterns detected. Integrating Prompt Caching on Anthropic API or structured context caching on OpenAI API can instantly slash processing costs by 30-50%.',
    severity: 'medium'
  },
  {
    id: 'copilot-cursor-duplication',
    title: 'Consolidate Coding Autocompletes',
    reason: 'Both Cursor and GitHub Copilot are active. Cursor possesses its own native completions, command bar, and multi-file editing models, rendering duplicate Copilot licenses redundant.',
    severity: 'high'
  }
];
