import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RecruitmentPage from './pages/RecruitmentPage';
import EmployeesPage from './pages/EmployeesPage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import OnboardingPage from './pages/OnboardingPage';
import AttritionPage from './pages/AttritionPage';
import PerformancePage from './pages/PerformancePage';
import SkillGraphPage from './pages/SkillGraphPage';
import InterviewsPage from './pages/InterviewsPage';
import PolicyAssistantPage from './pages/PolicyAssistantPage';
import InsightsPage from './pages/InsightsPage';
import ActionCenterPage from './pages/ActionCenterPage';
import DataSourcesPage from './pages/DataSourcesPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import DecisionTwinPage from './pages/DecisionTwinPage';

export function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Authenticated SaaS Dashboard Layout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/decision-twin" element={<DecisionTwinPage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/attrition" element={<AttritionPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/skills" element={<SkillGraphPage />} />
        <Route path="/interviews" element={<InterviewsPage />} />
        <Route path="/policy-assistant" element={<PolicyAssistantPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/action-center" element={<ActionCenterPage />} />
        <Route path="/data-sources" element={<DataSourcesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
