import { useEffect, useState } from "react";
import { getDepartments } from "../pages/services/departmentService";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  Building2,
} from "lucide-react";

export default function EmployeeForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    joiningDate: "",
    departmentId: "",
  });

  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    if (initialData) {
      const formattedDate = initialData.joiningDate
        ? String(initialData.joiningDate).split("T")[0]
        : "";

      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        password: "",
        phone: initialData.phone || "",
        joiningDate: formattedDate,
        departmentId: initialData.departmentId ? String(initialData.departmentId) : "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        joiningDate: "",
        departmentId: "",
      });
    }
    setError("");
  }, [initialData]);

  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load departments:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.joiningDate ||
      !formData.departmentId ||
      (!initialData && !formData.password)
    ) {
      setError("Please fill all required fields");
      return;
    }

    const payload = {
      ...formData,
      departmentId: Number(formData.departmentId),
    };

    // While editing, don't send empty or whitespace password
    if (initialData && (!payload.password || payload.password.trim() === "")) {
      delete payload.password;
    }

    console.log("Submitting employee payload:", payload);
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Grid for Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            First Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Email & Password */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {!initialData ? (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Password <span className="text-slate-400 font-normal">(Leave blank to keep unchanged)</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                name="password"
                placeholder="New password (optional)"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        )}
      </div>

      {/* Phone & Joining Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              name="phone"
              placeholder="+1 234 567 890"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Joining Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Department Dropdown */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Department <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Building2 className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all appearance-none"
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.departmentName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
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
          {initialData ? "Update Employee" : "Save Employee"}
        </button>
      </div>
    </form>
  );
}
