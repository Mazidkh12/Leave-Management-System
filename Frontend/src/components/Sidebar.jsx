import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  CalendarDays,
  X,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Departments", path: "/departments", icon: Building2 },
    { name: "Employees", path: "/employees", icon: Users },
    { name: "Leaves", path: "/leaves", icon: CalendarDays },
  ];

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        aria-label="Sidebar Navigation"
        className={`fixed lg:relative top-0 left-0 bottom-0 z-50 bg-slate-950 text-slate-100 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800/80 shadow-2xl lg:shadow-none shrink-0 ${
          // Mobile overlay positioning
          isMobileOpen
            ? "translate-x-0 w-[260px]"
            : "-translate-x-full lg:translate-x-0"
        } ${
          // Desktop / Tablet push content widths: 260px or 72px
          isCollapsed ? "lg:w-[72px]" : "lg:w-[260px]"
        }`}
      >
        {/* Floating Desktop Collapse/Expand Button */}
        <button
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden lg:flex absolute -right-3.5 top-6 z-50 items-center justify-center w-7 h-7 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 shadow-md shadow-black/50 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/60 bg-slate-950 shrink-0">
          <div
            className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${
              isCollapsed ? "lg:justify-center lg:w-full lg:px-0" : ""
            }`}
          >
            {/* Logo Badge */}
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-xl shadow-md shadow-blue-500/20 shrink-0 border border-blue-400/20">
              <Briefcase className="w-5 h-5" />
            </div>

            {/* Brand Title (hidden when collapsed on desktop) */}
            <div
              className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                isCollapsed ? "lg:hidden" : "block"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold tracking-tight text-white">
                  Leave MS
                </h1>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/20 text-blue-400 border border-blue-400/30 uppercase tracking-widest">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                Enterprise Dashboard
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items Container */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
          {/* Category Header Label */}
          <div
            className={`px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 transition-all duration-300 ${
              isCollapsed ? "lg:text-center lg:px-0" : ""
            }`}
          >
            {isCollapsed ? (
              <span className="hidden lg:block text-slate-500">•</span>
            ) : (
              <span>Main Workspace</span>
            )}
          </div>

          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = location.pathname === menu.path;

            return (
              <div key={menu.path} className="relative group">
                <Link
                  to={menu.path}
                  onClick={onCloseMobile}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                    isCollapsed ? "lg:justify-center lg:px-0 lg:w-11 lg:mx-auto" : ""
                  } ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/20 font-semibold"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 hover:border-slate-800 border border-transparent hover:translate-x-0.5"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-slate-200 group-hover:scale-105"
                    }`}
                  />

                  {/* Menu Label (hidden when collapsed) */}
                  <span
                    className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                      isCollapsed ? "lg:hidden" : "block"
                    }`}
                  >
                    {menu.name}
                  </span>
                </Link>

                {/* Hover Tooltip Popup for Collapsed Mode */}
                {isCollapsed && (
                  <div
                    role="tooltip"
                    className="hidden lg:block absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 border border-slate-800 text-white text-xs font-semibold rounded-lg shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50"
                  >
                    {menu.name}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Minimal Info Card */}
        <div className="p-3 border-t border-slate-800/60 bg-slate-950/60 shrink-0">
          <div
            className={`bg-slate-900/60 rounded-xl p-3 border border-slate-800/60 transition-all duration-300 ${
              isCollapsed ? "lg:p-2 lg:text-center lg:justify-center" : ""
            }`}
          >
            {isCollapsed ? (
              <div className="hidden lg:flex items-center justify-center text-slate-400" title="Leave Flow Enterprise v1.0">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-200 font-semibold">
                    Leave Flow
                  </p>
                  <p className="text-[10px] text-slate-400">v1.0 • Enterprise</p>
                </div>
                <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}