import { supabase, isSupabaseConfigured } from './supabase';
import { AuditReport } from '../types/database';

export const reportService = {
  saveReport: async (report: AuditReport): Promise<{ success: boolean; data?: any; error?: any }> => {
    if (!isSupabaseConfigured || !supabase) {
      // Backup to localStorage
      try {
        localStorage.setItem(`sift_report_${report.report_id}`, JSON.stringify(report));
      } catch (e) {
        console.error('Failed to backup report locally:', e);
      }
      return { success: true, data: report };
    }

    try {
      const { data, error } = await supabase
        .from('audit_reports')
        .insert([{
          report_id: report.report_id,
          audit_input: report.audit_input,
          recommendations: report.recommendations,
          monthly_savings: report.monthly_savings,
          yearly_savings: report.yearly_savings,
          audit_score: report.audit_score
        }])
        .select();

      if (error) {
        throw error;
      }
      return { success: true, data };
    } catch (err: any) {
      console.error('Error saving audit report to database:', err);
      // Fallback to localStorage
      try {
        localStorage.setItem(`sift_report_${report.report_id}`, JSON.stringify(report));
      } catch (e) {
        console.error('Failed to backup report locally:', e);
      }
      return { success: false, error: err };
    }
  },

  getReport: async (reportId: string): Promise<{ success: boolean; data?: AuditReport; error?: any }> => {
    if (!isSupabaseConfigured || !supabase) {
      // Fallback: check if we have a local cached version
      const cached = localStorage.getItem(`sift_report_${reportId}`);
      if (cached) {
        return { success: true, data: JSON.parse(cached) };
      }
      return { success: false, error: 'Database unconfigured' };
    }

    try {
      const { data, error } = await supabase
        .from('audit_reports')
        .select('*')
        .eq('report_id', reportId)
        .single();

      if (error) {
        throw error;
      }
      
      const report: AuditReport = {
        report_id: data.report_id,
        audit_input: data.audit_input,
        recommendations: data.recommendations,
        monthly_savings: Number(data.monthly_savings),
        yearly_savings: Number(data.yearly_savings),
        audit_score: Number(data.audit_score),
        created_at: data.created_at
      };
      
      return { success: true, data: report };
    } catch (err: any) {
      console.error(`Error loading report ID ${reportId}:`, err);
      
      // Fallback to local storage
      const cached = localStorage.getItem(`sift_report_${reportId}`);
      if (cached) {
        return { success: true, data: JSON.parse(cached) };
      }
      return { success: false, error: err };
    }
  }
};
