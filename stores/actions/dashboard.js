import axiosClient from "../../utils/axios";

export const dashboard = (id) => {
  return {
    type: "GET_DASHBOARD",
    payload: axiosClient.get(`/dashboard/${id}`),
  };
};
