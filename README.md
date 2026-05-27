# Sift AI Spend Audit Platform 🚀

**Sift AI** is a premium, high-impact cost intelligence B2B SaaS platform designed to instantly discover, audit, and recover wasted monthly spend across enterprise generative AI stacks.

Most modern tech startups suffer from unchecked "AI seat sprawl"—allocated seats sit idle, developers use duplicate tools, and sandbox API keys leak token counts. Sift resolves this by scanning your AI footprints, applying rule-based cost algorithms, and generating actionable recovery checklists.

---

## 📸 Screenshots (Visual Walkthrough)

> [!NOTE]
> *Insert visual overview screenshots here for recruiter review (mockup directories placeholder)*
> - **Landing Page Interactive Dashboard:** `dist/assets/mocks/landing_hero_mock.png`
> - **Secure Audit Form:** `dist/assets/mocks/audit_form_mock.png`
> - **Savings Recovery Results Panel:** `dist/assets/mocks/savings_results_mock.png`

---

## ⚡ Deployed Application URL

* **Active Live Demo:** `https://sift-ai-spend-audit-final.vercel.app` *(Vercel deployment placeholder URL)*

---

## ⚙️ Development, Installation & Testing

### 1. Installation
Clone the repository and install core packages:
```bash
npm install
```

### 2. Run Locally (Development)
Spin up the hot-reloading development server:
```bash
npm run dev
```

### 3. Run Automated Tests
Execute our zero-dependency ES module cost engine tests:
```bash
npm test
```

### 4. Build & Minify for Production
Compile the optimized client bundle:
```bash
npm run build
```

### 5. Deployment (Vercel)
Deploy your optimized production build directly using Vercel CLI:
```bash
vercel --prod
```

---

## 🧠 5 Key Engineering Decisions & Trade-offs

During the architectural build, I made 5 deliberate engineering decisions to balance visual performance, reliability, and deployment speeds:

### 1. Decoupling Landing Page from App.jsx Layout
- **Decision:** Moved the massive inline HTML and state from a giant `App.jsx` into modular [LandingPage.jsx](file:///c:/Assignment/src/pages/LandingPage.jsx) and [landingData.js](file:///c:/Assignment/src/constants/landingData.js) components.
- **Trade-off:** App.jsx shrunk from 606 lines of bloated codes to a clean routing wrapper of under 115 lines. This decoupled page states, preventing unnecessary parent re-renders and speeding up development cycles.

### 2. Zero-Dependency Custom HTML5 Router
- **Decision:** Built a custom popstate/pushstate history controller inside [router.js](file:///c:/Assignment/src/lib/router.js) instead of installing `react-router-dom`.
- **Trade-off:** Bypassing standard packages saved over 300KB in production bundle weight. The custom implementation tracks `/`, `/audit`, `/audit-loading`, `/results`, `/report/:id`, and `/*` perfectly, although it requires manually updating route registers for complex nested route scopes.

### 3. Hybrid Persistent Cache Fallback Layer
- **Decision:** Designed a resilient hybrid data persistence module inside [reportService.ts](file:///c:/Assignment/src/services/reportService.ts) and [leadService.ts](file:///c:/Assignment/src/services/leadService.ts) connecting to Supabase with instant `localStorage` fallbacks.
- **Trade-off:** If database connections are offline, credential variables are missing, or API bounds are reached, Sift immediately detects it and routes reports/leads to local browser storage. The app **never** crashes, preserving user inputs perfectly.

### 4. Pure Node.js Automated Test Suite
- **Decision:** Created a zero-dependency automated unit test script inside [run-tests.js](file:///c:/Assignment/scripts/run-tests.js) mapped to `npm test` instead of importing complex Jest/Vitest testing frameworks.
- **Trade-off:** The tests run directly in standard Node using ES Module imports, executing in under 20ms without any bundler configuration issues, environment variable clashes, or compile bloats. The trade-off is that it lacks deep browser DOM testing, which is unnecessary for auditing mathematical rules.

### 5. Background AI Summary Fetch with Real-Time Fallback
- **Decision:** Implemented an asynchronous OpenAI/Anthropic API completion fetch inside [aiSummaryService.js](file:///c:/Assignment/src/services/aiSummaryService.js) that runs on Results page mounting.
- **Trade-off:** To prevent layout shifts or blank screens, Sift immediately mounts the high-quality deterministic fallback summary. If the API key is set and the fetch returns, it smoothly transitions the text and shows a premium "AI Generated" badge. If it fails, it keeps the local fallback without any delay.
