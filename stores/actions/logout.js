import axiosClient from "utils/axios";

export const logout = () => {
  return {
    type: "LOGOUT",
    payload: axiosClient.post("/auth/logout"),
  };
};
