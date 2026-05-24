
export default function UseCaseSelect({ register, error }) {
  const options = [
    { value: 'coding', label: 'Software Engineering & Coding' },
    { value: 'writing', label: 'Content Writing & Marketing' },
    { value: 'research', label: 'Market Research & Synthesis' },
    { value: 'data', label: 'Data Analysis & SQL Audits' },
    { value: 'mixed', label: 'Mixed / Multi-disciplinary Workloads' }
  ];

  return (
    <div className="control-input-group">
      <label htmlFor="primaryUseCase" className="form-input-label">
        Primary AI Workload Use Case
      </label>
      <div className="select-wrapper">
        <select 
          id="primaryUseCase" 
          {...register('primaryUseCase', { required: true })}
          className={`form-select-field ${error ? 'input-error-border' : ''}`}
        >
          <option value="">-- Choose your team's workload --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="error-message-text">{error.message}</span>}
    </div>
  );
}
