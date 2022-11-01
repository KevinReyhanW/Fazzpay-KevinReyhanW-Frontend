import axiosClient from "../../utils/axios";

export const getDataUserById = (id) => {
  return {
    type: "GET_DATA_USER_BY_ID",
    payload: axiosClient.get(`/user/profile/${id}`),
  };
};
//GETDATAUSERLOGIN
//DI REDUCER BEDAIN JUGA
