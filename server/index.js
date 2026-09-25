// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import decisionTwinRoutes from './routes/decisionTwinRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Basic security middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

// Rate limiting to protect API quotas
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP to 150 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again in a few minutes.' }
});

app.use('/api/', apiLimiter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'WorkMind - Decision Twin Backend',
    timestamp: new Date().toISOString()
  });
});

// Decision Twin API Routes
app.use('/api/decision-twin', decisionTwinRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message || 'An unexpected error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 WorkMind — Decision Twin Backend listening on :${PORT}`);
  console.log(`🔒 Gemini API Key configured: ${Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here')}`);
  console.log(`🤖 Target Gemini Model: ${process.env.GEMINI_MODEL || 'gemini-1.5-flash'}`);
  console.log(`======================================================\n`);
});
