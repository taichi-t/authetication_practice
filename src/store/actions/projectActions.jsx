export const createProject = project => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    const key = firestore.collection("projects").doc().id;

    firestore
      .collection("projects")
      .doc(key)
      .set({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        firestore
          .collection("columns")
          .doc("column-1")
          .update({
            taskIds: firebase.firestore.FieldValue.arrayUnion(key)
          });
      })

      .then(() => {
        dispatch({ type: "CREATE_PROJECT_SUCCESS", project });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PROJECT_ERROR", err });
      });
  };
};

export const deleteProject = task => {
  console.log(task);
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    firestore
      .collection("columns")
      .doc("column-1")
      .update({
        taskIds: firebase.firestore.FieldValue.arrayRemove(task.id)
      })

      .then(() => {
        firestore
          .collection("projects")
          .doc(task.id)
          .delete();
      })
      .then(() => {
        dispatch({ type: "DELETE_PROJECT_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "DELETE_PROJECT_ERROR", err });
      });
  };
};

export const UpdateIndex = newState => {
  console.log(newState);
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("columns")
      .doc("column-1")
      .update({
        taskIds: newState.columns["column-1"].taskIds
      })
      .then(() => {
        dispatch({ type: "UPDATE_INDEX_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_INDEX_ERROR", err });
      });
  };
};
