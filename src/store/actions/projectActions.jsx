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
    console.log(taskId);

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
    console.log(newState);
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

export const UpdateColumn = (newState, newFinish, drraggableId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const columns = newState.columns;

    console.log(columns);

    const UpdateColumn = (columnName, columnData) => {
      firestore
        .collection("columns")
        .doc(columnName)
        .update({
          taskIds: columnData.taskIds
        });

      firestore
        .collection("projects")
        .doc(drraggableId)
        .update({
          currentColumn: newFinish.id
        })
        .then(() => {
          dispatch({
            type: "UPDATE_COLUMN_SUCCESS",
            newState,
            columnName,
            columnData
          });
        })
        .catch(err => {
          dispatch({ type: "UPDATE_COLUMN_ERROR", err });
        });
    };

    for (let key in columns) {
      if (key === "column-1") {
        const columnOne = columns[key];
        UpdateColumn("column-1", columnOne);
      } else if (key === "column-2") {
        const columnSecond = columns[key];
        UpdateColumn("column-2", columnSecond);
      } else if (key === "column-3") {
        const columnThird = columns[key];
        UpdateColumn("column-3", columnThird);
      }
    }
  };
};
