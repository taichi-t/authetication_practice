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
        createdAt: new Date(),
        currentColumn: "column-1"
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
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const columnId = task.task.currentColumn;
    const taskId = task.task.id;

    firestore
      .collection("columns")
      .doc(columnId)
      .update({
        taskIds: firebase.firestore.FieldValue.arrayRemove(taskId)
      })
      .then(() => {
        firestore
          .collection("projects")
          .doc(taskId)
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
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const UpdateIndex = homeindex => {
      firestore
        .collection("columns")
        .doc(homeindex)
        .update({
          taskIds: newState.columns[homeindex].taskIds
        })
        .then(() => {
          dispatch({ type: "UPDATE_INDEX_SUCCESS" });
        })
        .catch(err => {
          dispatch({ type: "UPDATE_INDEX_ERROR", err });
        });
    };

    if (newState.homeIndex === 0) {
      const homeIndex = "column-1";
      UpdateIndex(homeIndex);
    } else if (newState.homeIndex === 1) {
      const homeIndex = "column-2";
      UpdateIndex(homeIndex);
    } else if (newState.homeIndex === 2) {
      const homeIndex = "column-3";
      UpdateIndex(homeIndex);
    }
  };
};

export const UpdateColumn = (newState, drraggableId) => {
  console.log(newState, drraggableId);
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const taskId = drraggableId;
    const startColumnName = Object.keys(newState.newStart);
    const finishColumnName = Object.keys(newState.newFinish);
    console.log(startColumnName[0]);

    firestore
      .collection("columns")
      .doc(startColumnName[0].toString())
      .update({
        taskIds: newState.newStart[startColumnName].taskIds
      });

    firestore
      .collection("columns")
      .doc(finishColumnName[0].toString())
      .update({
        taskIds: newState.newFinish[finishColumnName].taskIds
      });

    firestore
      .collection("projects")
      .doc(taskId)
      .update({
        currentColumn: finishColumnName[0]
      })
      .then(() => {
        dispatch({ type: "UPDATE_COLUMN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_COLUMN_ERROR", err });
      });
  };
};
