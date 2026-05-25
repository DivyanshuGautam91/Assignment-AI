const DRAFT_KEY = 'sift_ai_spend_audit_form';
const INPUT_KEY = 'sift_ai_spend_audit_input';
const RESULT_KEY = 'sift_ai_spend_audit_result';

export const storage = {
  // Form input draft (saved on keypress)
  loadAuditData: () => {
    try {
      const data = localStorage.getItem(DRAFT_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to load Sift AI Spend Audit form draft from localStorage', e);
      return null;
    }
  },

  saveAuditData: (data) => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save Sift AI Spend Audit form draft to localStorage', e);
    }
  },

  clearAuditData: () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {
      console.error('Failed to clear Sift AI Spend Audit form draft from localStorage', e);
    }
  },

  // Final submitted audit input parameters
  loadAuditInput: () => {
    try {
      const data = localStorage.getItem(INPUT_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to load Sift AI Audit Input from localStorage', e);
      return null;
    }
  },

  saveAuditInput: (data) => {
    try {
      localStorage.setItem(INPUT_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save Sift AI Audit Input to localStorage', e);
    }
  },

  clearAuditInput: () => {
    try {
      localStorage.removeItem(INPUT_KEY);
    } catch (e) {
      console.error('Failed to clear Sift AI Audit Input from localStorage', e);
    }
  },

  // Final calculated audit result recovery logs
  loadAuditResult: () => {
    try {
      const data = localStorage.getItem(RESULT_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to load Sift AI Audit Result from localStorage', e);
      return null;
    }
  },

  saveAuditResult: (data) => {
    try {
      localStorage.setItem(RESULT_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save Sift AI Audit Result to localStorage', e);
    }
  },

  clearAuditResult: () => {
    try {
      localStorage.removeItem(RESULT_KEY);
    } catch (e) {
      console.error('Failed to clear Sift AI Audit Result from localStorage', e);
    }
  }
};
