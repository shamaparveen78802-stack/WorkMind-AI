// src/services/decisionTwinService.js
// Client service layer communicating with secure backend /api/decision-twin endpoints

const BASE_URL = '/api/decision-twin';

export async function getBackendStatus() {
  try {
    const res = await fetch(`${BASE_URL}/status`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend status check error:', err.message);
    return { configured: false, error: err.message };
  }
}

export async function diagnoseProblem({ problemDescription, department, organizationalContext }) {
  const res = await fetch(`${BASE_URL}/diagnose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemDescription, department, organizationalContext })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Diagnostic request failed with status ${res.status}`);
  }

  return await res.json();
}

export async function simulateConsequences({ problemSummary, selectedOption, organizationalContext }) {
  const res = await fetch(`${BASE_URL}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemSummary, selectedOption, organizationalContext })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Simulation request failed with status ${res.status}`);
  }

  return await res.json();
}

export async function simulateWhatIf({ problemSummary, selectedOption, baseSimulation, whatIfCondition }) {
  const res = await fetch(`${BASE_URL}/what-if`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemSummary, selectedOption, baseSimulation, whatIfCondition })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `What-if request failed with status ${res.status}`);
  }

  return await res.json();
}

export async function compareOptions({ problemSummary, optionsList }) {
  const res = await fetch(`${BASE_URL}/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemSummary, optionsList })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Comparison request failed with status ${res.status}`);
  }

  return await res.json();
}
