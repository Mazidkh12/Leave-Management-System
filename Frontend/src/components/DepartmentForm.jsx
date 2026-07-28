import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";

export default function DepartmentForm({ initialData, onSubmit, onCancel }) {
  const [departmentName, setDepartmentName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setDepartmentName(initialData.departmentName || "");
    } else {
      setDepartmentName("");
    }
    setError("");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!departmentName.trim()) {
      setError("Department name is required");
      return;
    }

    setError("");
    onSubmit({
      departmentName: departmentName.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Department Name <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Building2 className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => {
              setDepartmentName(e.target.value);
              if (error) setError("");
            }}
            className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
              error ? "border-rose-300 bg-rose-50/20" : "border-slate-200"
            } rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all`}
            placeholder="e.g. Engineering, Human Resources"
          />
        </div>
        {error && <p className="mt-1.5 text-xs font-medium text-rose-500">{error}</p>}
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium text-sm transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-medium text-sm shadow-md shadow-blue-600/20 transition-all"
        >
          {initialData ? "Update Department" : "Save Department"}
        </button>
      </div>
    </form>
  );
}