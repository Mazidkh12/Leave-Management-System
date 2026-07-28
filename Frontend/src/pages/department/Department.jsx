import { useEffect, useState } from "react";
import {
  getDepartments,
  updateDepartment,
  createDepartment,
  deleteDepartment,
} from "../services/departmentService";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import DepartmentForm from "../../components/DepartmentForm";
import EmptyState from "../../components/EmptyState";
import { TableRowSkeleton } from "../../components/SkeletonLoader";
import { toast } from "react-toastify";
import { Plus, Search, Pencil, Trash2, Building2 } from "lucide-react";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (department) => {
    try {
      await createDepartment(department);
      setShowModal(false);
      loadDepartments();
      toast.success("Department added successfully");
    } catch (err) {
      toast.error("Unable to create department");
      console.error(err);
    }
  };

  const handleUpdate = async (department) => {
    try {
      await updateDepartment(selectedDepartment.id, department);
      setShowModal(false);
      setSelectedDepartment(null);
      loadDepartments();
      toast.success("Department updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to update department");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?",
    );

    if (!confirmDelete) return;

    try {
      await deleteDepartment(id);
      loadDepartments();
      toast.success("Department deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete department");
    }
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.departmentName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Departments
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage organizational departments and business units
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedDepartment(null);
              setShowModal(true);
            }}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-blue-600/20 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Department</span>
          </button>
        </div>

        {/* Toolbar: Search Filter */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="text-xs text-slate-400 font-medium self-end sm:self-center">
            Total: {filteredDepartments.length} Department{filteredDepartments.length !== 1 && "s"}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-4 w-20">ID</th>
                  <th className="p-4">Department Name</th>
                  <th className="p-4 text-center w-36">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  <TableRowSkeleton rows={5} cols={3} />
                ) : filteredDepartments.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-4">
                      <EmptyState
                        title="No departments found"
                        description={
                          searchQuery
                            ? `No department matching "${searchQuery}"`
                            : "Create your first department to organize your workforce."
                        }
                        icon={Building2}
                        actionButton={
                          !searchQuery && (
                            <button
                              onClick={() => {
                                setSelectedDepartment(null);
                                setShowModal(true);
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors"
                            >
                              Add Department
                            </button>
                          )
                        }
                      />
                    </td>
                  </tr>
                ) : (
                  filteredDepartments.map((department, idx) => (
                    <tr
                      key={department.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                      }`}
                    >
                      <td className="p-4 font-semibold text-slate-400 text-xs">
                        #{department.id}
                      </td>

                      <td className="p-4 font-semibold text-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <span>{department.departmentName}</span>
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedDepartment(department);
                              setShowModal(true);
                            }}
                            className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                            title="Edit Department"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(department.id)}
                            className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                            title="Delete Department"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Modal */}
        {showModal && (
          <Modal
            isOpen={showModal}
            title={selectedDepartment ? "Edit Department" : "Add Department"}
            onClose={() => {
              setShowModal(false);
              setSelectedDepartment(null);
            }}
          >
            <DepartmentForm
              initialData={selectedDepartment}
              onSubmit={selectedDepartment ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowModal(false);
                setSelectedDepartment(null);
              }}
            />
          </Modal>
        )}
      </div>
    </Layout>
  );
}
