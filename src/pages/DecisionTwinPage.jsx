// src/pages/DecisionTwinPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  GitBranch,
  Layers,
  Scale,
  FileText,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import Badge from '../components/common/Badge';
import ProblemInputCard, { ENTERPRISE_PRESETS } from '../components/decision-twin/ProblemInputCard';
import InterventionOptionsCard from '../components/decision-twin/InterventionOptionsCard';
import SimulationMetricsGrid from '../components/decision-twin/SimulationMetricsGrid';
import ConsequenceTimeline from '../components/decision-twin/ConsequenceTimeline';
import AssumptionsUncertaintyDrawer from '../components/decision-twin/AssumptionsUncertaintyDrawer';
import WhatIfBrancher from '../components/decision-twin/WhatIfBrancher';
import ScenarioComparisonTable from '../components/decision-twin/ScenarioComparisonTable';
import HumanDecisionMemorandum from '../components/decision-twin/HumanDecisionMemorandum';
import {
  getBackendStatus,
  diagnoseProblem,
  simulateConsequences,
  simulateWhatIf,
  compareOptions
} from '../services/decisionTwinService';

export function DecisionTwinPage() {
  // Navigation & Workflow Stage (1: Diagnostic, 2: Options, 3: Simulation, 4: What-If, 5: Comparison & Memo)
  const [currentStage, setCurrentStage] = useState(1);
  const [backendStatus, setBackendStatus] = useState(null);

  // Core Simulation State
  const [problemText, setProblemText] = useState(ENTERPRISE_PRESETS[0].desc);
  const [selectedDept, setSelectedDept] = useState(ENTERPRISE_PRESETS[0].dept);
  const [diagnosis, setDiagnosis] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [simulationResult, setSimulationResult] = useState(null);
  const [whatIfResult, setWhatIfResult] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);

  // Loading States
  const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isWhatIfRunning, setIsWhatIfRunning] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Check backend and Gemini status on mount
  useEffect(() => {
    getBackendStatus().then((status) => {
      setBackendStatus(status);
    });
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  // Stage 1 -> 2: Run Diagnostic
  const handleRunDiagnostic = async () => {
    if (!problemText.trim()) return;
    setIsLoadingDiagnosis(true);
    try {
      const result = await diagnoseProblem({
        problemDescription: problemText,
        department: selectedDept
      });
      setDiagnosis(result);
      if (result.strategicOptions && result.strategicOptions.length > 0) {
        setSelectedOption(result.strategicOptions[0]);
      }
      setCurrentStage(2);
      showToast(result.isLiveGemini ? 'Diagnosis synthesized with Gemini 1.5/2.0!' : 'Diagnosis loaded in calibrated demonstration mode.');
    } catch (err) {
      console.error('Diagnosis error:', err);
      showToast(`Error: ${err.message}`);
    } finally {
      setIsLoadingDiagnosis(false);
    }
  };

  // Stage 2 -> 3: Simulate Selected Intervention
  const handleLaunchSimulation = async () => {
    if (!selectedOption) return;
    setIsSimulating(true);
    try {
      const result = await simulateConsequences({
        problemSummary: diagnosis?.summary,
        selectedOption: selectedOption
      });
      setSimulationResult(result);
      setCurrentStage(3);
      showToast('Consequence trajectory & qualitative metrics modeled!');
    } catch (err) {
      console.error('Simulation error:', err);
      showToast(`Simulation error: ${err.message}`);
    } finally {
      setIsSimulating(false);
    }
  };

  // Stage 4: Run What-If Branch
  const handleRunWhatIf = async (whatIfPrompt) => {
    setIsWhatIfRunning(true);
    try {
      const result = await simulateWhatIf({
        problemSummary: diagnosis?.summary,
        selectedOption: selectedOption,
        baseSimulation: simulationResult,
        whatIfCondition: whatIfPrompt
      });
      setWhatIfResult(result);
      showToast('What-If trajectory shock analyzed!');
    } catch (err) {
      console.error('What-if error:', err);
      showToast(`What-if error: ${err.message}`);
    } finally {
      setIsWhatIfRunning(false);
    }
  };

  // Stage 5: Load Comparison Scorecard
  const handleLoadComparison = async () => {
    if (!diagnosis?.strategicOptions) return;
    setIsComparing(true);
    try {
      const result = await compareOptions({
        problemSummary: diagnosis?.summary,
        optionsList: diagnosis.strategicOptions
      });
      setComparisonResult(result);
      setCurrentStage(5);
      showToast('Multi-scenario comparison matrix generated!');
    } catch (err) {
      console.error('Comparison error:', err);
      showToast(`Comparison error: ${err.message}`);
    } finally {
      setIsComparing(false);
    }
  };

  const handleReset = () => {
    setCurrentStage(1);
    setDiagnosis(null);
    setSelectedOption(null);
    setSimulationResult(null);
    setWhatIfResult(null);
    setComparisonResult(null);
  };

  const stages = [
    { num: 1, label: '1. Diagnostic' },
    { num: 2, label: '2. Interventions', disabled: !diagnosis },
    { num: 3, label: '3. Simulation Twin', disabled: !simulationResult },
    { num: 4, label: '4. What-If Stress Test', disabled: !simulationResult },
    { num: 5, label: '5. Compare & Governance', disabled: !diagnosis }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in border border-slate-700">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Feature Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider">
            <Brain className="w-4 h-4" />
            <span>AI Decision Twin • Simulation Engine</span>
            <span className="text-[10px] bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              NEW GEMINI ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            WorkMind — Decision Twin
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Stress-test organizational interventions before enacting them. Simulate short-term vs. long-term trajectories, unintended risks, and employee cohort reactions with human oversight.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {diagnosis && (
            <button
              onClick={handleReset}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Scenario</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Human In The Loop Authorized</span>
          </div>
        </div>
      </div>

      {/* Workflow Navigation Stepper Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-soft-sm flex items-center justify-between gap-1 overflow-x-auto">
        {stages.map((st) => (
          <button
            key={st.num}
            onClick={() => !st.disabled && setCurrentStage(st.num)}
            disabled={st.disabled}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              currentStage === st.num
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-sm'
                : st.disabled
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>{st.label}</span>
          </button>
        ))}
      </div>

      {/* STAGE 1: Problem Ingestion & Diagnostic Input */}
      {currentStage === 1 && (
        <div className="space-y-6">
          <ProblemInputCard
            problemText={problemText}
            setProblemText={setProblemText}
            selectedDept={selectedDept}
            setSelectedDept={setSelectedDept}
            onAnalyze={handleRunDiagnostic}
            isLoading={isLoadingDiagnosis}
            backendStatus={backendStatus}
          />
        </div>
      )}

      {/* STAGE 2: Strategic Intervention Selection */}
      {currentStage === 2 && diagnosis && (
        <div className="space-y-6">
          <InterventionOptionsCard
            diagnosis={diagnosis}
            selectedOption={selectedOption}
            onSelectOption={setSelectedOption}
            onSimulate={handleLaunchSimulation}
            isSimulating={isSimulating}
          />
        </div>
      )}

      {/* STAGE 3: Consequence Simulation Twin */}
      {currentStage === 3 && simulationResult && (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 block">
                Active Simulation Twin:
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                {selectedOption?.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStage(4)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                <span>Stress-Test "What If?"</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleLoadComparison}
                disabled={isComparing}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                <span>Compare All 3 Options</span>
              </button>
            </div>
          </div>

          {/* Qualitative Scenario Projections Grid */}
          <SimulationMetricsGrid
            metricProjections={simulationResult.illustrativeMetricProjections}
            interventionTitle={selectedOption?.title}
          />

          {/* Multi-Horizon Consequence Timeline */}
          <ConsequenceTimeline
            shortTerm={simulationResult.shortTermConsequences}
            longTerm={simulationResult.longTermConsequences}
            benefits={simulationResult.benefits}
            risks={simulationResult.risks}
            syntheticPersonaImpacts={simulationResult.syntheticPersonaImpacts}
          />

          {/* Critical Assumptions & Uncertainties */}
          <AssumptionsUncertaintyDrawer
            assumptionsAndUncertainties={simulationResult.assumptionsAndUncertainties}
          />
        </div>
      )}

      {/* STAGE 4: What-If Branching Sandbox */}
      {currentStage === 4 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900">
            <span>
              Simulating shock conditions against strategy: <strong>{selectedOption?.title}</strong>
            </span>
            <button
              onClick={() => setCurrentStage(3)}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              ← Back to Base Simulation
            </button>
          </div>

          <WhatIfBrancher
            onRunWhatIf={handleRunWhatIf}
            isRunning={isWhatIfRunning}
            whatIfResult={whatIfResult}
          />

          <div className="flex justify-end">
            <button
              onClick={handleLoadComparison}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Proceed to Multi-Scenario Comparison & Memo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 5: Multi-Scenario Comparison & Human Decision Memorandum */}
      {currentStage === 5 && (
        <div className="space-y-6">
          {comparisonResult ? (
            <ScenarioComparisonTable
              comparisonData={comparisonResult}
              onSelectForDeepDive={(item) => {
                const matched = diagnosis.strategicOptions.find((o) => o.id === item.optionId);
                if (matched) {
                  setSelectedOption(matched);
                  handleLaunchSimulation();
                }
              }}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <RefreshCw className="w-6 h-6 text-brand-600 animate-spin mx-auto" />
              <p className="text-xs text-slate-600">Generating multi-scenario comparison matrix...</p>
            </div>
          )}

          {/* Human Decision Memorandum */}
          <HumanDecisionMemorandum
            problemSummary={diagnosis?.summary}
            selectedOption={selectedOption}
            simulationResult={simulationResult}
            whatIfResult={whatIfResult}
          />
        </div>
      )}
    </div>
  );
}

export default DecisionTwinPage;
