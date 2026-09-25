// src/components/decision-twin/SimulationMetricsGrid.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Activity, Info, ShieldAlert, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';

export function SimulationMetricsGrid({ metricProjections = [], interventionTitle = '' }) {
  if (!metricProjections || metricProjections.length === 0) return null;

  // Prepare data for Recharts
  const chartData = metricProjections.map((m) => ({
    name: m.metricName.replace('Workforce ', '').replace(' & Team Sentiment', '').replace(' Cognitive Load', ''),
    Baseline: m.baselineScore,
    Projected: m.projectedScore,
    delta: m.delta,
    explanation: m.explanation
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm space-y-5">
      {/* Header with Mandatory Clarification Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Illustrative Scenario Projections (0–100 Qualitative Scale)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparative assessment of status-quo baseline vs. projected intervention equilibrium
          </p>
        </div>

        {/* Prominent Disclaimer Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span>Scenario estimates for decision support. Not empirical measurements.</span>
        </div>
      </div>

      {/* Visual Chart Comparison */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-lg text-xs space-y-1 max-w-xs">
                      <div className="font-bold text-slate-900">{label}</div>
                      <div className="flex justify-between text-slate-500">
                        <span>Baseline:</span>
                        <span className="font-semibold text-slate-800">{data.Baseline} / 100</span>
                      </div>
                      <div className="flex justify-between text-indigo-600">
                        <span>Projected:</span>
                        <span className="font-semibold">{data.Projected} / 100 ({data.delta})</span>
                      </div>
                      <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        {data.explanation}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Bar dataKey="Baseline" fill="#94A3B8" radius={[4, 4, 0, 0]} name="Status-Quo Baseline" />
            <Bar dataKey="Projected" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Projected Scenario Estimate" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Projection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
        {metricProjections.map((m, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{m.metricName}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  m.direction.toLowerCase().includes('positive') || m.direction.toLowerCase().includes('improvement') || m.direction.toLowerCase().includes('relief')
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-indigo-100 text-indigo-800'
                }`}
              >
                {m.delta}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, m.projectedScore)}%` }}
                ></div>
              </div>
              <span className="text-[11px] font-bold text-slate-700 w-12 text-right">
                {m.projectedScore} / 100
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              {m.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimulationMetricsGrid;
