import React, { useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { AI_TOOLS } from '../../constants/aiTools';
import { AI_PLANS } from '../../constants/plans';

export default function ToolCard({ index, register, watch, setValue, remove, errors }) {
  // Watch this specific card's toolId selection
  const selectedToolId = watch(`tools.${index}.toolId`);
  
  // Get plans list dynamically based on selected tool
  const availablePlans = selectedToolId ? AI_PLANS[selectedToolId] : [];

  // Automatically assign default plan when tool changes
  useEffect(() => {
    if (selectedToolId) {
      const toolDef = AI_TOOLS.find(t => t.id === selectedToolId);
      if (toolDef) {
        setValue(`tools.${index}.planId`, toolDef.defaultPlan);
      }
    }
  }, [selectedToolId, index, setValue]);

  // Extract errors for this specific tool card fields
  const cardErrors = errors?.tools?.[index] || {};

  return (
    <div className="tool-audit-card animated-card">
      <div className="tool-card-header">
        <span className="tool-card-number font-mono">AI Tool Slot {index + 1}</span>
        <button 
          type="button" 
          onClick={() => remove(index)}
          className="btn-remove-tool"
          title="Remove this tool"
        >
          <Trash2 size={14} />
          <span>Remove</span>
        </button>
      </div>

      <div className="tool-card-grid">
        {/* Tool Dropdown Selection */}
        <div className="control-input-group">
          <label className="form-input-label">Select AI Platform</label>
          <div className="select-wrapper">
            <select 
              {...register(`tools.${index}.toolId`, { required: true })}
              className={`form-select-field ${cardErrors.toolId ? 'input-error-border' : ''}`}
            >
              <option value="">-- Select AI Tool --</option>
              {AI_TOOLS.map((tool) => (
                <option key={tool.id} value={tool.id}>
                  {tool.name}
                </option>
              ))}
            </select>
          </div>
          {cardErrors.toolId && (
            <span className="error-message-text">{cardErrors.toolId.message}</span>
          )}
        </div>

        {/* Plan Dropdown Selection (Dynamic) */}
        <div className="control-input-group">
          <label className="form-input-label">Current Subscription Plan</label>
          <div className="select-wrapper">
            <select 
              {...register(`tools.${index}.planId`, { required: true })}
              disabled={!selectedToolId}
              className={`form-select-field ${cardErrors.planId ? 'input-error-border' : ''}`}
            >
              <option value="">-- Choose Plan --</option>
              {availablePlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
          {cardErrors.planId && (
            <span className="error-message-text">{cardErrors.planId.message}</span>
          )}
        </div>

        {/* Monthly Cost Input */}
        <div className="control-input-group">
          <label className="form-input-label">Monthly AI Spend ($)</label>
          <input 
            type="number"
            placeholder="e.g. 120"
            {...register(`tools.${index}.monthlySpend`, { valueAsNumber: true })}
            className={`form-input-field ${cardErrors.monthlySpend ? 'input-error-border' : ''}`}
          />
          {cardErrors.monthlySpend && (
            <span className="error-message-text">{cardErrors.monthlySpend.message}</span>
          )}
        </div>

        {/* Allocated Seats Input */}
        <div className="control-input-group">
          <label className="form-input-label">Active Users / Seats</label>
          <input 
            type="number"
            placeholder="e.g. 5"
            {...register(`tools.${index}.seats`, { valueAsNumber: true })}
            className={`form-input-field ${cardErrors.seats ? 'input-error-border' : ''}`}
          />
          {cardErrors.seats && (
            <span className="error-message-text">{cardErrors.seats.message}</span>
          )}
        </div>
      </div>
    </div>
  );
}
