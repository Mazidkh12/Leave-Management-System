import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Briefcase, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await login(formData);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);

      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      const msg = error.response?.data?.message || "Login Failed";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100/20 z-10 animate-in fade-in zoom-in duration-300">
        {/* Card Header */}
        <div className="p-8 pb-4 text-center">
          <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-2xl mb-3 shadow-inner border border-blue-100">
            <Briefcase className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Leave Flow
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to access your administrative dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                required
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Security badge note */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Protected by JWT & Role-Based Access Security</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign In to Account"
            )}
          </button>

          {/* Register Link */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-4 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Leave Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
