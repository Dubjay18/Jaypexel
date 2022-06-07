export const initialState = {
  darkmode: true,
  tab: "images",
  nav: false,
  page: 1,
};
export const actionTypes = {
  SET_DARKMODE: "SET_DARKMODE",
  SET_TAB: "SET_TAB",
  SET_NAV: "SET_NAV",
  SET_PAGE: "SET_PAGE",
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
    case actionTypes.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
};

export default reducer;
