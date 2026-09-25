import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Brain,
  Briefcase,
  AlertTriangle,
  Network,
  ArrowRight,
  TrendingUp,
  Activity,
  UserPlus,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import StatCard from '../components/common/StatCard';
import AiReasoningCard from '../components/common/AiReasoningCard';
import Badge from '../components/common/Badge';
import {
  kpis,
  headcountTrendData,
  departmentDistribution,
  attritionByDepartment,
  priorityAlerts,
  recentActivities
} from '../data/mockData';

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workforce Intelligence Core</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Good morning, HR Manager 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here's your workforce intelligence overview across 6 connected HR systems.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/action-center')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 shadow-soft-sm hover:shadow-soft-md hover:bg-slate-50 transition-all"
          >
            <span>Action Center (5)</span>
          </button>
          <button
            onClick={() => navigate('/insights')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore All AI Insights</span>
          </button>
        </div>
      </div>

      {/* Featured Hackathon Innovation: WorkMind Decision Twin */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-navy-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border border-indigo-900/60">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-600/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-brand-400" />
                Featured Innovation • Google Gemini Engine
              </span>
              <span className="text-[10px] text-slate-400">Advisory Scenario Simulator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              WorkMind — Decision Twin
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Stress-test critical workplace dilemmas before enacting policy changes. Simulate short-term vs. long-term trajectories, qualitative impact scales, unintended hazards, and "What If?" counter-factuals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={() => navigate('/decision-twin')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-500 hover:from-brand-600 hover:to-indigo-600 text-white text-xs font-extrabold shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.02]"
            >
              <Brain className="w-4 h-4" />
              <span>Launch Decision Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Top KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={kpis.totalEmployees.value.toLocaleString()}
          change={kpis.totalEmployees.change}
          period={kpis.totalEmployees.period}
          trend={kpis.totalEmployees.trend}
          icon={Users}
          badgeColor="indigo"
          onClick={() => navigate('/employees')}
        />
        <StatCard
          title="Open Positions"
          value={kpis.openPositions.value}
          change={kpis.openPositions.change}
          period={kpis.openPositions.period}
          trend={kpis.openPositions.trend}
          icon={Briefcase}
          badgeColor="sky"
          onClick={() => navigate('/recruitment')}
        />
        <StatCard
          title="High Attrition Risk"
          value={kpis.highAttritionRisk.value}
          change={kpis.highAttritionRisk.change}
          period={kpis.highAttritionRisk.period}
          trend={kpis.highAttritionRisk.trend}
          icon={AlertTriangle}
          badgeColor="rose"
          onClick={() => navigate('/attrition')}
        />
        <StatCard
          title="Skill Gaps Detected"
          value={kpis.skillGapsDetected.value}
          change={kpis.skillGapsDetected.change}
          period={kpis.skillGapsDetected.period}
          trend={kpis.skillGapsDetected.trend}
          icon={Network}
          badgeColor="amber"
          onClick={() => navigate('/skills')}
        />
      </div>

      {/* AI Workforce Insights (Data -> Reasoning -> Recommendation) */}
      <AiReasoningCard
        title="AI Workforce Insight: Engineering Attrition Surge"
        subtitle="AI detected a 17% increase in attrition risk within the Engineering department over the past 60 days."
        confidence="96%"
        category="Predictive Workforce Risk"
        evidence={[
          { source: 'Kronos Logs', data: 'Weekly sprint overtime increased +21% across 14 platform squads.' },
          { source: 'Glint Pulse', data: 'Engineering engagement dropped from 81% to 72% in Q2.' },
          { source: 'CultureAmp OKRs', data: '14 senior engineers unpromoted for >24 consecutive months.' },
          { source: 'Market Data', data: 'External job market demand for Senior Java & Cloud engineers up 28% in Bangalore.' }
        ]}
        reasoning="Sustained high workload spikes paired with compensation lag against surging external market demand are creating critical resignation vulnerability among senior platform engineers within 60 days."
        recommendedActions={[
          'Conduct structured 1-on-1 engagement check-ins with 12 flagged engineers.',
          'Review platform sprint workload distribution to cap non-critical ticket velocity.',
          'Fast-track promotion calibration and benchmark salary adjustments for Senior SWE band.'
        ]}
        actionLabel="View Detailed Attrition Analysis"
        onAction={() => navigate('/attrition')}
      />

      {/* Workforce Overview Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Headcount Growth & Hiring Trends */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Workforce Headcount & Hiring Velocity</h2>
              <p className="text-xs text-slate-500">Net monthly headcount vs new hires</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-600"></span> Total Headcount
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> New Hires
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={headcountTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="headcountGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={['dataMin - 50', 'dataMax + 20']} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B132B', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="headcount" stroke="#4F46E5" strokeWidth={2.5} fillOpacity={1} fill="url(#headcountGrad)" name="Total Headcount" />
                <Area type="monotone" dataKey="hires" stroke="#10B981" strokeWidth={2} fillOpacity={0} name="New Hires" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Department Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-slate-900">Department Distribution</h2>
              <span className="text-xs text-slate-500">6 Depts</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">Total 1,248 Full-Time Employees</p>

            <div className="h-52 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentDistribution}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {departmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0B132B', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-slate-900">1,248</span>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Staff</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            {departmentDistribution.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
                <span className="text-slate-600 truncate">{d.name}</span>
                <span className="text-slate-900 font-bold ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Alerts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Priority Workforce Alerts</h2>
            <p className="text-xs text-slate-500">Automated risk signals requiring human HR evaluation</p>
          </div>
          <button
            onClick={() => navigate('/action-center')}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All in Action Center</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {priorityAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    {alert.category}
                  </span>
                  <Badge variant={alert.priority === 'High' ? 'danger' : 'info'} size="sm">
                    {alert.priority}
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {alert.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {alert.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => navigate(alert.link)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200/60 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{alert.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Recent Activities & Attrition Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attrition Risk by Department mini-bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Attrition Risk by Department</h2>
              <p className="text-xs text-slate-500">Identified risk concentration</p>
            </div>
            <button
              onClick={() => navigate('/attrition')}
              className="text-xs text-brand-600 font-semibold hover:underline"
            >
              Details
            </button>
          </div>

          <div className="space-y-3.5">
            {attritionByDepartment.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.department}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-600 font-bold">{item.highRisk} High</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{item.mediumRisk} Med</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                  <div
                    className="bg-rose-500 h-full"
                    style={{ width: `${(item.highRisk / 56) * 100}%` }}
                    title={`${item.highRisk} high risk`}
                  />
                  <div
                    className="bg-amber-400 h-full"
                    style={{ width: `${(item.mediumRisk / 56) * 100}%` }}
                    title={`${item.mediumRisk} medium risk`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live HR Activity Stream */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent HR Activity Stream</h2>
              <p className="text-xs text-slate-500">Cross-system automated & human decision audit log</p>
            </div>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivities.map((act) => (
              <div key={act.id} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
                <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                  act.type === 'risk' ? 'bg-rose-50 text-rose-600' :
                  act.type === 'recruitment' ? 'bg-indigo-50 text-indigo-600' :
                  act.type === 'onboarding' ? 'bg-sky-50 text-sky-600' :
                  act.type === 'skills' ? 'bg-amber-50 text-amber-600' :
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900 truncate">{act.action}</p>
                    <span className="text-[10px] text-slate-400 shrink-0">{act.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">{act.detail}</p>
                  <span className="text-[10px] text-slate-400 font-medium mt-1 block">Actor: {act.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
