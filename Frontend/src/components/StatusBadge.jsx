import React from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  const normalizedStatus = status ? status.toUpperCase() : "PENDING";

  const config = {
    PENDING: {
      style: "bg-amber-50 text-amber-700 border-amber-200/80",
      icon: Clock,
      label: "Pending",
    },
    APPROVED: {
      style: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      icon: CheckCircle2,
      label: "Approved",
    },
    REJECTED: {
      style: "bg-rose-50 text-rose-700 border-rose-200/80",
      icon: XCircle,
      label: "Rejected",
    },
  };

  const current = config[normalizedStatus] || config.PENDING;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-2xs transition-colors ${current.style}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{current.label}</span>
    </span>
  );
}