// src/components/decision-twin/InterventionOptionsCard.jsx
import React from 'react';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Coins,
  Activity,
  Zap,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import Badge from '../common/Badge';

export function InterventionOptionsCard({
  diagnosis,
  selectedOption,
  onSelectOption,
  onSimulate,
  isSimulating
}) {
  if (!diagnosis || !diagnosis.summary) return null;

  const { summary, contributingFactors = [], strategicOptions = [] } = diagnosis;

  return (
    <div className="space-y-6">
      {/* Problem Diagnostic Synthesis Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
              AI Diagnostic Synthesis
            </span>
            <Badge variant={summary.urgency === 'Critical' || summary.urgency === 'High' ? 'danger' : 'warning'}>
              Urgency: {summary.urgency}
            </Badge>
            <Badge variant="default">{summary.primaryDomain}</Badge>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Scope: {summary.affectedHeadcountEstimate}
          </span>
        </div>

        <div className="mt-3">
          <h2 className="text-lg font-extrabold text-slate-900">{summary.problemTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            {summary.executiveBrief}
          </p>
        </div>

        {/* Contributing Factors Pills */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Identified Root Drivers & Contributing Dynamics:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {contributingFactors.map((factor, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-slate-800 text-[11px] truncate">{factor.factor}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold shrink-0">
                    {factor.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                  {factor.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Interventions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>Formulated Strategic Interventions</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              Stage 2 of 5
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Select one strategic intervention to launch the multi-horizon consequence simulation
          </p>
        </div>
      </div>

      {/* 3 Strategic Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {strategicOptions.map((opt) => {
          const isSelected = selectedOption?.id === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption(opt)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between relative ${
                isSelected
                  ? 'border-brand-500 bg-gradient-to-b from-brand-50/40 via-white to-white ring-2 ring-brand-500/20 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-soft-sm'
              }`}
            >
              <div>
                {/* Option Header */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-md">
                    {opt.strategyType}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    Feasibility: {opt.feasibilityRating}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 mb-1.5 leading-snug">
                  {opt.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {opt.summary}
                </p>

                {/* Primary Mechanism */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-3 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-700 block mb-0.5">Mechanism:</span>
                  {opt.primaryMechanism}
                </div>

                {/* Metrics Meta */}
                <div className="grid grid-cols-2 gap-2 text-[10px] mb-3">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-slate-500">Effort:</span>
                    <span className="font-bold text-slate-800">{opt.illustrativeEffort}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-slate-500">Cost:</span>
                    <span className="font-bold text-slate-800">{opt.illustrativeCost}</span>
                  </div>
                </div>

                {/* Core Trade-off Alert */}
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-800">Trade-off: </span>
                    <span>{opt.coreTradeoff}</span>
                  </div>
                </div>
              </div>

              {/* Action Selection Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  {isSelected ? '✓ Selected for Twin' : 'Click to select'}
                </span>
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-brand-600 text-white' : 'border border-slate-300 text-transparent'
                  }`}
                >
                  ✓
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulation Execution CTA */}
      {selectedOption && (
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div>
            <span className="text-xs font-bold text-indigo-900 block">
              Ready to Model: <span className="underline">{selectedOption.title}</span>
            </span>
            <span className="text-[11px] text-indigo-700">
              The Decision Twin will simulate short-term vs. long-term trajectories, unintended risks, and employee persona reactions.
            </span>
          </div>

          <button
            onClick={onSimulate}
            disabled={isSimulating}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 hover:shadow-lg transition-all disabled:opacity-50 shrink-0"
          >
            {isSimulating ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Simulating Consequences...</span>
              </>
            ) : (
              <>
                <span>Launch Twin Simulation</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default InterventionOptionsCard;
