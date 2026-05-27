# Unit Economics & Financial Projections | Sift AI Spend Audit 💰

This document maps out our business model, pricing plans, server overheads, Customer Acquisition Cost (CAC), and Lifetime Value (LTV) projections.

---

## 💵 1. B2B SaaS Tiered Pricing Structure

Sift monetizes by taking a small percentage of recovered cost or via a flat recurring fee for continuous stack optimization:

* **Starter Tier (Free):** Public calculator access, 1 manual audit per month, single PDF cost checklist export.
* **Pro Tier ($49/month):** Automated billing API integrations (Vercel, Vanta, Google Workspace), continuous anomalous billing alerts (infinite request loops, sandboxed key leaks), and single-click seat de-provisioning. Optimized for teams under 50 members.
* **Enterprise Tier ($199/month):** Custom SOC2 SAML integrations, multi-workspace tracking, quarterly spend review reports, and dedicated account managers. Optimized for high-growth tech teams (50+ employees).

---

## 📊 2. High-Yield Unit Economics

Our gross margins exceed **88%** because we run a lightweight, serverless client architecture with minimal background database loads.

```text
MONTHLY RUNNING COST (Per Active 100-User Cohort):
- Supabase Database Storage & Egress:      $25.00
- Hosting (Vercel Pro Node):                $20.00
- LLM API Summaries (OpenAI/Anthropic):     $12.50  (Based on 250 audits @ $0.05/request)
- Redis Cache (Upstash Edge):               $10.00
---------------------------------------------------
TOTAL OPERATIONAL COSTS:                   $67.50
RECURRING SUBSCRIPTION REVENUE (Pro):    $4,900.00  (100 users @ $49/mo)

GROSS MARGIN PERCENTAGE:                     98.6%
```

---

## 📈 3. Customer Acquisition Cost (CAC) vs. Lifetime Value (LTV)

Based on our warm, hyper-targeted LinkedIn outbound funnels and public lead-magnet calculator launches:

* **Customer Acquisition Cost (CAC) Target:** **$150.00**
  * **Blended CAC Breakdown:** $50 in automated LinkedIn campaign tools + $100 in organic developer write-up sponsorships (Hacker News sponsorship, developer newsletter sponsor slots).
* **Average Revenue Per Account (ARPU):** **$79.00/mo** (Weighted average of Pro and Enterprise adoption).
* **Average Customer Lifespan:** **18 months** (Startup growth cycles require continuous monthly automated seat pruning).
* **Projected Lifetime Value (LTV):** **$1,422.00** ($79.00/mo * 18 months).
* **LTV : CAC Ratio:** **9.5 : 1** (Extremely healthy ratio for early-stage B2B SaaS, highlighting the capital efficiency of organic product-led growth).
* **Payback Period:** **1.9 months** (Reclaiming CAC in under 60 days).
