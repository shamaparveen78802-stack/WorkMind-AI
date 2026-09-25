// src/components/decision-twin/AssumptionsUncertaintyDrawer.jsx
import React from 'react';
import { HelpCircle, AlertOctagon, ShieldCheck, Flame, Scale } from 'lucide-react';
import Badge from '../common/Badge';

export function AssumptionsUncertaintyDrawer({ assumptionsAndUncertainties = [] }) {
  if (!assumptionsAndUncertainties || assumptionsAndUncertainties.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-brand-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Critical Assumptions & Uncertainty Surface
          </h4>
        </div>
        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
          Mandatory Simulation Guardrail
        </span>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Decision Twin models are probabilistic exploratory tools. Every simulation trajectory depends on explicit organizational premises. If these underlying conditions shift, the simulated outcome will diverge accordingly:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {assumptionsAndUncertainties.map((item, idx) => {
          const isUncertainty = item.type.toLowerCase().includes('uncertainty') || item.type.toLowerCase().includes('black swan');

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border text-xs space-y-2 flex flex-col justify-between ${
                isUncertainty
                  ? 'bg-rose-50/40 border-rose-200/80 text-rose-950'
                  : 'bg-indigo-50/40 border-indigo-200/80 text-indigo-950'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 border border-slate-200/60">
                    {item.type}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      item.sensitivity === 'Critical' || item.sensitivity === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    Sensitivity: {item.sensitivity}
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  {item.statement}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/40 text-[10px] text-slate-500">
                {isUncertainty ? '⚠️ External factor outside direct management control' : '📌 Internal execution dependency'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AssumptionsUncertaintyDrawer;
