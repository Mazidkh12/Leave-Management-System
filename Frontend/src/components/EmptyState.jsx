import React from "react";
import { FolderOpen } from "lucide-react";

export default function EmptyState({
  title = "No Data Found",
  description = "There are no records available to display at the moment.",
  icon: Icon = FolderOpen,
  actionButton = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm my-4">
      <div className="p-4 bg-slate-50 text-slate-400 rounded-full mb-4 border border-slate-100">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
}
