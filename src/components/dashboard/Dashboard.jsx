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

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props;

    if (!auth.uid) return <Redirect to="signin" />;
    return (
      <div className="dashboard_css">
        <div className="create_container">
          <CreateProject />
        </div>
        <div className="dashboard_mask">
          <Navbar notifications={notifications} />
          <Grid container spacing={3} className="dashboard">
            <Grid item xs={4}>
              <div className="planedTakes_container">
                <h2>Planed Taskes</h2>
                <ProjectList projects={projects} />
              </div>
            </Grid>
            <Grid item xs={4}>
              {/* <ProjectInProgress /> */}
            </Grid>
            <Grid item xs={4}>
              {/* <ProjectInCompleted /> */}
            </Grid>

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
  console.log(state);
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
