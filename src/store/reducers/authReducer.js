const initialState = {
  user: null,
  address: [],
  clientSecret: null,
  selectedUserCheckoutAddress: null,
  sellers: null,
  customers: null,
  pagination: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "USER_ADDRESS":
      return { ...state, address: action.payload };
    case "SELECT_CHECKOUT_ADDRESS":
      return { ...state, selectedUserCheckoutAddress: action.payload };
    case "REMOVE_CHECKOUT_ADDRESS":
      return { ...state, selectedUserCheckoutAddress: null };
    case "CLIENT_SECRET":
      return { ...state, clientSecret: action.payload };
    case "REMOVE_CLIENT_SECRET_ADDRESS":
      return {
        ...state,
        clientSecret: null,
        selectedUserCheckoutAddress: null,
      };
    case "LOG_OUT":
      return { user: null, address: null };
    case "FETCH_SELLERS":
      return {
        ...state,
        sellers: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };
    case "FETCH_CUSTOMERS": // ADD THIS
      return {
        ...state,
        customers: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };
    default:
      return state;
  }
};
