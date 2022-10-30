const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: "",
};

const topupM = (state = initialState, action) => {
  switch (action.type) {
    case "TOP_UP_PENDING": {
      return {
        ...state,
        data: {},
        isLoading: false,
        isError: false,
        message: "",
      };
    }
    case "TOP_UP_FULFILLED": {
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };
    }
    case "TOP_UP_REJECTED": {
      return {
        ...state,
        data: {},
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
      };
    }
    default: {
      return state;
    }
  }
};

export default topupM;
