export interface AuditLead {
  id?: string;
  email: string;
  company?: string;
  role?: string;
  team_size: number;
  primary_use_case: string;
  total_spend: number;
  estimated_savings: number;
  tool_count: number;
  created_at?: string;
}

export interface AuditReport {
  report_id: string;
  audit_input: any; // Can represent the form input data shape
  recommendations: any[];
  monthly_savings: number;
  yearly_savings: number;
  audit_score: number;
  created_at?: string;
}
