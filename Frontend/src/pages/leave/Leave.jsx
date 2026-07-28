import { useEffect, useState } from "react";
import {
  getMyLeaves,
  getAllLeaves,
  applyLeave,
  cancelLeave,
  approveLeave,
  rejectLeave,
} from "../services/leaveService";
import Modal from "../../components/Modal";
import LeaveForm from "../../components/LeaveForm";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import { TableRowSkeleton } from "../../components/SkeletonLoader";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import {
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Ban,
  CalendarDays,
  Calendar,
  User,
  Filter,
} from "lucide-react";

export default function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      setLoading(true);
      const data =
        role === "ADMIN" ? await getAllLeaves() : await getMyLeaves();
      setLeaves(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load leave requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (formData) => {
    try {
      await applyLeave(formData);
      toast.success("Leave applied successfully");
      setOpenModal(false);
      loadLeaves();
    } catch (err) {
      console.error(err);
      toast.error("Unable to apply leave");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this leave request?")) return;

    try {
      await cancelLeave(id);
      toast.success("Leave cancelled");
      loadLeaves();
    } catch (err) {
      console.error(err);
      toast.error("Unable to cancel leave");
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      toast.success("Leave approved");
      loadLeaves();
    } catch (err) {
      console.error(err);
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      toast.success("Leave rejected");
      loadLeaves();
    } catch (err) {
      console.error(err);
      toast.error("Rejection failed");
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch =
      leave.employeeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.reason?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.leaveType?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || leave.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Leave Requests
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {role === "ADMIN"
                ? "Review, approve, or reject employee leave applications"
                : "Submit new leave requests and track your application status"}
            </p>
          </div>

          {role === "EMPLOYEE" && (
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-blue-600/20 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Apply Leave</span>
            </button>
          )}
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search employee, type, or reason..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
            {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  statusFilter === status
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-4">Employee</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Start Date</th>
                  <th className="p-4">End Date</th>
                  <th className="p-4">Reason</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Applied On</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  <TableRowSkeleton rows={5} cols={8} />
                ) : filteredLeaves.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-4">
                      <EmptyState
                        title="No leave requests found"
                        description={
                          searchQuery || statusFilter !== "ALL"
                            ? "No applications matching your filter criteria."
                            : role === "EMPLOYEE"
                            ? "You haven't submitted any leave requests yet."
                            : "There are currently no leave requests in the system."
                        }
                        icon={CalendarDays}
                        actionButton={
                          role === "EMPLOYEE" && !searchQuery && statusFilter === "ALL" ? (
                            <button
                              onClick={() => setOpenModal(true)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors"
                            >
                              Apply Leave
                            </button>
                          ) : null
                        }
                      />
                    </td>
                  </tr>
                ) : (
                  filteredLeaves.map((leave, idx) => (
                    <tr
                      key={leave.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                      }`}
                    >
                      {/* Employee Name */}
                      <td className="p-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span>{leave.employeeName}</span>
                        </div>
                      </td>

                      {/* Leave Type */}
                      <td className="p-4">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                          {leave.leaveType
                            ? leave.leaveType.charAt(0) +
                              leave.leaveType.slice(1).toLowerCase()
                            : "Casual"}
                        </span>
                      </td>

                      {/* Start Date */}
                      <td className="p-4 text-xs text-slate-600 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formatDate(leave.startDate)}</span>
                        </div>
                      </td>

                      {/* End Date */}
                      <td className="p-4 text-xs text-slate-600 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formatDate(leave.endDate)}</span>
                        </div>
                      </td>

                      {/* Reason */}
                      <td className="p-4 text-xs text-slate-600 max-w-xs truncate" title={leave.reason}>
                        {leave.reason}
                      </td>

                      {/* Status Badge */}
                      <td className="p-4 whitespace-nowrap">
                        <StatusBadge status={leave.status} />
                      </td>

                      {/* Applied Date */}
                      <td className="p-4 text-xs text-slate-400 whitespace-nowrap">
                        {formatDate(leave.appliedDate)}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center whitespace-nowrap">
                        {role === "ADMIN" ? (
                          leave.status === "PENDING" ? (
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleApprove(leave.id)}
                                className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>

                              <button
                                onClick={() => handleReject(leave.id)}
                                className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Reject</span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs font-medium">—</span>
                          )
                        ) : leave.status === "PENDING" ? (
                          <button
                            onClick={() => handleCancel(leave.id)}
                            className="flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs font-medium">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={openModal}
          title="Apply for Leave"
          onClose={() => setOpenModal(false)}
        >
          <LeaveForm
            onSubmit={handleApply}
            onCancel={() => setOpenModal(false)}
          />
        </Modal>
      </div>
    </Layout>
  );
}
