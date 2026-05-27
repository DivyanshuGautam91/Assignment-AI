# AI Prompt Engineering Directory | Sift AI Spend Audit 💬

This file documents the system prompts, input contexts, and strict structural constraints used in the **Sift AI cost audit summary engine** (`src/services/aiSummaryService.js`).

---

## 🌐 1. Chat Completion Prompt Structure

The prompt is dispatched to OpenAI's `gpt-4o-mini` or Anthropic's `claude-3-5-haiku` chat completion API. It is structured to ingest dynamic JSON parameters, enforce executive tones, and maintain math consistencies.

### The System & User Prompt Template
```text
You are a professional cost intelligence assistant for Sift AI Spend Audit.
Write a personalized cost intelligence summary based on the following spend audit parameters.

SPEND AUDIT SUMMARY DATA:
- Total AI monthly spend: ${result.summary?.totalSpend || 0}/mo
- Active tools: ${input.tools?.map(t => t.toolId).join(', ') || 'None'}
- Number of optimization opportunities: ${result.recommendations?.length || 0}
- Estimated monthly savings: ${result.monthlySavings}/mo
- Estimated yearly savings: ${result.annualSavings}/yr
- Specific findings/recommendations:
${result.recommendations?.map(r => `- [${r.severity.toUpperCase()}] ${r.tool}: ${r.title}. ${r.reason} (Saves $${r.monthlySavings}/mo)`).join('\n')}

CONSTRAINTS:
- Write exactly ONE paragraph between 80 and 120 words.
- Tone must be professional, authoritative, and helpful, like a startup founder explaining an audit to investors.
- Highlight specific tools (like Cursor, ChatGPT, Claude, OpenAI API) where duplication or over-allocation was detected.
- Maintain strict numerical consistency: monthly savings ($${result.monthlySavings}) and yearly savings ($${result.annualSavings}) MUST match exactly.
- Keep it clean, professional, and concise. Do NOT output markdown or headers - write exactly one paragraph of plain text.
```

---

## 🎯 2. Prompt Engineering Rationale

1. **Role Conditioning ("You are a professional cost intelligence assistant"):** Sets the persona parameters, steering the model away from generic greetings or friendly conversational introductions and forcing immediate executive focus.
2. **Context Separation:** Explicitly partitions structured variables (total spend, active tools, opportunities, and specific finding rules) to ensure the LLM has exact context pointers.
3. **Double Constraint Anchoring (Plain Text + Word Bounds):** Restricting to "exactly ONE paragraph between 80 and 120 words" and "Do NOT output markdown or headers" prevents layout breakage inside Sift's executive summary HSL card layout.
4. **Strict Numerical Anchoring:** Enforces that the computed totals ($${result.monthlySavings} and $${result.annualSavings}) match the rest of Sift's financial projection dials, preventing visual calculation drift.

---

## 📋 3. Sample Generated Output

For a team of 15 engineers with a combined spend of $2,635/month, the generated summary resolves as follows:

> "Your organization appears moderately oversubscribed across your generative AI stack. Sift detected redundant active seat allocations and platform overlaps, specifically concurrent licensing of both ChatGPT Team and Claude Pro across overlapping developer brackets, alongside idle seats on Cursor Business. Furthermore, direct OpenAI API usage logs indicate high-volume token transfers that would immediately benefit from prompt caching headers. By standardizing engineering workflows onto Cursor Pro and deprovisioning idle licenses, estimated monthly savings of approximately $480/month are achievable, yielding an annual cost recovery of $5,760 without impacting developer velocity."
