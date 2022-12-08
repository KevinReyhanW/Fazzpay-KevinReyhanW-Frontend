import axiosClient from "../../utils/axios";

export const getHistory = ({ page, limit, filter } = {}) => {
  return {
    type: "HISTORY",
    payload: axiosClient.get(
      `/transaction/history?page=${page}&limit=${limit}&filter=${filter}`
    ),
  };
};
