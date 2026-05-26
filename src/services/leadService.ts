import { supabase, isSupabaseConfigured } from './supabase';
import { AuditLead } from '../types/database';

export const leadService = {
  validateEmail: (email: string): boolean => {
    if (!email || typeof email !== 'string') return false;
    const trimmed = email.trim();
    if (!trimmed) return false;
    // Simple robust email validation pattern
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(trimmed);
  },

  saveLead: async (lead: AuditLead): Promise<{ success: boolean; data?: any; error?: any }> => {
    // Basic validation check
    if (!lead.email || !leadService.validateEmail(lead.email)) {
      return { success: false, error: 'Please enter a valid enterprise email address.' };
    }

    if (!isSupabaseConfigured || !supabase) {
      // Backup to localStorage array
      try {
        const localLeads = JSON.parse(localStorage.getItem('sift_leads') || '[]');
        localLeads.push({ ...lead, id: `local_${Date.now()}`, created_at: new Date().toISOString() });
        localStorage.setItem('sift_leads', JSON.stringify(localLeads));
      } catch (e) {
        console.error('Failed to backup lead locally:', e);
      }
      return { success: true, data: lead };
    }

    try {
      const { data, error } = await supabase
        .from('audit_leads')
        .insert([{
          email: lead.email.trim(),
          team_size: lead.team_size || 0,
          primary_use_case: lead.primary_use_case || '',
          total_spend: lead.total_spend || 0,
          estimated_savings: lead.estimated_savings || 0,
          tool_count: lead.tool_count || 0
        }])
        .select();

      if (error) {
        throw error;
      }
      return { success: true, data };
    } catch (err: any) {
      console.error('Error saving lead to database:', err);
      // Fallback: backup to localStorage array
      try {
        const localLeads = JSON.parse(localStorage.getItem('sift_leads') || '[]');
        localLeads.push({ ...lead, id: `local_${Date.now()}`, created_at: new Date().toISOString() });
        localStorage.setItem('sift_leads', JSON.stringify(localLeads));
      } catch (e) {
        console.error('Failed to backup lead locally:', e);
      }
      return { success: false, error: err };
    }
  }
};
