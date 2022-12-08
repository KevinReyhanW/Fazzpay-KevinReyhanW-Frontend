const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  message: "",
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DASHBOARD_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_DASHBOARD_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        message: action.payload.data.message,
      };

    case "GET_DASHBOARD_REJECTED":
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

export default dashboard;
