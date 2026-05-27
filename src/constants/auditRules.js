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
  },
  {
    id: 'ide-duplication',
    title: 'Consolidate Generative IDE Stack',
    reason: 'Both Cursor and Windsurf are active on the team. These agentic IDE platforms possess overlapping autocompletes, terminal agents, and design modules. Choosing a single standard IDE preserves developer cohesion and prunes redundant licenses.',
    severity: 'high'
  },
  {
    id: 'gemini-chatgpt-overlap',
    title: 'Consolidate Conversational Stack (Gemini)',
    reason: 'Gemini Advanced is active alongside ChatGPT/Claude subscriptions. Because reasoning model capabilities overlap significantly, standardizing on a single workspace assistant eliminates duplicate monthly licenses.',
    severity: 'medium'
  },
  {
    id: 'v0-seat-redundancy',
    title: 'Prune v0 UI Design Seat Sprawl',
    reason: 'v0 premium design licenses are active for the entire organization. Since v0 is optimized for frontend component generation, backend engineers or managers rarely utilize their quotas. Restricting access strictly to frontend designers will cut waste.',
    severity: 'medium'
  }
];
