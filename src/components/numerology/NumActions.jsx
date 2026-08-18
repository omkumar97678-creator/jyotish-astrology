import React from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';

export default function NumActions() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
      <button className="btn-primary" style={{ padding: '16px 40px' }}>
        <Download size={18} /> Download PDF Report
      </button>
      <Link to="/kundli" className="btn-ghost">Check Kundli</Link>
      <Link to="/gunmilan" className="btn-ghost">Gun Milan Check</Link>
    </div>
  );
}