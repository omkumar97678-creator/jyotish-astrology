import React from 'react';
import { Link } from 'react-router-dom';
import KundliChart from '@/components/KundliChart';

export default function KundliContext({ kundliData }) {
  let data = kundliData;
  if (!data || Object.keys(data).length === 0) {
    try {
      const stored = localStorage.getItem('kundli_data') || localStorage.getItem('jyotish_onboarding');
      if (stored) data = JSON.parse(stored);
    } catch {
      data = {};
    }
  }

  const userName = data?.name || 'User';
  const userDOB = data?.date_of_birth || (data?.dob ? `${data.dob.day}/${data.dob.month}/${data.dob.year}` : '');
  const userPlace = data?.birth_place || data?.birthPlace || '';

  return (
    <div className="glass-card flex items-center gap-4 mt-8" style={{ padding: 18, borderLeft: '3px solid var(--col-copper)' }}>
      <div style={{ width: 44, height: 44, flexShrink: 0 }}>
        <KundliChart size={44} opacity={0.9} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm" style={{ color: 'var(--col-moonstone)' }}>
          Reading kundli for: <span style={{ color: 'var(--col-copper)', fontWeight: 600 }}>{userName}</span>
        </div>
        {(userDOB || userPlace) && (
          <div className="text-xs mt-0.5" style={{ color: 'var(--col-moonstone-dim)' }}>
            {userDOB} {userDOB && userPlace ? '•' : ''} {userPlace}
          </div>
        )}
      </div>
      <Link to="/onboarding" className="text-xs font-medium cursor-pointer" style={{ color: 'var(--col-copper)' }}>
        Change
      </Link>
    </div>
  );
}