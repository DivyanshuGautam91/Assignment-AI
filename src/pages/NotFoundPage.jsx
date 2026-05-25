import { navigate } from '../lib/router';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="not-found-page-wrapper">
      {/* Background glowing mesh */}
      <div className="glow-mesh-overlay"></div>
      
      <div className="empty-state-card animated-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="empty-icon-box" style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
          <ShieldAlert size={32} style={{ color: '#f43f5e' }} />
        </div>
        <h2 className="empty-title font-mono" style={{ letterSpacing: '-0.02em' }}>404 - Route Unresolved</h2>
        <p className="empty-description">
          The requested optimization pathway or console page could not be resolved. It may have been relocated or de-provisioned.
        </p>
        <div className="empty-actions" style={{ justifyContent: 'center', marginTop: '24px' }}>
          <button 
            onClick={() => navigate('/')} 
            className="btn-primary"
            style={{ gap: '8px' }}
          >
            <ArrowLeft size={14} />
            <span>Return to Console</span>
          </button>
        </div>
      </div>
    </div>
  );
}
