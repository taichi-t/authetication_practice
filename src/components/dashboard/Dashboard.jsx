import React, { Component } from "react";
// import Notifications from "./Notifications";
import ProjectList from "../project/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import "./dashboard.scss";
import Navbar from "../layout/Navbar";
// import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CreateProject from "../project/CreateProject";
import Column from "../project/Column";

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props;
    const projectIds = projects && projects.map((project, index) => project.id);

    const newProjects = {};
    if (projects) {
      for (let i = 0, l = projects.length; i < l; i += 1) {
        const data = projects[i];
        newProjects[data.id] = data;
      }
    }
    console.log(projectIds);
    console.log(newProjects);

    const initialData = {
      columns: {
        "column-1": {
          id: "column-1",
          title: "To do",
          taskIds: projectIds
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

    if (!auth.uid) return <Redirect to="signin" />;
    return (
      <div className="dashboard_css">
        <div className="create_container">
          <CreateProject />
        </div>
        <div className="dashboard_mask">
          <Navbar notifications={notifications} />
          <Grid container spacing={3} className="dashboard">
            {newProjects &&
              projectIds &&
              initialData.columnOrder.map((columnId, index) => {
                const column = initialData.columns[columnId];

                const tasks = column.taskIds.map(
                  taskId => newProjects[taskId.toString()]
                );

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

            <div className="new_task_link">
              {/* <NavLink to="/create"> */}
              <Fab
                aria-label="add"
                size="large"
                color="primary"
                onClick={() => {
                  const target = document.querySelector(".create_container");
                  const bgc = document.querySelector(".dashboard_mask");

                  if (target.classList.contains("create_container_isActive")) {
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
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "projects", orderBy: ["createdAt", "desc"] },
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(Dashboard);
