import api from "../../api/axios";

// Employee
export const applyLeave = async (leaveData) => {
  const response = await api.post("/leaves", leaveData);
  return response.data;
};

export const getMyLeaves = async () => {
  const response = await api.get("/leaves/my");
  return response.data;
};

export const cancelLeave = async (id) => {
  const response = await api.delete(`/leaves/${id}`);
  return response.data;
};

// Admin
export const getAllLeaves = async () => {
  const response = await api.get("/leaves");
  return response.data;
};

export const approveLeave = async (id) => {
  const response = await api.put(`/leaves/${id}/approve`);
  return response.data;
};

export const rejectLeave = async (id) => {
  const response = await api.put(`/leaves/${id}/reject`);
  return response.data;
};