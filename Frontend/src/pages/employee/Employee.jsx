import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import Modal from "../../components/Modal";
import EmployeeForm from "../../components/EmployeeForm";
import EmptyState from "../../components/EmptyState";
import { TableRowSkeleton } from "../../components/SkeletonLoader";
import { toast } from "react-toastify";
import { Plus, Search, Pencil, Trash2, Users, Mail, Phone, Building2, Shield } from "lucide-react";

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      console.log("Employees loaded:", data);
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading employees:", error);
      toast.error("Failed to load employee data");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (employeeData) => {
    try {
      if (selectedEmployee) {
        await updateEmployee(selectedEmployee.id, employeeData);
        toast.success("Employee updated successfully");
      } else {
        await createEmployee(employeeData);
        toast.success("Employee added successfully");
      }

      setIsModalOpen(false);
      setSelectedEmployee(null);
      loadEmployees();
    } catch (error) {
      console.error("Full Error:", error);
      toast.error(
        typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : JSON.stringify(error.response?.data?.message || "Operation failed"),
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) return;

    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully");
      loadEmployees();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const filteredEmployees = (Array.isArray(employees) ? employees : []).filter((emp) => {
    const fullName = `${emp.firstName || ""} ${emp.lastName || ""}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      fullName.includes(query) ||
      emp.email?.toLowerCase().includes(query) ||
      emp.phone?.includes(query) ||
      emp.departmentName?.toLowerCase().includes(query) ||
      (emp.role && String(emp.role).toLowerCase().includes(query))
    );
  });

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Employees
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Manage team members, contact details, and department allocations
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedEmployee(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-blue-600/20 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, department, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="text-xs text-slate-400 font-medium self-end sm:self-center">
            Total: {filteredEmployees.length} Employee{filteredEmployees.length !== 1 && "s"}
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-4 w-16">ID</th>
                  <th className="p-4">Employee</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Department</th>
                  <th className="p-4 text-center w-36">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  <TableRowSkeleton rows={5} cols={7} />
                ) : filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-4">
                      <EmptyState
                        title="No employees found"
                        description={
                          searchQuery
                            ? `No employee matching "${searchQuery}"`
                            : "Get started by adding your first team member."
                        }
                        icon={Users}
                        actionButton={
                          !searchQuery && (
                            <button
                              onClick={() => {
                                setSelectedEmployee(null);
                                setIsModalOpen(true);
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors"
                            >
                              Add Employee
                            </button>
                          )
                        }
                      />
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee, idx) => {
                    const initials = `${employee.firstName?.[0] || ""}${
                      employee.lastName?.[0] || ""
                    }`.toUpperCase();

                    return (
                      <tr
                        key={employee.id}
                        className={`hover:bg-slate-50/70 transition-colors ${
                          idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                        }`}
                      >
                        <td className="p-4 font-semibold text-slate-400 text-xs">
                          #{employee.id}
                        </td>

                        <td className="p-4 font-medium text-slate-800">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                              {initials || "E"}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900">
                                {employee.firstName} {employee.lastName}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 text-slate-600 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>{employee.email}</span>
                          </div>
                        </td>

                        <td className="p-4 text-slate-600 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{employee.phone}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                            <Shield className="w-3 h-3 text-indigo-500" />
                            {employee.role || "EMPLOYEE"}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                            <Building2 className="w-3 h-3 text-blue-500" />
                            {employee.departmentName || "Unassigned"}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setIsModalOpen(true);
                              }}
                              className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                              title="Edit Employee"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDelete(employee.id)}
                              className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                              title="Delete Employee"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedEmployee(null);
            }}
            title={selectedEmployee ? "Edit Employee" : "Add Employee"}
          >
            <EmployeeForm
              initialData={selectedEmployee}
              onSubmit={handleSave}
              onCancel={() => {
                setIsModalOpen(false);
                setSelectedEmployee(null);
              }}
            />
          </Modal>
        )}
      </div>
    </Layout>
  );
}
