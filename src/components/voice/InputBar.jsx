import React from 'react';
import { Mic, Send } from 'lucide-react';

export default function InputBar({ value, onChange, onSend, voiceMode, onToggleVoice }) {
  if (voiceMode) {
    return (
      <div className="flex justify-center">
        <button
          onClick={onToggleVoice}
          className="btn-ghost text-sm"
          style={{ padding: '12px 24px' }}
        >
          <Mic size={18} /> Switch to text
        </button>
      </div>
    );
  }
  return (
    <div className="glass-card flex items-center gap-2" style={{ padding: 10 }}>
      <button
        onClick={onToggleVoice}
        aria-label="Switch to voice"
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: 44, height: 44, borderRadius: '9999px', background: 'var(--col-glass)', border: '1px solid var(--col-glass-border)', color: 'var(--col-copper)' }}
      >
        <Mic size={20} />
      </button>
      <input
        className="input-base flex-1"
        style={{ padding: '12px 16px' }}
        placeholder="Or type your question..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
      />
      <button
        onClick={onSend}
        aria-label="Send"
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 44, height: 44, borderRadius: '9999px', border: 'none',
          background: 'linear-gradient(135deg, var(--col-copper), var(--col-copper-light))',
          color: 'var(--col-midnight)',
        }}
      >
        <Send size={18} />
      </button>
    </div>
  );
}