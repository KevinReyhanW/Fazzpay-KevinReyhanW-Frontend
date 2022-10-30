import axiosClient from "utils/axios";

export const createPin = (userId, data) => {
  return {
    type: "CREATE_PIN",
    payload: axiosClient.patch(`/user/pin/${userId}`, data),
  };
};
