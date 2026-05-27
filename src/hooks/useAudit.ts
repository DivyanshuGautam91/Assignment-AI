import { useState, useCallback } from 'react';
import { reportService } from '../services/reportService';
import { leadService } from '../services/leadService';
import { AuditReport, AuditLead } from '../types/database';

export function useAudit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveAuditReport = useCallback(async (
    reportId: string, 
    input: any, 
    result: any
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const reportObj: AuditReport = {
        report_id: reportId,
        audit_input: input,
        recommendations: result.recommendations || [],
        monthly_savings: result.monthlySavings || 0,
        yearly_savings: result.annualSavings || 0,
        audit_score: result.summary?.wasteScore ?? 0
      };

      const res = await reportService.saveReport(reportObj);
      if (res.success) {
        setSuccess(true);
        return true;
      } else {
        // We still return true if saved locally, but we set a custom warning
        setError('Saved report locally. (Database connection offline)');
        return true;
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to persist audit report.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAuditReport = useCallback(async (reportId: string): Promise<AuditReport | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await reportService.getReport(reportId);
      if (res.success && res.data) {
        return res.data;
      } else {
        setError(res.error || 'Audit report not found.');
        return null;
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve audit report.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitLead = useCallback(async (
    email: string, 
    company?: string,
    role?: string,
    input?: any, 
    result?: any
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Build lead object using provided metrics, or defaults if none exist
      const leadObj: AuditLead = {
        email,
        company: company || '',
        role: role || '',
        team_size: input?.teamSize || 0,
        primary_use_case: input?.primaryUseCase || 'newsletter',
        total_spend: result?.summary?.totalSpend || 0,
        estimated_savings: result?.annualSavings || 0,
        tool_count: input?.tools?.length || 0
      };

      const res = await leadService.saveLead(leadObj);
      if (res.success) {
        setSuccess(true);
        return true;
      } else {
        setError(res.error || 'Failed to save lead info.');
        return false;
      }
    } catch (err: any) {
      setError(err?.message || 'Error occurred while saving lead info.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    success,
    saveAuditReport,
    fetchAuditReport,
    submitLead,
    setError,
    setSuccess
  };
}
