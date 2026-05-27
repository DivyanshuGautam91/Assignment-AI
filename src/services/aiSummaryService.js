/**
 * Sift AI cost audit summary generator
 * Utilizes OpenAI GPT or Anthropic Claude, with deterministic fallbacks.
 */
export const aiSummaryService = {
  generateSummary: async (input, result) => {
    const openaiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY || '';
    
    const prompt = `You are a professional cost intelligence assistant for Sift AI Spend Audit.
Write a personalized cost intelligence summary based on the following spend audit parameters.

SPEND AUDIT SUMMARY DATA:
- Total AI monthly spend: $${result.summary?.totalSpend || 0}/mo
- Active tools: ${input.tools?.map(t => t.toolId).join(', ') || 'None'}
- Number of optimization opportunities: ${result.recommendations?.length || 0}
- Estimated monthly savings: $${result.monthlySavings}/mo
- Estimated yearly savings: $${result.annualSavings}/yr
- Specific findings/recommendations:
${result.recommendations?.map(r => `- [${r.severity.toUpperCase()}] ${r.tool}: ${r.title}. ${r.reason} (Saves $${r.monthlySavings}/mo)`).join('\n')}

CONSTRAINTS:
- Write exactly ONE paragraph between 80 and 120 words.
- Tone must be professional, authoritative, and helpful, like a startup founder explaining an audit to investors.
- Highlight specific tools (like Cursor, ChatGPT, Claude, OpenAI API) where duplication or over-allocation was detected.
- Maintain strict numerical consistency: monthly savings ($${result.monthlySavings}) and yearly savings ($${result.annualSavings}) MUST match exactly.
- Keep it clean, professional, and concise. Do NOT output markdown or headers - write exactly one paragraph of plain text.`;

    if (openaiKey && openaiKey !== 'placeholder' && openaiKey.length > 10) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 250
          })
        });
        const data = await response.json();
        if (data.choices?.[0]?.message?.content) {
          return data.choices[0].message.content.trim();
        }
      } catch (e) {
        console.error('Failed to query OpenAI API for spend audit summary', e);
      }
    } else if (anthropicKey && anthropicKey !== 'placeholder' && anthropicKey.length > 10) {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01',
            'dangerously-allow-browser': 'true'
          },
          body: JSON.stringify({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 250,
            messages: [{ role: 'user', content: prompt }]
          })
        });
        const data = await response.json();
        if (data.content?.[0]?.text) {
          return data.content[0].text.trim();
        }
      } catch (e) {
        console.error('Failed to query Anthropic API for spend audit summary', e);
      }
    }

    // Deterministic Fallback if API keys are unconfigured or fail
    return aiSummaryService.generateDeterministicFallback(input, result);
  },

  generateDeterministicFallback: (input, result) => {
    const { recommendations = [], monthlySavings = 0, annualSavings = 0 } = result;
    if (recommendations.length === 0) {
      return "Your organization’s generative AI stack is operating at peak financial efficiency. Sift Cost Audit found zero structural redundant seats, overlapping LLM interfaces, or API context leaks. We recommend maintaining current billing controls and running audits monthly to detect user sprawl.";
    }

    const hasConversational = recommendations.some(r => r.tool.includes('ChatGPT') || r.tool.includes('Claude') || r.tool.includes('Gemini'));
    const hasIDE = recommendations.some(r => r.tool.includes('Cursor') || r.tool.includes('Windsurf') || r.tool.includes('Copilot'));
    const hasApi = recommendations.some(r => r.tool.includes('API') || r.tool.includes('Caching'));

    let findings = [];
    if (hasConversational) findings.push("conversational seat overlaps (ChatGPT, Claude Pro, or Gemini)");
    if (hasIDE) findings.push("overlapping coding subscriptions (GitHub Copilot and Cursor IDE)");
    if (hasApi) findings.push("direct API tokens leaking context without prompt caching");

    const severityText = result.summary?.wasteScore > 35 
      ? "exhibits severe cost leaks" 
      : result.summary?.wasteScore > 15 
      ? "is moderately oversubscribed" 
      : "shows minor efficiency leaks";

    return `Based on our deep stack scan, your AI footprint ${severityText} across ${findings.join(" and ")}. Sift detected active license sprawl totaling $${monthlySavings}/month in potential recoveries. Standardizing your team's developer tools onto Cursor and right-sizing conversational seats to active headcounts will recover approximately $${annualSavings}/year without impacting engineering velocity.`;
  }
};
