import axiosClient from "../../utils/axios";

export const register = (data) => {
  return {
    type: "SIGNUP",
    payload: axiosClient.post("/auth/register", data),
  };
};
