export const initialState = {
  darkmode: true,
  tab: "images",
};
export const actionTypes = {
  SET_DARKMODE: "SET_DARKMODE",
  SET_TAB: "SET_TAB",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DARKMODE:
      return {
        ...state,
        darkmode: action.darkmode,
      };
    case actionTypes.SET_TAB:
      return {
        ...state,
        tab: action.tab,
      };

    default:
      return state;
  }
};

export default reducer;
