// src/components/decision-twin/HumanDecisionMemorandum.jsx
import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckSquare,
  Square,
  Copy,
  Check,
  UserCheck,
  AlertOctagon,
  Download
} from 'lucide-react';
import Badge from '../common/Badge';

export function HumanDecisionMemorandum({
  problemSummary,
  selectedOption,
  simulationResult,
  whatIfResult
}) {
  const [copied, setCopied] = useState(false);
  const [checklist, setChecklist] = useState({
    equityChecked: true,
    legalReviewed: false,
    budgetConfirmed: true,
    stakeholderConsulted: false
  });
  const [humanDecisionNotes, setHumanDecisionNotes] = useState(
    'Leadership consensus agrees on a phased 90-day pilot of the targeted anchor cadence, paired with quarterly retrospectives.'
  );
  const [leaderName, setLeaderName] = useState('Executive HR & Engineering Review Committee');

  const toggleCheck = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyMemo = () => {
    const memoContent = `
======================================================
WORKMIND DECISION TWIN — HUMAN EXECUTIVE MEMORANDUM
======================================================
STATUS: ADVISORY SCENARIO SIMULATION ONLY
GOVERNANCE: Human Decision-Maker retains exclusive authority.

1. WORKPLACE CHALLENGE
Title: ${problemSummary?.problemTitle || 'N/A'}
Domain: ${problemSummary?.primaryDomain || 'N/A'}
Urgency: ${problemSummary?.urgency || 'N/A'}
Summary: ${problemSummary?.executiveBrief || 'N/A'}

2. SELECTED STRATEGIC INTERVENTION
Title: ${selectedOption?.title || 'N/A'}
Strategy Type: ${selectedOption?.strategyType || 'N/A'}
Core Mechanism: ${selectedOption?.primaryMechanism || 'N/A'}
Core Trade-off: ${selectedOption?.coreTradeoff || 'N/A'}

3. SIMULATION INSIGHTS & SCENARIO ESTIMATES
(Note: Qualitative scenario estimates on 0-100 scale, not empirical measurements)
${(simulationResult?.illustrativeMetricProjections || [])
  .map((m) => `* ${m.metricName}: ${m.baselineScore} -> ${m.projectedScore} (${m.delta}) - ${m.explanation}`)
  .join('\n')}

4. CRITICAL ASSUMPTIONS & SENSITIVITY
${(simulationResult?.assumptionsAndUncertainties || [])
  .map((a) => `* [${a.type} | Sensitivity: ${a.sensitivity}] ${a.statement}`)
  .join('\n')}

5. WHAT-IF STRESS TEST
Condition: ${whatIfResult?.conditionAnalyzed || 'None analyzed'}
Trajectory Shift: ${whatIfResult?.trajectoryShift || 'N/A'}
Summary: ${whatIfResult?.executiveDivergenceSummary || 'N/A'}

6. HUMAN GOVERNANCE SIGN-OFF
Reviewer: ${leaderName}
Date: ${new Date().toLocaleDateString()}
Checklist:
- Fairness & Equity Assessed: ${checklist.equityChecked ? '[x]' : '[ ]'}
- Legal / Labor Counsel Reviewed: ${checklist.legalReviewed ? '[x]' : '[ ]'}
- Budget Allocation Confirmed: ${checklist.budgetConfirmed ? '[x]' : '[ ]'}
- Stakeholder Feedback Gathered: ${checklist.stakeholderConsulted ? '[x]' : '[ ]'}

Executive Rationale & Decision Notes:
"${humanDecisionNotes}"
======================================================
`;

    navigator.clipboard.writeText(memoContent.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-6">
      {/* Governance Banner */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <span className="font-bold block text-amber-950 mb-0.5">
            Constitutional Human-in-the-Loop Governance:
          </span>
          The WorkMind Decision Twin is an exploratory cognitive simulator designed to augment judgment. The AI system does not enforce, automate, or execute HR decisions. All final policy, compensation, or workforce decisions require qualified human leadership authorization.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-600" />
            <span>Human Decision Memorandum & Audit Record</span>
          </h3>
          <p className="text-xs text-slate-500">
            Formalize the simulated scenario into an executive briefing document with human oversight
          </p>
        </div>

        <button
          onClick={handleCopyMemo}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Executive Brief</span>
            </>
          )}
        </button>
      </div>

      {/* Human Review Checklist */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          Human Oversight & Governance Verification:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { id: 'equityChecked', label: 'Fairness & Cross-Department Equity Impact Assessed' },
            { id: 'legalReviewed', label: 'Employment Law & Labor Relations Counsel Consulted' },
            { id: 'budgetConfirmed', label: 'Budget Approvals & Operating Expense Ceilings Verified' },
            { id: 'stakeholderConsulted', label: 'Frontline Manager & Employee Focus Group Feedback Gathered' },
          ].map((item) => {
            const isChecked = checklist[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 text-xs font-medium ${
                  isChecked
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/70'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Human Decision Notes */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Executive Decision Rationale & Modification Notes:
        </label>
        <textarea
          value={humanDecisionNotes}
          onChange={(e) => setHumanDecisionNotes(e.target.value)}
          rows={3}
          className="w-full p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          placeholder="Document leadership adjustments, pilot phase timelines, or stakeholder caveats..."
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Authorizing Body:</span>
            <input
              type="text"
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-semibold"
            />
          </div>
          <span>Date: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default HumanDecisionMemorandum;
