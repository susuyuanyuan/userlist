const compareValue = (order, a, b) => {
  if (a === b) {
    return 0;
  }
  return a < b ? order : -1 * order;
};

const usersReducer = (
  state = { isLoading: false, error: "", displayData: [], originalData: [] },
  action
) => {
  switch (action.type) {
    case "USER_FETCH_START":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_FETCH_SUCCESS":
      console.log(action);
      return {
        ...state,
        isLoading: false,
        originalData: action.users,
        displayData: action.users,
      };
    case "USER_FETCH_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "SEARCH":
      return {
        ...state,
        displayData: state.originalData.filter(function (user) {
          return (
            user.firstName.search(action.keywords) > -1 ||
            user.lastName.search(action.keywords) > -1
          );
        }),
      };
    case "SORT":
      return {
        ...state,
        displayData: [...state.displayData].sort(function (a, b) {
          return compareValue(
            action.order,
            a[action.sortCol],
            b[action.sortCol]
          );
        }),
      };
    default:
      return state;
  }
};

export default usersReducer;
