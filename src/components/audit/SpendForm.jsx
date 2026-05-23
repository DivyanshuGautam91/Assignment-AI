import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Check, Play, RefreshCw } from 'lucide-react';
import { storage } from '../../lib/storage';
import ToolCard from './ToolCard';
import UseCaseSelect from './UseCaseSelect';

// Form Validation Schema using Zod
const spendSchema = z.object({
  tools: z.array(
    z.object({
      toolId: z.string().min(1, { message: 'Please select an AI platform.' }),
      planId: z.string().min(1, { message: 'Please select a plan.' }),
      monthlySpend: z.number({ 
        invalid_type_error: 'Monthly spend must be a number.' 
      }).positive({ message: 'Spend must be greater than $0.' }),
      seats: z.number({ 
        invalid_type_error: 'Active seats must be a number.' 
      }).int().min(1, { message: 'Seats must be at least 1.' })
    })
  ).min(1, { message: 'At least one AI tool card is required.' }),
  teamSize: z.number({ 
    invalid_type_error: 'Team size must be a number.' 
  }).int().min(1, { message: 'Team size must be at least 1.' }),
  primaryUseCase: z.string().min(1, { message: 'Primary use case is required.' })
});

export default function SpendForm({ onSubmitSuccess, onCancel }) {
  // Load cached form state if it exists
  const cachedData = storage.loadAuditData();

  const defaultValues = cachedData || {
    tools: [
      { toolId: '', planId: '', monthlySpend: 0, seats: 1 }
    ],
    teamSize: 10,
    primaryUseCase: ''
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(spendSchema),
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tools'
  });

  // Watch form states in real-time to save changes in localStorage on keystroke
  const watchedForm = watch();
  useEffect(() => {
    storage.saveAuditData(watchedForm);
  }, [watchedForm]);

  const onSubmit = (data) => {
    console.log('AI Spend Audit Submitted Data:', data);
    // Move to results route passing the validated form parameters
    onSubmitSuccess(data);
  };

  const handleReset = () => {
    storage.clearAuditData();
    reset({
      tools: [{ toolId: '', planId: '', monthlySpend: 0, seats: 1 }],
      teamSize: 10,
      primaryUseCase: ''
    });
  };

  return (
    <div className="audit-form-container">
      <div className="form-header-bar">
        <div>
          <h2 className="section-title text-left" style={{ fontSize: '28px', marginBottom: '8px' }}>
            Audit Your AI footprint
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            List all generative models, allocated seats, and active developer packages to compile an automated cost consolidation audit.
          </p>
        </div>
        <button 
          type="button" 
          onClick={handleReset} 
          className="btn-secondary" 
          style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', gap: '6px', alignItems: 'center' }}
        >
          <RefreshCw size={13} />
          <span>Reset Form</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="master-spend-form" noValidate>
        {/* Dynamic Tool Cards List */}
        <div className="form-cards-section">
          {fields.map((field, index) => (
            <ToolCard
              key={field.id}
              index={index}
              register={register}
              watch={watch}
              setValue={setValue}
              remove={remove}
              errors={errors}
            />
          ))}

          {/* Validation indicators if array length fails */}
          {errors.tools && !Array.isArray(errors.tools) && (
            <div className="global-error-badge">
              <span className="error-message-text">{errors.tools.message}</span>
            </div>
          )}

          {/* Append Tool Card Trigger */}
          <button
            type="button"
            onClick={() => append({ toolId: '', planId: '', monthlySpend: 0, seats: 1 })}
            className="btn-add-tool animated-card"
          >
            <Plus size={16} />
            <span>Add AI Tool Card</span>
          </button>
        </div>

        {/* Form Separator */}
        <hr className="form-section-divider" />

        {/* Secondary Details Inputs (Team Size & Use Case) */}
        <div className="form-meta-details-row">
          {/* Team Size */}
          <div className="control-input-group">
            <label htmlFor="teamSize" className="form-input-label">
              Total Enterprise Team Size
            </label>
            <input
              type="number"
              id="teamSize"
              placeholder="e.g. 150"
              {...register('teamSize', { valueAsNumber: true })}
              className={`form-input-field ${errors.teamSize ? 'input-error-border' : ''}`}
            />
            {errors.teamSize && (
              <span className="error-message-text">{errors.teamSize.message}</span>
            )}
          </div>

          {/* Primary Use Case Dropdown */}
          <UseCaseSelect 
            register={register} 
            error={errors.primaryUseCase} 
          />
        </div>

        {/* Form CTA Actions */}
        <div className="form-submit-row">
          <button 
            type="button" 
            onClick={onCancel}
            className="btn-secondary"
            style={{ padding: '14px 28px', fontSize: '15px' }}
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            className="btn-primary"
            style={{ padding: '14px 32px', fontSize: '15px' }}
          >
            <span>Generate Spend Audit</span>
            <Play size={14} fill="currentColor" />
          </button>
        </div>
      </form>
    </div>
  );
}
