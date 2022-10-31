const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: "",
};

const transferM = (state = initialState, action) => {
  switch (action.type) {
    case "TRANSFER_PENDING": {
      return {
        ...state,
        data: {},
        isLoading: false,
        isError: false,
        message: "",
      };
    }
    case "TRANSFER_FULFILLED": {
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };
    }
    case "TRANSFER_REJECTED": {
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

export default transferM;
