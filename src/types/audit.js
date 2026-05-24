/**
 * @typedef {Object} AuditTool
 * @property {string} toolId - Unique identifier of the tool (e.g. 'chatgpt')
 * @property {string} planId - Unique plan tier identifier (e.g. 'plus', 'team')
 * @property {number} monthlySpend - Active monthly billing rate in USD
 * @property {number} seats - Count of allocated seats
 */

/**
 * @typedef {Object} AuditInput
 * @property {number} teamSize - Declared corporate employee head count
 * @property {string} primaryUseCase - Central focus workloads ('coding', 'writing', 'mixed', etc.)
 * @property {AuditTool[]} tools - Allocated generative tool profiles
 */

/**
 * @typedef {Object} Recommendation
 * @property {string} tool - Label name of affected tool platform
 * @property {string} title - Actionable recovery header
 * @property {string} reason - Detailed financial and features justification
 * @property {number} monthlySavings - Estimated recovery value in USD
 * @property {'low' | 'medium' | 'high'} severity - Level of action urgency
 */

/**
 * @typedef {Object} AuditSummary
 * @property {number} wasteScore - Percentage of spend identified as waste [0-100]
 * @property {'Optimal' | 'Moderate' | 'Low'} stackEfficiency - Stack performance rank
 * @property {number} opportunitiesFound - Reciprocal recommendation count
 * @property {number} totalSpend - Gross monthly stack billing rate in USD
 */

/**
 * @typedef {Object} AuditResult
 * @property {number} monthlySavings - Net recovery yield per month in USD
 * @property {number} annualSavings - Net recovery yield per annum in USD
 * @property {Recommendation[]} recommendations - Detailed granular optimization paths
 * @property {AuditSummary} summary - Aggregated high-level statistics
 */

export {};
