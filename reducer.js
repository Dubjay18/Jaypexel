export const initialState = {
  darkmode: true,
  tab: "images",
  nav: false,
};
export const actionTypes = {
  SET_DARKMODE: "SET_DARKMODE",
  SET_TAB: "SET_TAB",
  SET_NAV: "SET_NAV",
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
    case actionTypes.SET_NAV:
      return {
        ...state,
        nav: action.nav,
      };

    default:
      return state;
  }
};

export default reducer;
