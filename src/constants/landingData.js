import { 
  Sparkles, 
  Layers, 
  Terminal, 
  GitBranch, 
  Globe, 
  Zap, 
  Database,
  Search,
  ShieldCheck
} from 'lucide-react';

export const TIMELINE_STEPS = [
  {
    title: "Input AI stack & details",
    description: "Securely input your active AI platforms, active plan tiers, total seats, and estimated monthly budgets. Takes less than 60 seconds.",
    label: "STACK INGESTION"
  },
  {
    title: "Scan via AI Audit Engine",
    description: "Our intelligence engine maps employee access logs, flags redundant model subscriptions, and discovers abandoned API keys.",
    label: "AUDIT ALGORITHM"
  },
  {
    title: "Receive Savings Report",
    description: "Get an instant, actionable breakdown of active cost leaks, seat downgrade pathways, and optimized fallback configurations.",
    label: "RECOVERY ANALYSIS"
  }
];

export const TOOLS_LIST = [
  { name: "ChatGPT Plus/Team", category: "General Chat", icon: Sparkles, bg: "rgba(16, 163, 127, 0.05)", text: "Many teams overpay by using Team plans unnecessarily when individual Plus is enough." },
  { name: "Claude Pro/Team", category: "Creative & Coding", icon: Layers, bg: "rgba(217, 119, 6, 0.05)", text: "Overlapping subscriptions with ChatGPT. Highly common to pay for both for single users." },
  { name: "Cursor Business", category: "IDE Composer", icon: Terminal, bg: "rgba(255, 255, 255, 0.03)", text: "Business tier features often inactive or unused by junior development teams." },
  { name: "GitHub Copilot", category: "Inline Autocomplete", icon: GitBranch, bg: "rgba(99, 102, 241, 0.05)", text: "Assigned licenses often redundant for developers already using Cursor Composer." },
  { name: "Gemini Advanced", category: "Workspace AI", icon: Globe, bg: "rgba(66, 133, 244, 0.05)", text: "Duplicate workspace additions active for employees who only require base models." },
  { name: "OpenAI API Keys", category: "Model Integration", icon: Zap, bg: "rgba(16, 163, 127, 0.05)", text: "Untracked testing sandboxes and developer sandbox keys leaking recurring context spend." },
  { name: "Anthropic API", category: "Developer API", icon: Database, bg: "rgba(217, 119, 6, 0.05)", text: "Missing prompt caching setups leading to expensive multi-token repetitive processing." },
  { name: "Windsurf / v0", category: "Generative UI & IDE", icon: Zap, bg: "rgba(14, 165, 233, 0.05)", text: "Active team seats running during idle prototyping or planning cycles." }
];

export const OVERSPEND_MISTAKES = [
  {
    title: "Redundant Team plans with 2 users",
    description: "Subscribing to ChatGPT/Claude Team tiers which mandate minimum seat purchases, when separate Pro/Plus keys serve the same role.",
    icon: Search
  },
  {
    title: "Paying for ChatGPT + Claude together",
    description: "Over 40% of tech employees hold concurrent individual accounts under both OpenAI and Anthropic, paying double for overlapping capabilities.",
    icon: Layers
  },
  {
    title: "Idle Cursor developer seats",
    description: "Corporate dev licenses sit allocated to product managers or offboarded engineers who have logged 0 compiler requests for months.",
    icon: GitBranch
  },
  {
    title: "Untracked Sandbox API tokens",
    description: "Development sandbox keys left embedded in testing scripts, triggering recurring recursive backend loops without active rate restricts.",
    icon: Zap
  },
  {
    title: "Underutilized Enterprise suites",
    description: "Paying for expensive Enterprise contracts when standard Pro seat tiers are fully sufficient for 90% of your staff workflows.",
    icon: ShieldCheck
  }
];

export const FAQS = [
  {
    question: "How does the Sift AI Spend Audit work?",
    answer: "Sift scans your active SaaS inventory, employee platform directories, and API billing logs. It crosses developer tools (Cursor/Copilot) and chat platforms (ChatGPT/Claude) to discover duplicate accounts and unoptimized seat plans."
  },
  {
    question: "Are our prompt contexts, codebases, or raw queries read?",
    answer: "Absolutely not. Sift does not interface with your code repositories, model prompt histories, raw chatbot queries, or completions. We integrate strictly with billing configurations and active workspace seating registers."
  },
  {
    question: "Is Sift secure and compliant for enterprise tech stacks?",
    answer: "Yes, Sift operates under read-only metadata APIs and is fully SOC2 Type II certified. All authentication parameters are encrypted using AES-256 at-rest, and we follow strict GDPR privacy rules."
  },
  {
    question: "Can Sift automate active downgrades or seat removals?",
    answer: "You are in complete control. Sift acts as a recommendation engine. When Sift flags duplicate seats or sandbox key leaks, you can approve the optimization in 1-Click from the console, or automate routine audits."
  }
];
