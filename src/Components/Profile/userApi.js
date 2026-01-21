import axiosInstance from "../Form/axiosInstance";

export const getUserProfile = async () => {
  const res = await axiosInstance.get("/user");
  return res.data;
};
