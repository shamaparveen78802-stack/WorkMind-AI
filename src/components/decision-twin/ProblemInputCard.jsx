// src/components/decision-twin/ProblemInputCard.jsx
import React from 'react';
import { Sparkles, Brain, ArrowRight, Layers, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import Badge from '../common/Badge';

export const ENTERPRISE_PRESETS = [
  {
    id: 'preset-rto',
    title: 'RTO Mandate Attrition Risk',
    dept: 'Engineering & Product',
    desc: 'Our enterprise announced a strict 4-day in-office mandate. Over the last 3 weeks, 6 senior staff engineers submitted resignations, citing commute times and market hybrid offers. Team morale has dropped, and glassdoor ratings are slipping.'
  },
  {
    id: 'preset-comp',
    title: 'Pay Compression & Senior Discontent',
    dept: 'Engineering',
    desc: 'Aggressive hiring over the past year at premium market rates has led to severe compensation compression. Several long-tenured high-performing tech leads now earn 12-18% less than new junior-to-mid hires, triggering quiet quitting and retention risks.'
  },
  {
    id: 'preset-ai-tools',
    title: 'AI Dev Tools & Review Fatigue',
    dept: 'Engineering & QA',
    desc: 'Mandating AI coding assistants increased PR volume by 45%, but PR review cycle times doubled. Senior engineers report cognitive fatigue from reviewing voluminous AI code, and production regression defects have increased by 18%.'
  },
  {
    id: 'preset-support-burnout',
    title: 'Tier Restructuring & Support Churn',
    dept: 'Operations & Customer Success',
    desc: 'Consolidating tier-1 and tier-2 customer support into unified shift rotations has led to 35% turnover among tier-2 specialists. Remaining staff report chronic burnout from high queue volume and lack of career growth paths.'
  }
];

export function ProblemInputCard({
  problemText,
  setProblemText,
  selectedDept,
  setSelectedDept,
  onAnalyze,
  isLoading,
  backendStatus
}) {
  const departments = ['Engineering & Product', 'Operations & Support', 'Sales & Marketing', 'Human Resources', 'Cross-Functional Enterprise'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft-sm overflow-hidden">
      {/* Top Banner */}
      <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-indigo-50/30 to-brand-50/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Workplace Challenge Diagnostic</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                Stage 1 of 5
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Describe a real or simulated organizational dilemma in natural language
            </p>
          </div>
        </div>

        {/* Live Gemini Connection Status Badge */}
        <div className="flex items-center gap-2">
          {backendStatus?.configured ? (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Gemini Live API Connected ({backendStatus.model || 'gemini-1.5-flash'})
            </span>
          ) : (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center gap-1.5" title="Add GEMINI_API_KEY in .env to enable real-time generation">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Demonstration Mode (Calibrated Synthetic Twin)
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Preset Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Enterprise Scenario Presets (Quick-Fill):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {ENTERPRISE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setProblemText(preset.desc);
                  setSelectedDept(preset.dept);
                }}
                className="text-left p-3 rounded-xl border border-slate-200 hover:border-brand-400 hover:bg-brand-50/30 transition-all text-xs group"
              >
                <div className="font-bold text-slate-800 group-hover:text-brand-600 mb-1 flex items-center justify-between">
                  <span>{preset.title}</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-brand-500">Select →</span>
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-2">
                  {preset.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Describe the Challenge Context:
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Affected Scope:</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
            rows={4}
            placeholder="E.g. We are seeing a cluster of resignations in engineering following our return-to-office announcement. How should leadership address this without causing equity issues with sales and operations?"
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-xs text-slate-800 placeholder-slate-400 transition-all leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Privacy Guard: Zero employee PII transmitted. Synthetic cohort context only.
            </span>

            <button
              onClick={onAnalyze}
              disabled={isLoading || !problemText.trim()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-brand-500/20 hover:shadow-lg transition-all"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Diagnosis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Decision Diagnostic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemInputCard;
