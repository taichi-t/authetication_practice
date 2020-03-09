import React, { Component } from "react";
// import Notifications from "./Notifications";
// import ProjectList from "../project/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { UpdateIndex } from "../../store/actions/projectActions";
import { UpdateColumn } from "../../store/actions/projectActions";
import Grid from "@material-ui/core/Grid";
import "./dashboard.scss";
import Navbar from "../layout/Navbar";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CreateProject from "../project/CreateProject";
import Column from "../project/Column";
import { DragDropContext } from "react-beautiful-dnd";

class Dashboard extends Component {
  handleChangeIndex = newState => {
    this.props.UpdateIndex(newState);
  };

  handleChangeColumn = (newState, newFinish, draggableId) => {
    this.props.UpdateColumn(newState, newFinish, draggableId);
  };

  onDragStart = start => {
    const columnOrderes = this.props.columnOrder[0]["columnOrder"].map(
      item => item
    );

    const homeIndex = columnOrderes.indexOf(start.source.droppableId);

    this.setState({
      homeIndex
    });
  };
  onDragEnd = result => {
    // document.body.style.color = "inherit";
    // document.body.style.color = "inherit";

    const newColumns = {};
    if (this.props.columns) {
      for (let i = 0, l = this.props.columns.length; i < l; i += 1) {
        const data = this.props.columns[i];
        newColumns[data.id] = data;
      }
    }

    this.setState({
      homeIndex: null
    });

    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = newColumns[source.droppableId];
    const finish = newColumns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);

      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.handleChangeIndex(newState);
      return;
    }

    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds);

    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);

    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    this.handleChangeColumn(newState, newFinish, draggableId);
  };
  render() {
    console.log(this.props);
    const { projects, auth, notifications, columns, columnOrder } = this.props;
    const newColumnOrder = columnOrder && columnOrder[0].columnOrder;

    //Those columns converted to array
    const newColumns = {};
    if (columns) {
      for (let i = 0, l = columns.length; i < l; i += 1) {
        const data = columns[i];
        newColumns[data.id] = data;
      }
    }

    //Those projects converted to object array
    const newProjects = {};
    if (projects) {
      for (let i = 0, l = projects.length; i < l; i += 1) {
        const data = projects[i];
        newProjects[data.id] = data;
      }
    }

    if (!auth.uid) return <Redirect to="signin" />;
    return (
      <div className="dashboard_css">
        <div className="create_container">
          <CreateProject />
        </div>
        <div className="dashboard_mask">
          <Navbar notifications={notifications} />
          <div className="dashboard">
            <Grid container spacing={3}>
              <DragDropContext
                onDragEnd={this.onDragEnd}
                onDragStart={this.onDragStart}
              >
                {newProjects &&
                  newColumns &&
                  newColumnOrder &&
                  newColumnOrder.map((columnId, index) => {
                    const column = newColumns[columnId];

                    const tasks =
                      column.taskIds &&
                      column.taskIds.map(taskId => {
                        if (taskId) {
                          return newProjects[taskId];
                        } else {
                          return newProjects;
                        }
                      });

                    return (
                      <Grid item xs={4} key={index}>
                        <div className="planedTakes_container">
                          <Column
                            key={column.id}
                            column={column}
                            tasks={tasks}
                            index={index}
                          />
                        </div>
                      </Grid>
                    );
                  })}
              </DragDropContext>

              <div className="new_task_link">
                <Fab
                  aria-label="add"
                  size="large"
                  color="primary"
                  onClick={() => {
                    const target = document.querySelector(".create_container");
                    const bgc = document.querySelector(".dashboard_mask");

                    if (
                      target.classList.contains("create_container_isActive")
                    ) {
                      target.classList.remove("create_container_isActive");
                      bgc.classList.remove("dashboard_mask_isActive");
                    } else {
                      target.classList.add("create_container_isActive");
                      bgc.classList.add("dashboard_mask_isActive");
                    }
                  }}
                >
                  <AddIcon fontSize="large" />
                </Fab>
                {/* </NavLink> */}
              </div>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    columns: state.firestore.ordered.columns,
    columnOrder: state.firestore.ordered.columnOrderes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    UpdateIndex: newState => dispatch(UpdateIndex(newState)),
    UpdateColumn: (newState, newFinish, draggableId) =>
      dispatch(UpdateColumn(newState, newFinish, draggableId))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "projects", orderBy: ["createdAt", "desc"] },
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] },
    { collection: "columns" },
    { collection: "columnOrderes" }
  ])
)(Dashboard);
