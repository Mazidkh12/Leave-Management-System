import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";
import Layout from "../../components/Layout";
import { CardSkeleton } from "../../components/SkeletonLoader";
import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalLeaves: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });

  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role") || "USER";

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Employees",
      value: summary.totalEmployees,
      icon: Users,
      color: "bg-blue-500",
      lightBg: "bg-blue-50 text-blue-600 border-blue-100",
      link: "/employees",
      description: "Active workforce count",
    },
    {
      title: "Departments",
      value: summary.totalDepartments,
      icon: Building2,
      color: "bg-indigo-500",
      lightBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
      link: "/departments",
      description: "Organizational units",
    },
    {
      title: "Total Leave Requests",
      value: summary.totalLeaves,
      icon: CalendarDays,
      color: "bg-purple-500",
      lightBg: "bg-purple-50 text-purple-600 border-purple-100",
      link: "/leaves",
      description: "All submitted applications",
    },
    {
      title: "Pending Leaves",
      value: summary.pendingLeaves,
      icon: Clock,
      color: "bg-amber-500",
      lightBg: "bg-amber-50 text-amber-600 border-amber-100",
      link: "/leaves",
      description: "Awaiting approval action",
    },
    {
      title: "Approved Leaves",
      value: summary.approvedLeaves,
      icon: CheckCircle2,
      color: "bg-emerald-500",
      lightBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      link: "/leaves",
      description: "Granted time off",
    },
    {
      title: "Rejected Leaves",
      value: summary.rejectedLeaves,
      icon: XCircle,
      color: "bg-rose-500",
      lightBg: "bg-rose-50 text-rose-600 border-rose-100",
      link: "/leaves",
      description: "Declined applications",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>System Overview • {role} Panel</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {role === "ADMIN" ? "Administrator" : "Employee"}! 👋
              </h1>
              <p className="text-slate-300 text-sm max-w-xl">
                Here is what’s happening in your organization today. Monitor leave requests, departmental breakdown, and workforce metrics at a glance.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/leaves"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-600/30 flex items-center gap-2"
              >
                <span>Manage Leaves</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Key Metrics & Performance
            </h2>
            <p className="text-xs text-slate-500">
              Live statistics updated in real-time
            </p>
          </div>
        </div>

        {/* Statistic Cards Grid */}
        {loading ? (
          <CardSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {statCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {card.title}
                      </p>
                      <h3 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                        {card.value}
                      </h3>
                    </div>
                    <div className={`p-3 rounded-2xl border ${card.lightBg} shadow-2xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">{card.description}</span>
                    <Link
                      to={card.link}
                      className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      View
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Overview Banner Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800">
                Quick Navigation & Workflows
              </h4>
              <p className="text-xs text-slate-500">
                Easily navigate between departments, employee directories, and leave management tables.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              to="/departments"
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors"
            >
              Departments
            </Link>
            <Link
              to="/employees"
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors"
            >
              Employees
            </Link>
            <Link
              to="/leaves"
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-medium text-xs transition-colors hover:bg-slate-800"
            >
              Leaves
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}