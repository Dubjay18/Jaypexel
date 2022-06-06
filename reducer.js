export const initialState = {
  darkmode: true,
};
export const actionTypes = {
  SET_DARKMODE: "SET_DARKMODE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DARKMODE:
      return {
        ...state,
        darkmode: action.darkmode,
      };

    default:
      return state;
  }
};

export default reducer;
