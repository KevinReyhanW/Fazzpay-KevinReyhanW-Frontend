import axiosClient from "utils/axios";

export const transfer = (data) => {
  return {
    type: "TRANSFER",
    payload: axiosClient.post("/transaction/transfer", data),
  };
};
