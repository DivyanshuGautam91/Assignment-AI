# Key Performance Metrics (KPIs) | Sift AI Spend Audit 📈

This document defines the North Star metric, operational input metrics, and key performance registers that measure the business growth and product health of **Sift AI Spend Audit Platform**.

---

## 🌟 1. The North Star Metric

Our North Star Metric is:

### **Total Annualized Savings Identified and Recovered for Customers ($)**

* **Why this represents value:** We do not optimize for empty views or even total audits generated. Our product exists strictly to recover capital for startups. By tracking the raw sum of dollars Sift removes from redundant AI billing, we align our product development directly with customer value. When this metric goes up, it means our audit engine is working and our customers are saving massive capital.

---

## 📊 2. Three Vital Input Metrics

To drive our North Star metric, we track three distinct operational input metrics:

### Metric A: Audit Generation Conversion Rate (%)
* **Definition:** The percentage of landing page visitors who successfully complete the `SpendForm` and proceed to `/results`.
* **Actionable Value:** Measures the cognitive load and friction of our form layout. High conversion means our Zod and dynamic field forms are frictionless and easy to ingest.

### Metric B: Average Cost Leak Identified Per Audit ($)
* **Definition:** The mean monthly savings calculated by our rules engine (`auditEngine.js`) per submitted startup footprint.
* **Actionable Value:** Tracks the effectiveness of our rules matrix. A rising average leak value indicates that we are successfully identifying complex, high-value overlaps like Cursor & Windsurf IDE duplication or OpenAI API prompt caching.

### Metric C: PDF Dispatch Lead-Capture Rate (%)
* **Definition:** The percentage of users who view their Results page and successfully submit their contact profile (`email`, `company`, `role`) to "Dispatch PDF Report".
* **Actionable Value:** Measures the value of the generated audit report. If a user enters their company email and role after seeing their savings dashboard, it indicates that they find the audit findings highly actionable and want to share them with their team.

---

## 📉 3. Conversion Funnel Matrix

We track our viral customer acquisition funnel across standard checkpoints:

```text
Visitor Landed (100%)
  │
  ├──► Clicks "See Sample" or "Audit" (55% Ingestion Intent)
  │
  ├──► Generates Complete Spend Audit (24% Conversion to Results)
  │
  └──► Submits Lead Profile / Company Email (9.5% Conversion to Customer Lead)
```
