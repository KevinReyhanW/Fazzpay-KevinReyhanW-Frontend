const initialState = {
  data: {},
  allData: {},
  pageInfo: {},
  isLoading: false,
  isError: false,
  message: "",
};
//bagian datanya juga dipisahkan
//contoh : datalogin: action.payload.data.data
//UNTUK YANG BAGIAN PIN, GUNAKAN YANG KEMARIN DAN GUNAKAN ALL PIN SEBAGAI INPUT ID NYA
const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_USER_BY_ID_PENDING":
      return {
        ...state,
        data: {},
        isLoading: true,
        isError: false,
        message: "",
      };

    case "GET_DATA_USER_BY_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        message: action.payload.data.message,
      };

    case "GET_DATA_USER_BY_ID_REJECTED":
      return {
        ...state,
        data: {},
        isLoading: false,
        isError: true,
        message: action.payload.response.data,
      };
    default: {
      return state;
    }
  }
};

export default user;
