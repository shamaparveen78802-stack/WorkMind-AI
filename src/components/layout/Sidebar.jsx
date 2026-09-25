import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Brain,
  UserPlus,
  Users,
  UserCheck,
  AlertTriangle,
  Award,
  Network,
  Bot,
  BookOpen,
  LineChart,
  Zap,
  Database,
  FileText,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Decision Twin', path: '/decision-twin', icon: Brain, badge: 'GEMINI', highlight: true },
    { name: 'Recruitment', path: '/recruitment', icon: UserPlus, badge: '8' },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Onboarding', path: '/onboarding', icon: UserCheck, badge: '4' },
    { name: 'Attrition Risk', path: '/attrition', icon: AlertTriangle, badge: '47', alert: true },
    { name: 'Performance', path: '/performance', icon: Award },
    { name: 'Skill Graph', path: '/skills', icon: Network, badge: '18' },
    { name: 'AI Interviews', path: '/interviews', icon: Bot },
    { name: 'Policy Assistant', path: '/policy-assistant', icon: BookOpen },
    { name: 'Workforce Insights', path: '/insights', icon: LineChart },
    { name: 'AI Action Center', path: '/action-center', icon: Zap, badge: '5', action: true },
    { name: 'Data Sources', path: '/data-sources', icon: Database },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-navy-900 text-slate-300 flex flex-col border-r border-slate-800 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-navy-950/60">
          <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-brand-600/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                  WorkMind <span className="text-brand-400">AI</span>
                </span>
                <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Workforce Intelligence</p>
              </div>
            )}
          </NavLink>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`
              }
              title={collapsed ? item.name : undefined}
            >
              <item.icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110`} />
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span>{item.name}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                        item.highlight
                          ? 'bg-gradient-to-r from-brand-500 to-indigo-500 text-white shadow-sm'
                          : item.alert
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : item.action
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* User Footer Profile */}
        <div className="p-3 border-t border-slate-800/80 bg-navy-950/80">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/50">
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                HA
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-navy-950"></span>
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white truncate">HR Admin</p>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">HR Manager</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
