const initState = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: []
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};

const columnReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default columnReducer;
