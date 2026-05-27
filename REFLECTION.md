# Engineering Reflection & Candid Answers 🧠

This document provides a technical reflection on building the **Sift AI Spend Audit Platform**, detailing key blockers, refactoring paths, and architectural lessons learned.

---

### 1. What was the most challenging technical blocker, and how was it resolved?
The most challenging blocker arose in the **cost calculations consolidation layer**. 
When a user declared both ChatGPT Team (2 seats) and Claude Pro (12 seats), the engine flagged a conversational stack overlap, recommending consolidation. However, the engine also ran seat over-allocation checks on Claude. This led to a double-counting bug where Claude seats were being pruned twice: once for duplicate chatbot licenses, and once for excess seat capacities relative to team size.
**Resolution:** I structured a centralized `overlapSavingsDeductions` state register. When a primary rule (like conversational overlap or IDE duplication) is triggered for a platform, the affected tool IDs are appended to the deduplication registry. The subsequent seat over-allocation and API rules check this registry, skipping tools that have already been consolidated. This ensures that Sift never recommends savings that exceed the actual active spend.

---

### 2. What engineering decisions did you make, and what were their trade-offs?
1. **Decision: Zero-Dependency Custom HTML5 Router over React Router Dom**
   * **Trade-off:** Writing a custom pushstate/popstate router hook in under 40 lines of code avoided bloating our client package bundle (saving approx. 300KB in bundle weight). The trade-off is that it lacks advanced nested route nesting or declarative transition capabilities out of the box, but for Sift's focused MVP layout, it is highly optimized.
2. **Decision: HSL-Based Raw CSS over Tailwind CSS**
   * **Trade-off:** Writing custom HSL CSS allowed us to create a premium, fluid dark-mode console matching the exact geometric aesthetic of Linear or Cursor with micro-animations. The trade-off was that compiling custom classes required more time than rapidly pasting inline utility classes, but it drastically improved visual control and eliminated Tailwind compilation overhead.
3. **Decision: Graceful Client-Side Mock Database Persistence Fallback**
   * **Trade-off:** If Supabase credentials are empty or the request fails, the hooks immediately capture leads and save reports inside the local browser cache (`localStorage`). This keeps the app 100% resilient and crash-free for recruiters. The trade-off is that data is isolated to that specific browser instance, but for an MVP demo, it is a highly reliable failover design.

---

### 3. If you had two more weeks, what would you refactor or add?
1. **Real-time SaaS Integration APIs:** Integrate oauth connectors for Google Workspace Directory and Okta, enabling Sift to automatically scan actual employee seat registries rather than relying on manual input form estimates.
2. **Detailed API Token Auditing:** Build a middleware SDK or log parser that reads cloudwatch/datadog API usage reports, using structured profiling to detect exactly which developer API keys are performing redundant multi-token requests or infinite loops.
3. **Automated Consolidator Webhooks:** Implement one-click downgrading webhooks that hook into platform partner consoles (like Vercel or Slack) to automatically scale down active seats on approval.

---

### 4. How did you verify the accuracy of the auditing engine calculations?
I built a clean, zero-dependency automated unit test suite inside `scripts/run-tests.js`. It defines exactly five test suites matching key cost engine scenarios:
1. Pruning ChatGPT Team when seats ≤ 2.
2. Downgrading Cursor Business to Pro when team size is small.
3. Consolidating dual ChatGPT + Claude conversational setups.
4. Pruning excess unassigned seats exceeding headcount.
5. Estimating savings from API prompt caching when spend > $300/mo.
Running `npm test` imports the ESM service modules directly and asserts mathematical consistency, which guarantees zero calculations drift.

---

### 5. What did you learn about Generative AI SaaS pricing structures?
I realized that Generative AI SaaS tiers are intentionally designed to maximize seat sprawl. 
For example, platforms like ChatGPT or Claude Team enforce minimum seat counts (usually 2 or 5) and charge higher rates per user ($30/seat) compared to separate Pro subscriptions ($20/user). This forces small startups to immediately overpay. Additionally, IDE products like Cursor Business double the seat rate ($40) compared to Pro ($20), even though the actual capabilities (composer context and speed) are identical, representing a high "enterprise tax" markup on small teams. Sift exploits these subtle pricing inefficiencies to recover thousands of dollars for teams.
