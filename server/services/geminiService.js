// server/services/geminiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY?.trim() || '';
const defaultModel = process.env.GEMINI_MODEL?.trim() || 'gemini-3.5-flash-lite';
const fallbackModels = [defaultModel, 'gemini-3.5-flash-lite', 'gemini-3.8-flash', 'gemini-3.1-flash-lite'].filter((v, i, a) => a.indexOf(v) === i);

let genAI = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export function isGeminiConfigured() {
  return Boolean(apiKey && apiKey !== 'your_gemini_api_key_here');
}

export function getActiveModelName() {
  return defaultModel;
}

// Resilient generator that attempts candidate models
async function generateWithFallback(prompt, temperature = 0.4) {
  let lastErr = null;
  for (const mod of fallbackModels) {
    try {
      const model = genAI.getGenerativeModel({
        model: mod,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature
        }
      });
      const result = await model.generateContent(prompt);
      const text = cleanJsonResponse(result.response.text());
      const parsed = JSON.parse(text);
      return { parsed, modelUsed: mod };
    } catch (err) {
      console.warn(`Model ${mod} attempt failed: ${err.message}. Trying next candidate...`);
      lastErr = err;
    }
  }
  throw lastErr;
}

// -------------------------------------------------------------
// System Instructions & Guardrails for Decision Twin
// -------------------------------------------------------------
const SYSTEM_INSTRUCTION = `
You are the AI Decision Twin Engine, an exploratory workplace decision-support simulation system.
Your mission is to help organizational leaders stress-test decisions before enacting them.

CONSTITUTIONAL PRINCIPLES & GUARDRAILS:
1. DECISION SUPPORT ONLY: You are an exploratory simulation system, NOT an autonomous HR decision maker or predictive oracle. The final decision always belongs to human leadership.
2. NO FAKE PRECISE CERTAINTY: Never produce fake precision or claim exact future prediction. All projected metrics are purely scenario estimates, qualitative impact assessments, or illustrative projections on a 0-100 scale.
3. MANDATORY ASSUMPTIONS & UNCERTAINTIES: Every simulation must explicitly surface hidden assumptions and critical uncertainties.
4. SYNTHETIC WORKFORCE CONTEXT: Never use or solicit real employee PII. Use synthetic persona cohorts (e.g. "Senior Engineering Cohort", "Frontline Team Leads").
5. STRICT JSON OUTPUT: Return only valid JSON matching the requested structure without markdown code blocks.
`;

// Helper: Safely clean JSON string if wrapped in markdown
function cleanJsonResponse(rawText) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }
  return cleaned.trim();
}

