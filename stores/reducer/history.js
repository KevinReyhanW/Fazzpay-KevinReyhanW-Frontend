const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  message: "",
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case "HISTORY_PENDING":
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case "HISTORY_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        message: action.payload.data.message,
      };

    case "HISTORY_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        message: action.payload.response.data,
      };

    default:
      return state;
  }
};

export default history;
