let initialState = {
  types: [],
};

export const typesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };

    default:
      return state;
  }
};
