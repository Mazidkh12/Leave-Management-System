import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, LogOut, PanelLeftClose, PanelLeft } from "lucide-react";

export default function Navbar({ onToggleSidebar, isCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role") || "USER";

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/departments":
        return "Department Management";
      case "/employees":
        return "Employee Management";
      case "/leaves":
        return "Leave Requests";
      default:
        return "Leave System";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 shadow-xs px-4 sm:px-6 flex justify-between items-center sticky top-0 z-30">
      {/* Left side: Sidebar Toggle Button + Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          aria-label="Toggle sidebar menu"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeft className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5 hidden lg:block" />
          )}
          <Menu className="w-5 h-5 block lg:hidden" />
        </button>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
            {getPageTitle()}
          </h2>
          <p className="hidden sm:block text-xs text-slate-500 font-medium">
            Welcome back to your workspace
          </p>
        </div>
      </div>

      {/* Right side: User Profile Badge & Logout button */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* User Pill */}
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/70">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {role.charAt(0)}
          </div>
          <div className="text-left">
            <span className="block text-xs font-semibold text-slate-700 leading-tight">
              {role === "ADMIN" ? "Administrator" : "Employee"}
            </span>
            <span className="inline-block text-[10px] font-bold text-blue-600 tracking-wider">
              {role}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          aria-label="Logout"
          className="flex items-center gap-2 bg-slate-900 hover:bg-rose-600 text-white text-xs font-medium px-3.5 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-rose-500/30 group"
        >
          <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}