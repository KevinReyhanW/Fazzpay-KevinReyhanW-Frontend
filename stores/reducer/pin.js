const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: "",
};

const pinC = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PIN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };

    case "CREATE_PIN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };

    case "CREATE_PIN_REJECTED":
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: action.payload.response.data.message,
      };
    default: {
      return state;
    }
  }
};

export default pinC;
