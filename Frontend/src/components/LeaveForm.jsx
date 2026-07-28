import { useState } from "react";
import { Calendar, FileText, Tag } from "lucide-react";

export default function LeaveForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    leaveType: "CASUAL",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate || !formData.reason) {
      setError("Please fill all required fields");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Leave Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Leave Type <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Tag className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all appearance-none"
          >
            <option value="CASUAL font-medium">Casual Leave</option>
            <option value="SICK">Sick Leave</option>
            <option value="EARNED">Earned Leave</option>
          </select>
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Start Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            End Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Reason */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Reason for Leave <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <textarea
            name="reason"
            rows="3"
            placeholder="Please provide details for your leave request..."
            value={formData.reason}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all resize-none"
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
          Submit Request
        </button>
      </div>
    </form>
  );
}