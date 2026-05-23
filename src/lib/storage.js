const STORAGE_KEY = 'sift_ai_spend_audit_form';

export const storage = {
  loadAuditData: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to load Sift AI Spend Audit data from localStorage', e);
      return null;
    }
  },

  saveAuditData: (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save Sift AI Spend Audit data to localStorage', e);
    }
  },

  clearAuditData: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear Sift AI Spend Audit data from localStorage', e);
    }
  }
};
