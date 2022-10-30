import axiosClient from "utils/axios";

export const topup = (data) => {
  return {
    type: "TOPUP",
    payload: axiosClient.post("/transaction/top-up", data),
  };
};
