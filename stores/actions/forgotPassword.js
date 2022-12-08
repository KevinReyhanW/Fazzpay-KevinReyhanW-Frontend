import axiosClient from "utils/axios";

export const forgotPassword = (data) => {
  return {
    type: "FORGOT_PASSWORD",
    payload: axiosClient.post("/auth/forgot-password", data),
  };
};
