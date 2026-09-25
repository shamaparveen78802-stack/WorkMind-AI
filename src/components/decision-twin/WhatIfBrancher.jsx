// src/components/decision-twin/WhatIfBrancher.jsx
import React, { useState } from 'react';
import { GitBranch, Sparkles, AlertTriangle, ArrowRight, RefreshCw, Zap, ShieldAlert } from 'lucide-react';
import Badge from '../common/Badge';

export const WHAT_IF_PRESETS = [
  "What if top tech competitors counter-offer with 15% salary premiums and fully remote contracts?",
  "What if 3 key Engineering Directors refuse to enforce the anchor days on their pods?",
  "What if corporate executive leadership mandates a 25% travel and wellness budget cut next quarter?",
  "What if customer support escalations spike by 40% during the policy transition period?"
];

export function WhatIfBrancher({ onRunWhatIf, isRunning, whatIfResult }) {
  const [whatIfInput, setWhatIfInput] = useState('');

  const handleTrigger = (promptText) => {
    const text = promptText || whatIfInput;
    if (!text.trim() || isRunning) return;
    onRunWhatIf(text.trim());
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Interactive "What If?" Scenario Stress-Testing
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              Stage 4 of 5
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Inject external shocks, resistance patterns, or budget constraints to stress-test your chosen strategy
          </p>
        </div>
      </div>

      {/* Preset Chips */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Suggested Counter-Factual Stress Tests:
        </span>
        <div className="flex flex-wrap gap-2">
          {WHAT_IF_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setWhatIfInput(preset);
                handleTrigger(preset);
              }}
              disabled={isRunning}
              className="text-xs text-left px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 hover:border-brand-300 text-slate-600 transition-all font-medium"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Input Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={whatIfInput}
          onChange={(e) => setWhatIfInput(e.target.value)}
          placeholder="Ask a custom 'What if...?' question to stress-test this trajectory"
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-xs text-slate-800 placeholder-slate-400"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleTrigger();
          }}
        />
        <button
          onClick={() => handleTrigger()}
          disabled={isRunning || !whatIfInput.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm disabled:opacity-50 transition-all shrink-0"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stress-Test</span>
            </>
          )}
        </button>
      </div>

      {/* Result Display */}
      {whatIfResult && (
        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-indigo-50/20 to-white border border-indigo-100/90 space-y-4 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-indigo-100/70">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">Shock Analyzed:</span>
              <span className="text-xs text-indigo-700 font-semibold italic">"{whatIfResult.conditionAnalyzed}"</span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              Trajectory Shift: {whatIfResult.trajectoryShift}
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {whatIfResult.executiveDivergenceSummary}
          </p>

          {/* Metric Recalibration Deltas */}
          {whatIfResult.alteredMetrics && whatIfResult.alteredMetrics.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Projected Divergence in Key Metrics:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whatIfResult.alteredMetrics.map((am, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{am.metricName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                        {am.impactDirection}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>Baseline: {am.previousProjected} / 100</span>
                      <span>→</span>
                      <span className="font-bold text-slate-800">Recalibrated: {am.recalibratedProjected} / 100</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      {am.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Broken Assumptions & Contingencies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200 text-xs space-y-1.5">
              <span className="font-bold text-rose-900 text-[11px] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                Assumptions Invalidated by this Shock:
              </span>
              <ul className="space-y-1 text-[11px] text-rose-950">
                {(whatIfResult.brokenAssumptions || []).map((ba, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    <span>{ba}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1.5">
              <span className="font-bold text-emerald-900 text-[11px] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                Recommended Contingency Safeguards:
              </span>
              <ul className="space-y-1 text-[11px] text-emerald-950">
                {(whatIfResult.recommendedContingencyActions || []).map((ca, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span>{ca}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WhatIfBrancher;
