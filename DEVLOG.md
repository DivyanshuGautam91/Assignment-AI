# Engineering Devlog | Sift AI Spend Audit 📝

This developer log tracks chronological checkpoints, critical blocker notes, and refactoring breakthroughs during the Sift AI Spend Audit MVP construction.

---

### Entry 1: May 20, 2026 — Project Initialization
- **Progress:** Completed Vite setup and scaffolded initial codebase. Created visual design token guidelines using Harmonies HSL CSS palette (sleek tech dark mode).
- **Blocker:** ESLint configuration clashes with React 19 rules on standard jsx-runtime. Resolved by updating the global parser parameters in `eslint.config.js`.

### Entry 2: May 21, 2026 — Cost Audit Engine Core v1.0
- **Progress:** Built the core mathematical functions for ChatGPT Plus vs Team downgrades, Cursor Pro vs Business downgrades, and Copilot redundancy detection.
- **Blocker:** Discovered that direct calculations were double-counting potential savings. For example, excess seats were flagged on Claude while the conversational overlap rule also consolidated Claude. Resolved by implementing a shared `overlapSavingsDeductions` mapping array to prune redundant seat computations.

### Entry 3: May 22, 2026 — Dynamic Form Building & Zod Schema
- **Progress:** Coded the `SpendForm` using `React Hook Form` and `Zod`. Built dynamic fields allowing developers to add/remove AI tools seamlessly.
- **Blocker:** Dynamic forms triggered complete UI layout shifts when cards were appended. Refactored card wrappers to utilize CSS transitions, bounding height shifts inside grid grids.

### Entry 4: May 24, 2026 — High-Impact Live Console Mock
- **Progress:** Coded the landing page premium interactive console simulator showing real-time cost-saving clicks, bar chart animations, and HSL glow transitions.
- **Blocker:** Running interactive state animations within standard render frames triggered visual stuttering in Safari. Optimised the chart using CSS cubic-bezier transition paths, running calculations asynchronously.

### Entry 5: May 25, 2026 — Custom Router Shell & Database Sync
- **Progress:** Coded a custom popstate/pushstate HTML5 router hook to maintain `/audit`, `/results`, `/report/:id` clean URLs without bundle overhead. Connected client states to Supabase table structures.
- **Blocker:** If the database backend is offline or keys are unconfigured, standard Supabase exceptions crash the app. Implemented an automatic detect query that gracefully redirects reports and capture leads to `localStorage` caches.

### Entry 6: May 26, 2026 — Asynchronous AI Cost Summary Module
- **Progress:** Coded the `aiSummaryService` supporting direct API requests to OpenAI GPT or Anthropic Claude, returning a professional ~100-word executive brief.
- **Blocker:** Pure ESM Node environment demands absolute import specifiers with extensions. Extensionless paths triggered node runner crashes during unit test runs. Fixed by changing imports inside `auditEngine.js` to include complete `.js` qualifiers.

### Entry 7: May 27, 2026 — Automated Test Runner & Production Compile
- **Progress:** Built a zero-dependency automated test script checking all 5 mandatory cost engine rules. Wrote CI actions for GitHub.
- **Blocker:** Verified full compliance on Vercel deployment standards. Cleared Vercel environmental settings, verified production build compilation with zero compile errors.
