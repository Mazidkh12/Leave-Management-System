import React from "react";

export function CardSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-pulse space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-10 w-10 bg-slate-200 rounded-xl"></div>
          </div>
          <div className="h-8 bg-slate-200 rounded w-1/3 mt-3"></div>
          <div className="h-3 bg-slate-100 rounded w-2/3 pt-2"></div>
        </div>
      ))}
    </div>
  );
}

export function TableRowSkeleton({ rows = 5, cols = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={rIdx} className="border-b border-slate-100 animate-pulse">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <td key={cIdx} className="p-4">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function SkeletonLoader({ type = "card" }) {
  if (type === "table") {
    return <TableRowSkeleton />;
  }
  return <CardSkeleton />;
}