// -------------------------------------------------------------
// 1. Problem Diagnostic & Intervention Options Generation
// -------------------------------------------------------------
export async function diagnoseWorkplaceProblem({ problemDescription, department, organizationalContext }) {
  if (!isGeminiConfigured()) {
    return generateFallbackDiagnosis(problemDescription, department);
  }

  const prompt = `
${SYSTEM_INSTRUCTION}

TASK:
Analyze this workplace challenge and generate a structured diagnostic breakdown along with 3 distinct, strategic intervention options.

WORKPLACE CHALLENGE:
"${problemDescription}"

DEPARTMENT / COHORT: ${department || 'Cross-Functional Enterprise'}
CONTEXT: ${organizationalContext || '1,248 person technology & operations enterprise experiencing rapid post-growth transitions'}

Generate a JSON object with this exact structure:
{
  "summary": {
    "problemTitle": "Concise 4-8 word title",
    "executiveBrief": "2-3 sentence executive diagnostic summary",
    "urgency": "Low" | "Medium" | "High" | "Critical",
    "primaryDomain": "Retention" | "Culture & Morale" | "Compensation & Equity" | "Productivity" | "Workplace Policy",
    "affectedHeadcountEstimate": "Synthetic estimate string e.g. '~45-60 employees across Engineering'"
  },
  "contributingFactors": [
    {
      "factor": "Factor name",
      "category": "Organizational" | "Cultural" | "Financial" | "Operational",
      "qualitativeSeverity": "Moderate Friction" | "Elevated Risk" | "Severe Impact",
      "explanation": "1-2 sentence root cause explanation"
    }
  ],
  "strategicOptions": [
    {
      "id": "opt-1",
      "title": "Intervention Option 1 Name",
      "strategyType": "Targeted Policy" | "Compensatory & Equity" | "Decentralized / Autonomous" | "Process Rebalance",
      "summary": "Clear summary of this strategic intervention",
      "primaryMechanism": "How this works mechanically in practice",
      "illustrativeEffort": "Low" | "Medium" | "High",
      "illustrativeCost": "Low" | "Medium" | "High",
      "feasibilityRating": "Illustrative Feasibility e.g. 82%",
      "coreTradeoff": "What must be sacrificed or watched closely"
    },
    {
      "id": "opt-2",
      "title": "Intervention Option 2 Name",
      "strategyType": "...",
      "summary": "...",
      "primaryMechanism": "...",
      "illustrativeEffort": "...",
      "illustrativeCost": "...",
      "feasibilityRating": "...",
      "coreTradeoff": "..."
    },
    {
      "id": "opt-3",
      "title": "Intervention Option 3 Name",
      "strategyType": "...",
      "summary": "...",
      "primaryMechanism": "...",
      "illustrativeEffort": "...",
      "illustrativeCost": "...",
      "feasibilityRating": "...",
      "coreTradeoff": "..."
    }
  ]
}
`;

  try {
    const { parsed, modelUsed } = await generateWithFallback(prompt, 0.4);

    return {
      ...parsed,
      isLiveGemini: true,
      modelUsed,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Gemini API diagnosis error:', error.message);
    const fallback = generateFallbackDiagnosis(problemDescription, department);
    fallback.fallbackReason = `Gemini call failed (${error.message}). Displaying calibrated simulation preset.`;
    return fallback;
  }
}

// -------------------------------------------------------------
// 2. Consequence Simulation Engine
// -------------------------------------------------------------
export async function simulateDecisionConsequences({ problemSummary, selectedOption, organizationalContext }) {
  if (!isGeminiConfigured()) {
    return generateFallbackSimulation(problemSummary, selectedOption);
  }

  const prompt = `
${SYSTEM_INSTRUCTION}

TASK:
Simulate the possible multi-horizon consequences of enacting the selected intervention for this workplace challenge.
Model second-order ripple effects, risks, benefits, and synthetic persona reactions.
Crucially: All numeric values are illustrative projection indices (0-100 scale), NOT actual measurements.

PROBLEM SUMMARY:
${JSON.stringify(problemSummary)}

SELECTED INTERVENTION:
${JSON.stringify(selectedOption)}

CONTEXT:
${organizationalContext || 'Enterprise workforce (1,248 employees), hybrid tech & operations'}

Generate a JSON object with this exact structure:
{
  "simulationHeader": {
    "interventionTitle": "${selectedOption.title}",
    "simulationHorizon": "18 Months Multi-Phase Simulation",
    "advisoryLevel": "Exploratory Scenario Simulation"
  },
  "illustrativeMetricProjections": [
    {
      "metricName": "Workforce Retention Index",
      "baselineScore": 62,
      "projectedScore": 84,
      "delta": "+22 pts (Illustrative)",
      "direction": "Positive",
      "explanation": "Qualitative rationale for retention trajectory"
    },
    {
      "metricName": "Operational Momentum",
      "baselineScore": 70,
      "projectedScore": 76,
      "delta": "+6 pts (Illustrative)",
      "direction": "Slight Improvement",
      "explanation": "Impact on sprint delivery velocity and coordination"
    },
    {
      "metricName": "Cultural & Team Sentiment",
      "baselineScore": 54,
      "projectedScore": 81,
      "delta": "+27 pts (Illustrative)",
      "direction": "Significant Positive",
      "explanation": "Perceived leadership empathy and flexibility"
    },
    {
      "metricName": "Budget Friction & Cost Demand",
      "baselineScore": 40,
      "projectedScore": 68,
      "delta": "+28 pts (Illustrative Demand)",
      "direction": "Elevated Expense",
      "explanation": "Financial outlays or compensation adjustments required"
    },
    {
      "metricName": "Managerial Cognitive Load",
      "baselineScore": 78,
      "projectedScore": 55,
      "delta": "-23 pts (Illustrative Relief)",
      "direction": "Reduced Burden",
      "explanation": "Degree of enforcement overhead or exception-handling"
    }
  ],
  "shortTermConsequences": [
    {
      "timeframe": "0 - 45 Days",
      "effect": "First-order reaction description",
      "impactType": "Neutral / Alignment" | "Friction / Transition" | "Quick Win"
    },
    {
      "timeframe": "45 - 90 Days",
      "effect": "Early operational adaptation description",
      "impactType": "Productivity Rebound" | "Policy Clarification" | "Operational Adjustment"
    }
  ],
  "longTermConsequences": [
    {
      "timeframe": "6 - 12 Months",
      "effect": "Second-order organizational evolution description",
      "impactType": "Cultural Norm Stabilization" | "Retention Durability"
    },
    {
      "timeframe": "12 - 18 Months",
      "effect": "Long-range talent brand and precedent impact",
      "impactType": "Talent Attraction Advantage" | "Precedent Expansion"
    }
  ],
  "benefits": [
    "Specific potential upside 1",
    "Specific potential upside 2",
    "Specific potential upside 3"
  ],
  "risks": [
    "Potential downside or unintended consequence 1",
    "Potential downside or unintended consequence 2",
    "Potential downside or unintended consequence 3"
  ],
  "assumptionsAndUncertainties": [
    {
      "type": "Key Assumption",
      "statement": "Critical premise this simulation assumes will remain true",
      "sensitivity": "Moderate" | "High"
    },
    {
      "type": "Uncertainty / Black Swan",
      "statement": "External or behavioral variable that could disrupt this trajectory",
      "sensitivity": "High" | "Critical"
    },
    {
      "type": "Key Assumption",
      "statement": "Secondary operational assumption regarding manager compliance",
      "sensitivity": "Moderate"
    }
  ],
  "syntheticPersonaImpacts": [
    {
      "persona": "Senior Technical Individual Contributors",
      "sentimentShift": "Favorable / Relieved",
      "flightRiskProjection": "Moderate Reduction (Illustrative)",
      "keyConcern": "Primary remaining hesitation or requirement"
    },
    {
      "persona": "Frontline People Managers",
      "sentimentShift": "Cautiously Optimistic",
      "flightRiskProjection": "Stable",
      "keyConcern": "Enforcement consistency across peer teams"
    },
    {
      "persona": "Recent Hires (< 6 Months Tenure)",
      "sentimentShift": "Neutral to Positive",
      "flightRiskProjection": "Low Risk",
      "keyConcern": "Mentorship accessibility and onboarding clarity"
    }
  ]
}
`;

  try {
    const { parsed, modelUsed } = await generateWithFallback(prompt, 0.35);

    return {
      ...parsed,
      isLiveGemini: true,
      modelUsed,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Gemini API simulation error:', error.message);
    const fallback = generateFallbackSimulation(problemSummary, selectedOption);
    fallback.fallbackReason = `Gemini call failed (${error.message}). Displaying calibrated simulation preset.`;
    return fallback;
  }
}

// -------------------------------------------------------------
// 3. "What If?" Scenario Stress-Testing Engine
// -------------------------------------------------------------
export async function simulateWhatIfBranch({ problemSummary, selectedOption, baseSimulation, whatIfCondition }) {
  if (!isGeminiConfigured()) {
    return generateFallbackWhatIf(selectedOption, whatIfCondition);
  }

  const prompt = `
${SYSTEM_INSTRUCTION}

TASK:
Stress-test the previously simulated decision against an unexpected counter-factual "What If?" condition.
Assess trajectory divergence, altered risks, assumptions that break down, and recommended contingency adjustments.

ORIGINAL CHALLENGE & DECISION:
Problem: ${JSON.stringify(problemSummary)}
Selected Intervention: ${JSON.stringify(selectedOption)}

COUNTER-FACTUAL "WHAT IF" CONDITION TO INJECT:
"${whatIfCondition}"

Generate a JSON object with this exact structure:
{
  "conditionAnalyzed": "${whatIfCondition}",
  "trajectoryShift": "Severe Divergence" | "Moderate Recalibration" | "Positive Acceleration" | "High Fragility",
  "executiveDivergenceSummary": "2-3 sentences explaining how this condition fundamentally alters the simulated trajectory",
  "alteredMetrics": [
    {
      "metricName": "Workforce Retention Index",
      "previousProjected": 84,
      "recalibratedProjected": 68,
      "impactDirection": "Negative Divergence",
      "explanation": "Brief reason for divergence"
    },
    {
      "metricName": "Budget Demand",
      "previousProjected": 68,
      "recalibratedProjected": 85,
      "impactDirection": "Elevated Expense",
      "explanation": "Brief reason for divergence"
    }
  ],
  "brokenAssumptions": [
    "Assumption that was invalidated by this condition"
  ],
  "emergentRisks": [
    "New risk created by this condition 1",
    "New risk created by this condition 2"
  ],
  "recommendedContingencyActions": [
    "Immediate adjustment to prevent trajectory collapse 1",
    "Immediate adjustment 2"
  ]
}
`;

  try {
    const { parsed, modelUsed } = await generateWithFallback(prompt, 0.4);

    return {
      ...parsed,
      isLiveGemini: true,
      modelUsed,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Gemini API what-if error:', error.message);
    const fallback = generateFallbackWhatIf(selectedOption, whatIfCondition);
    fallback.fallbackReason = `Gemini call failed (${error.message}). Displaying calibrated scenario preset.`;
    return fallback;
  }
}

// -------------------------------------------------------------
// 4. Multi-Scenario Comparative Scorecard
// -------------------------------------------------------------
export async function compareScenarios({ problemSummary, optionsList }) {
  if (!isGeminiConfigured()) {
    return generateFallbackComparison(optionsList);
  }

  const prompt = `
${SYSTEM_INSTRUCTION}

TASK:
Provide a comparative multi-scenario evaluation matrix for the available strategic options.
Contrast trade-offs across Retention, Cultural Health, Speed to Enact, Cost Demand, and Implementation Risk.

PROBLEM:
${JSON.stringify(problemSummary)}

OPTIONS TO COMPARE:
${JSON.stringify(optionsList)}

Generate a JSON object with this exact structure:
{
  "comparativeSummary": "Executive comparative synthesis across the options",
  "scorecard": [
    {
      "optionId": "opt-1",
      "optionTitle": "Title",
      "illustrativeScores": {
        "retentionScore": 75,
        "sentimentScore": 70,
        "speedScore": 85,
        "costScore": 40,
        "feasibilityScore": 78
      },
      "primaryAdvantage": "Biggest upside",
      "primaryVulnerability": "Biggest blindspot",
      "recommendedContext": "Best chosen when the organization values..."
    }
  ],
  "strategicSynthesis": {
    "highestRetentionPath": "Option name with brief reason",
    "lowestCostPath": "Option name with brief reason",
    "lowestFrictionPath": "Option name with brief reason"
  }
}
`;

  try {
    const { parsed, modelUsed } = await generateWithFallback(prompt, 0.3);

    return {
      ...parsed,
      isLiveGemini: true,
      modelUsed,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Gemini API comparison error:', error.message);
    return generateFallbackComparison(optionsList);
  }
}

// -------------------------------------------------------------
// High-Fidelity Synthetic Fallbacks (When API key is not yet added)
// Ensures the user can immediately test and evaluate the entire flow
// -------------------------------------------------------------
function generateFallbackDiagnosis(problemDescription, department) {
  const isRTO = (problemDescription || '').toLowerCase().includes('office') || (problemDescription || '').toLowerCase().includes('rto');
  const isComp = (problemDescription || '').toLowerCase().includes('comp') || (problemDescription || '').toLowerCase().includes('salary');

  let title = "Strategic Workplace Alignment Challenge";
  let brief = "Leadership decision regarding workplace policy and talent retention under shifting market and cultural dynamics.";

  if (isRTO) {
    title = "Workplace Presence & Flexibility Friction";
    brief = "Transitioning workplace attendance expectations requires balancing cross-functional collaboration benefits against localized retention risk among autonomous senior talent.";
  } else if (isComp) {
    title = "Talent Compensation Equity & Retention Tension";
    brief = "Disparities between historical compensation baselines and current hiring rates risk driving voluntary exits and disengagement across critical contributors.";
  }

  return {
    isLiveGemini: false,
    modelUsed: 'synthetic-demonstration-preset',
    timestamp: new Date().toISOString(),
    notice: 'Running in calibrated demonstration mode. Set GEMINI_API_KEY in .env for real-time Gemini 1.5/2.0 generation.',
    summary: {
      problemTitle: title,
      executiveBrief: brief,
      urgency: 'High',
      primaryDomain: isRTO ? 'Workplace Policy & Retention' : 'Compensation & Equity',
      affectedHeadcountEstimate: '~35-50 Senior Contributors & Leads'
    },
    contributingFactors: [
      {
        factor: 'Market Asymmetry & Counter-Offers',
        category: 'Financial',
        qualitativeSeverity: 'Elevated Risk',
        explanation: 'Top tier external firms continue offering competitive flexibility and aggressive compensation premiums.'
      },
      {
        factor: 'Commuting & Cognitive Fatigue',
        category: 'Cultural',
        qualitativeSeverity: 'Moderate Friction',
        explanation: 'Average team members face significant travel overhead without corresponding collaborative gains on uncoordinated in-office days.'
      },
      {
        factor: 'Middle Management Ambiguity',
        category: 'Operational',
        qualitativeSeverity: 'Moderate Friction',
        explanation: 'People managers lack standardized discretion guidelines, leading to uneven enforcement and employee dissatisfaction.'
      },
      {
        factor: 'Organizational Precedent Sensitivity',
        category: 'Organizational',
        qualitativeSeverity: 'Elevated Risk',
        explanation: 'Exceptions granted to high performers trigger perceived fairness concerns across adjacent teams.'
      }
    ],
    strategicOptions: [
      {
        id: 'opt-1',
        title: 'Targeted Core Collaboration Cadence',
        strategyType: 'Targeted Policy',
        summary: 'Establish 2 anchor co-location days per week specifically dedicated to design reviews, retrospectives, and cross-team workshops, leaving 3 days fully async/remote.',
        primaryMechanism: 'Replaces rigid attendance accounting with purposeful collective collaboration rituals.',
        illustrativeEffort: 'Low',
        illustrativeCost: 'Low',
        feasibilityRating: '91% (Illustrative)',
        coreTradeoff: 'Requires strict calendar discipline to prevent anchor days from devolving into meeting marathons.'
      },
      {
        id: 'opt-2',
        title: 'Compensatory Retention Stipends & Travel Subsidies',
        strategyType: 'Compensatory & Equity',
        summary: 'Introduce monthly transit and flexible wellness allowances alongside selective retention equity grants for critical senior roles.',
        primaryMechanism: 'Directly offsets commuting friction and realigns financial value with on-site presence.',
        illustrativeEffort: 'Medium',
        illustrativeCost: 'High',
        feasibilityRating: '78% (Illustrative)',
        coreTradeoff: 'Increases fixed operating expenditures and may invite pay-parity grievances from non-eligible teams.'
      },
      {
        id: 'opt-3',
        title: 'Decentralized Team Charter Compacts',
        strategyType: 'Decentralized / Autonomous',
        summary: 'Empower individual Directors and Engineering Leads to negotiate team-level performance compacts tied to milestone velocity rather than physical presence.',
        primaryMechanism: 'Distributes governance to leaders closest to the technical deliverables and operational realities.',
        illustrativeEffort: 'High',
        illustrativeCost: 'Low',
        feasibilityRating: '69% (Illustrative)',
        coreTradeoff: 'Creates cross-department variance and risks leadership misalignment if standards diverge.'
      }
    ]
  };
}

function generateFallbackSimulation(problemSummary, selectedOption) {
  return {
    isLiveGemini: false,
    modelUsed: 'synthetic-demonstration-preset',
    timestamp: new Date().toISOString(),
    notice: 'Running in calibrated demonstration mode. Set GEMINI_API_KEY in .env for real-time Gemini generation.',
    simulationHeader: {
      interventionTitle: selectedOption?.title || 'Selected Strategy',
      simulationHorizon: '18 Months Multi-Phase Simulation',
      advisoryLevel: 'Exploratory Scenario Simulation (Advisory Only)'
    },
    illustrativeMetricProjections: [
      {
        metricName: 'Workforce Retention Index',
        baselineScore: 61,
        projectedScore: 85,
        delta: '+24 pts (Illustrative)',
        direction: 'Positive',
        explanation: 'Reduction in active job seeking as autonomy and predictability are restored.'
      },
      {
        metricName: 'Operational Momentum',
        baselineScore: 69,
        projectedScore: 78,
        delta: '+9 pts (Illustrative)',
        direction: 'Slight Improvement',
        explanation: 'Synchronized co-location accelerates complex architecture handoffs.'
      },
      {
        metricName: 'Cultural & Team Sentiment',
        baselineScore: 52,
        projectedScore: 82,
        delta: '+30 pts (Illustrative)',
        direction: 'Significant Positive',
        explanation: 'Employees perceive policy as empathetic and purposeful rather than surveillance-driven.'
      },
      {
        metricName: 'Budget Friction & Cost Demand',
        baselineScore: 35,
        projectedScore: 58,
        delta: '+23 pts (Illustrative Demand)',
        direction: 'Manageable Expense',
        explanation: 'Modest tooling and team lunch allowances with minimal recurring overhead.'
      },
      {
        metricName: 'Managerial Cognitive Load',
        baselineScore: 76,
        projectedScore: 51,
        delta: '-25 pts (Illustrative Relief)',
        direction: 'Reduced Burden',
        explanation: 'Clear team-level norms reduce arbitrary individual negotiation friction.'
      }
    ],
    shortTermConsequences: [
      {
        timeframe: 'Days 0 - 30: Transition & Calibration',
        effect: 'Immediate stabilization in sentiment; voluntary departure inquiries drop within key cohorts.',
        impactType: 'Quick Win'
      },
      {
        timeframe: 'Days 31 - 90: Cadence Normalization',
        effect: 'Teams identify optimal ritual rhythms; room booking friction on peak anchor days requires minor facility adjustments.',
        impactType: 'Operational Adjustment'
      }
    ],
    longTermConsequences: [
      {
        timeframe: 'Months 3 - 9: Knowledge Continuity',
        effect: 'Cross-pod architecture reviews show faster consensus; junior mentorship opportunities increase measurably.',
        impactType: 'Cultural Norm Stabilization'
      },
      {
        timeframe: 'Months 9 - 18: Talent Brand Magnetism',
        effect: 'Reputation as a pragmatic, high-trust employer improves offer acceptance rates by 15-20% (scenario estimate).',
        impactType: 'Talent Attraction Advantage'
      }
    ],
    benefits: [
      'Preserves high-value institutional knowledge and saves significant replacement/headhunter costs.',
      'Maximizes office utility by aligning team presence rather than leaving empty desks on randomized days.',
      'Fosters team social capital without forcing daily commuting friction.'
    ],
    risks: [
      'Adjacent departments (e.g. Sales, Operations) may perceive unfair flexibility imbalances.',
      'Anchor days risk calendar saturation if leaders do not actively guard quiet focus blocks.',
      'Non-local remote employees may feel isolated during designated in-person anchor rituals.'
    ],
    assumptionsAndUncertainties: [
      {
        type: 'Key Assumption',
        statement: 'Assumes engineering leadership actively protects non-anchor days from spontaneous meetings.',
        sensitivity: 'High'
      },
      {
        type: 'Key Assumption',
        statement: 'Assumes office facilities can accommodate peak attendance on synchronized anchor days.',
        sensitivity: 'Moderate'
      },
      {
        type: 'Uncertainty / Market Risk',
        statement: 'Aggressive remote compensation offers from Tier-1 tech firms could still pressure niche ML/backend talent.',
        sensitivity: 'Critical'
      }
    ],
    syntheticPersonaImpacts: [
      {
        persona: 'Senior Technical Specialists (5+ yrs tenure)',
        sentimentShift: 'Greatly Relieved',
        flightRiskProjection: 'Drops from High to Low (Illustrative)',
        keyConcern: 'Requires absolute guarantees that anchor days do not expand to 4-5 days later.'
      },
      {
        persona: 'Frontline Engineering Managers',
        sentimentShift: 'Supported',
        flightRiskProjection: 'Stable',
        keyConcern: 'Clear guidance on how to manage performance of employees who miss anchor days.'
      },
      {
        persona: 'Early-Career Developers & Apprentices',
        sentimentShift: 'Strongly Positive',
        flightRiskProjection: 'Very Low',
        keyConcern: 'Ensuring senior leads are actually accessible for pairing during anchor sessions.'
      }
    ]
  };
}

function generateFallbackWhatIf(selectedOption, whatIfCondition) {
  return {
    isLiveGemini: false,
    modelUsed: 'synthetic-demonstration-preset',
    timestamp: new Date().toISOString(),
    conditionAnalyzed: whatIfCondition,
    trajectoryShift: 'Moderate Recalibration',
    executiveDivergenceSummary: `Injecting "${whatIfCondition}" introduces execution friction. The baseline simulation assumes organizational alignment; this stress-test reveals vulnerability in managerial compliance and perceived fairness.`,
    alteredMetrics: [
      {
        metricName: 'Workforce Retention Index',
        previousProjected: 85,
        recalibratedProjected: 71,
        impactDirection: 'Negative Divergence (-14 pts)',
        explanation: 'Inconsistent enforcement creates resentment and localized flight risk.'
      },
      {
        metricName: 'Managerial Cognitive Load',
        previousProjected: 51,
        recalibratedProjected: 82,
        impactDirection: 'Sharp Increase (+31 pts)',
        explanation: 'Managers spend significant energy navigating dispute escalations.'
      }
    ],
    brokenAssumptions: [
      'Assumption that all directors would enforce uniform anchor expectations without central oversight.',
      'Assumption of uniform employee buy-in without dedicated change management.'
    ],
    emergentRisks: [
      'Team-shopping behavior where staff request internal transfers to lenient managers.',
      'Perceived favoritism leading to formal HR grievance filings.'
    ],
    recommendedContingencyActions: [
      'Convene an immediate Director-level alignment sync to calibrate expectations.',
      'Publish an enterprise FAQ clarifying accommodation requests and medical/caregiver exceptions.',
      'Implement a 60-day retrospective pulse survey before hardening any policy rules.'
    ]
  };
}

function generateFallbackComparison(optionsList) {
  const options = optionsList || [
    { id: 'opt-1', title: 'Targeted Core Collaboration Cadence' },
    { id: 'opt-2', title: 'Compensatory Retention Stipends & Travel Subsidies' },
    { id: 'opt-3', title: 'Decentralized Team Charter Compacts' }
  ];

  return {
    isLiveGemini: false,
    modelUsed: 'synthetic-demonstration-preset',
    timestamp: new Date().toISOString(),
    comparativeSummary: 'Comparative trade-off synthesis indicates Option 1 provides the optimal balance of retention recovery and operational momentum with minimal capital expenditure, whereas Option 2 offers higher short-term retention certainty at substantially higher budget demand.',
    scorecard: [
      {
        optionId: options[0]?.id || 'opt-1',
        optionTitle: options[0]?.title || 'Targeted Core Collaboration Cadence',
        illustrativeScores: {
          retentionScore: 85,
          sentimentScore: 82,
          speedScore: 88,
          costScore: 92,
          feasibilityScore: 91
        },
        primaryAdvantage: 'High employee buy-in with almost zero recurring capital outlay.',
        primaryVulnerability: 'Requires strict calendar hygiene to prevent meeting bloat on anchor days.',
        recommendedContext: 'Best chosen when trust is high and leadership wants to emphasize purposeful co-location.'
      },
      {
        optionId: options[1]?.id || 'opt-2',
        optionTitle: options[1]?.title || 'Compensatory Retention Stipends',
        illustrativeScores: {
          retentionScore: 78,
          sentimentScore: 71,
          speedScore: 74,
          costScore: 42,
          feasibilityScore: 78
        },
        primaryAdvantage: 'Immediate financial incentive creates concrete compensation alignment.',
        primaryVulnerability: 'Significantly increases operational budget and risks equity grievances from other teams.',
        recommendedContext: 'Best chosen when talent has explicit competing market offers with cash differentials.'
      },
      {
        optionId: options[2]?.id || 'opt-3',
        optionTitle: options[2]?.title || 'Decentralized Team Charters',
        illustrativeScores: {
          retentionScore: 74,
          sentimentScore: 76,
          speedScore: 65,
          costScore: 89,
          feasibilityScore: 69
        },
        primaryAdvantage: 'Maximum local team autonomy and customized workflow optimization.',
        primaryVulnerability: 'Departmental inconsistency leads to fairness complaints and transfer requests.',
        recommendedContext: 'Best chosen in highly autonomous matrix organizations with distinct functional pods.'
      }
    ],
    strategicSynthesis: {
      highestRetentionPath: 'Targeted Core Collaboration Cadence (Restores sustainable autonomy)',
      lowestCostPath: 'Targeted Core Collaboration Cadence (Operates within existing facility footprint)',
      lowestFrictionPath: 'Targeted Core Collaboration Cadence (Clear enterprise schedule eliminates ambiguity)'
    }
  };
}
