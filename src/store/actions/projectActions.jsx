export const createProject = project => {
  return dispatch => {
    dispatch({ type: "CREATE_PROJECT", project });
  };
};
