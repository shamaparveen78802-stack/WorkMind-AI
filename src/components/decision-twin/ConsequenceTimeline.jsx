// src/components/decision-twin/ConsequenceTimeline.jsx
import React from 'react';
import {
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  Compass,
  Layers,
  ArrowRight
} from 'lucide-react';
import Badge from '../common/Badge';

export function ConsequenceTimeline({
  shortTerm = [],
  longTerm = [],
  benefits = [],
  risks = [],
  syntheticPersonaImpacts = []
}) {
  return (
    <div className="space-y-6">
      {/* 2-Column Multi-Horizon Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Short-Term Horizon (0 - 90 Days) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                30d
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Short-Term Horizon (0–90 Days)
                </h4>
                <p className="text-[11px] text-slate-500">Immediate operational & sentiment reactions</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
              Phase 1: Transition
            </span>
          </div>

          <div className="space-y-3">
            {shortTerm.map((st, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-blue-500" />
                    {st.timeframe}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 px-1.5 py-0.5 rounded bg-white border border-slate-200">
                    {st.impactType}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {st.effect}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Long-Term Horizon (6 - 18 Months) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                18m
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Long-Term Horizon (6–18 Months)
                </h4>
                <p className="text-[11px] text-slate-500">Second-order cultural & talent brand evolution</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
              Phase 2: Equilibrium
            </span>
          </div>

          <div className="space-y-3">
            {longTerm.map((lt, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                    <Compass className="w-3 h-3 text-indigo-500" />
                    {lt.timeframe}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 px-1.5 py-0.5 rounded bg-white border border-slate-200">
                    {lt.impactType}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {lt.effect}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits vs Risks Split Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upside Potential */}
        <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200/80 p-5 shadow-soft-sm">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Projected Strategic Upsides & Gains
            </h4>
          </div>
          <ul className="space-y-2">
            {benefits.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-emerald-900">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <span className="leading-snug">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Downside & Unintended Risks */}
        <div className="bg-rose-50/50 rounded-2xl border border-rose-200/80 p-5 shadow-soft-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
              Unintended Risks & Second-Order Hazards
            </h4>
          </div>
          <ul className="space-y-2">
            {risks.map((r, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-rose-900">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                <span className="leading-snug">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Synthetic Cohort Reaction Personas */}
      {syntheticPersonaImpacts && syntheticPersonaImpacts.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Synthetic Persona Cohort Analysis (No Real PII)
              </h4>
            </div>
            <span className="text-[10px] text-slate-400">
              Models differential reactions across seniority & role
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {syntheticPersonaImpacts.map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-2">
                <div className="font-bold text-slate-800 text-[11px] pb-1 border-b border-slate-200/60">
                  {p.persona}
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sentiment:</span>
                    <span className="font-semibold text-slate-700">{p.sentimentShift}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Retention:</span>
                    <span className="font-semibold text-emerald-700">{p.flightRiskProjection}</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <span className="font-bold text-slate-600">Key Concern: </span>
                  {p.keyConcern}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsequenceTimeline;
