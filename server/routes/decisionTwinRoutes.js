// server/routes/decisionTwinRoutes.js
import { Router } from 'express';
import {
  isGeminiConfigured,
  getActiveModelName,
  diagnoseWorkplaceProblem,
  simulateDecisionConsequences,
  simulateWhatIfBranch,
  compareScenarios
} from '../services/geminiService.js';

const router = Router();

// GET /api/decision-twin/status
router.get('/status', (req, res) => {
  res.json({
    configured: isGeminiConfigured(),
    model: getActiveModelName(),
    environment: process.env.NODE_ENV || 'development',
    serverTimestamp: new Date().toISOString()
  });
});

// POST /api/decision-twin/diagnose
router.post('/diagnose', async (req, res) => {
  try {
    const { problemDescription, department, organizationalContext } = req.body;
    if (!problemDescription || typeof problemDescription !== 'string' || !problemDescription.trim()) {
      return res.status(400).json({ error: 'problemDescription string is required.' });
    }

    const diagnosis = await diagnoseWorkplaceProblem({
      problemDescription: problemDescription.trim().slice(0, 2000), // safety length cap
      department,
      organizationalContext
    });

    res.json(diagnosis);
  } catch (err) {
    console.error('Error in /diagnose:', err);
    res.status(500).json({ error: 'Failed to diagnose challenge', details: err.message });
  }
});

// POST /api/decision-twin/simulate
router.post('/simulate', async (req, res) => {
  try {
    const { problemSummary, selectedOption, organizationalContext } = req.body;
    if (!selectedOption || !selectedOption.title) {
      return res.status(400).json({ error: 'selectedOption with title is required.' });
    }

    const simulation = await simulateDecisionConsequences({
      problemSummary: problemSummary || {},
      selectedOption,
      organizationalContext
    });

    res.json(simulation);
  } catch (err) {
    console.error('Error in /simulate:', err);
    res.status(500).json({ error: 'Failed to simulate decision consequences', details: err.message });
  }
});

// POST /api/decision-twin/what-if
router.post('/what-if', async (req, res) => {
  try {
    const { problemSummary, selectedOption, baseSimulation, whatIfCondition } = req.body;
    if (!whatIfCondition || typeof whatIfCondition !== 'string' || !whatIfCondition.trim()) {
      return res.status(400).json({ error: 'whatIfCondition string is required.' });
    }

    const stressTest = await simulateWhatIfBranch({
      problemSummary: problemSummary || {},
      selectedOption: selectedOption || {},
      baseSimulation: baseSimulation || {},
      whatIfCondition: whatIfCondition.trim().slice(0, 1000)
    });

    res.json(stressTest);
  } catch (err) {
    console.error('Error in /what-if:', err);
    res.status(500).json({ error: 'Failed to run what-if simulation', details: err.message });
  }
});

// POST /api/decision-twin/compare
router.post('/compare', async (req, res) => {
  try {
    const { problemSummary, optionsList } = req.body;
    if (!Array.isArray(optionsList) || optionsList.length === 0) {
      return res.status(400).json({ error: 'optionsList array is required.' });
    }

    const comparison = await compareScenarios({
      problemSummary: problemSummary || {},
      optionsList
    });

    res.json(comparison);
  } catch (err) {
    console.error('Error in /compare:', err);
    res.status(500).json({ error: 'Failed to compare options', details: err.message });
  }
});

export default router;
