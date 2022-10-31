import axiosClient from "utils/axios";

export const createPin = (userId, data) => {
  return {
    type: "CREATE_PIN",
    payload: axiosClient.patch(`/user/pin/${userId}`, data),
  };
};

export const checkPin = (pin) => {
  return {
    type: "CHECK_PIN",
    payload: axiosClient.get(`/user/pin/${pin}`),
  };
};
