// src/components/decision-twin/ScenarioComparisonTable.jsx
import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, Trophy, Sparkles, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';

export function ScenarioComparisonTable({ comparisonData, onSelectForDeepDive }) {
  if (!comparisonData || !comparisonData.scorecard) return null;

  const { comparativeSummary, scorecard = [], strategicSynthesis = {} } = comparisonData;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Multi-Scenario Trade-Off Comparison Matrix
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              Stage 5 of 5
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Side-by-side evaluation of strategic avenues to balance competing organizational priorities
          </p>
        </div>
      </div>

      {comparativeSummary && (
        <p className="text-xs text-slate-700 leading-relaxed p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 font-medium">
          {comparativeSummary}
        </p>
      )}

      {/* Comparative Scorecard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scorecard.map((item, idx) => (
          <div
            key={item.optionId || idx}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-300 hover:shadow-soft-sm transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Option {idx + 1}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                  Feasibility: {item.illustrativeScores?.feasibilityScore || 80}%
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-slate-900 mb-2 leading-snug">
                {item.optionTitle}
              </h4>

              {/* Metric Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Retention Impact:</span>
                  <span className="font-bold text-slate-800">{item.illustrativeScores?.retentionScore || 75} / 100</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Team Sentiment:</span>
                  <span className="font-bold text-slate-800">{item.illustrativeScores?.sentimentScore || 70} / 100</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Deployment Speed:</span>
                  <span className="font-bold text-slate-800">{item.illustrativeScores?.speedScore || 80} / 100</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Budget Efficiency:</span>
                  <span className="font-bold text-slate-800">{item.illustrativeScores?.costScore || 60} / 100</span>
                </div>
              </div>

              {/* Upside vs Blindspot */}
              <div className="mt-3 pt-2 border-t border-slate-100 space-y-2 text-[11px]">
                <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-950">
                  <span className="font-bold text-emerald-800 block text-[10px] uppercase">Primary Advantage:</span>
                  {item.primaryAdvantage}
                </div>
                <div className="p-2 rounded-lg bg-rose-50/70 border border-rose-100 text-rose-950">
                  <span className="font-bold text-rose-800 block text-[10px] uppercase">Primary Vulnerability:</span>
                  {item.primaryVulnerability}
                </div>
              </div>

              {/* Recommended Context */}
              <div className="mt-2 text-[11px] text-slate-500 italic">
                <span className="font-bold text-slate-600 not-italic">Best when: </span>
                {item.recommendedContext}
              </div>
            </div>

            {onSelectForDeepDive && (
              <button
                onClick={() => onSelectForDeepDive(item)}
                className="mt-3 w-full py-2 px-3 rounded-lg border border-brand-200 text-brand-700 hover:bg-brand-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Deep Dive into this Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Strategic Synthesis Callouts */}
      {strategicSynthesis && (
        <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 block">
            Executive Synthesis & Strategic Guidance:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
            <div className="p-2.5 rounded-lg bg-white border border-indigo-100">
              <span className="font-bold text-brand-700 block">🏆 Highest Retention Recovery:</span>
              <span className="text-slate-600">{strategicSynthesis.highestRetentionPath}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-indigo-100">
              <span className="font-bold text-emerald-700 block">💰 Lowest Cost Exposure:</span>
              <span className="text-slate-600">{strategicSynthesis.lowestCostPath}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-indigo-100">
              <span className="font-bold text-blue-700 block">⚡ Lowest Friction Transition:</span>
              <span className="text-slate-600">{strategicSynthesis.lowestFrictionPath}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScenarioComparisonTable;
