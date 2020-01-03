export const createProject = project => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .add({
        ...project,
        authorfirstName: "Net",
        authorlastName: "Ninja",
        authorId: 1234,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT_SUCCESS", project });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PROJECT_ERROR", err });
      });
  };
};
