import React from 'react';
import { Link } from 'react-router-dom';
import KundliChart from '@/components/KundliChart';

export default function KundliContext() {
  return (
    <div className="glass-card flex items-center gap-4 mt-8" style={{ padding: 18, borderLeft: '3px solid var(--col-copper)' }}>
      <div style={{ width: 44, height: 44, flexShrink: 0 }}>
        <KundliChart size={44} opacity={0.9} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm" style={{ color: 'var(--col-moonstone)' }}>
          Reading kundli for: <span style={{ color: 'var(--col-copper)', fontWeight: 600 }}>Arjun Sharma</span>
        </div>
        <div className="text-xs mt-0.5" style={{ color: 'var(--col-moonstone-dim)' }}>
          14 Aug 1996 • New Delhi, India
        </div>
      </div>
      <Link to="/onboarding" className="text-xs font-medium" style={{ color: 'var(--col-copper)' }}>
        Change
      </Link>
    </div>
  );
}