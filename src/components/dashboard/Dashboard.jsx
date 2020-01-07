import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../project/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import "./dashboard.scss";
import Navbar from "../layout/Navbar";
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props;

    if (!auth.uid) return <Redirect to="signin" />;
    return (
      <div className="dashboard_css">
        <Navbar />
        <Grid container spacing={3} className="dashboard">
          <Grid item xs={4}>
            <div className="planedTakes_container">
              <ProjectList projects={projects} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <ProjectList projects={projects} />
          </Grid>
          <Grid item xs={4}>
            <ProjectList projects={projects} />
          </Grid>
          {/* <Grid item xs={12}>
          <Notifications notifications={notifications} />
        </Grid> */}

          <div className="new_task_link">
            <NavLink to="/create">
              <Fab aria-label="add" size="large" color="primary">
                <AddIcon fontSize="large" />
              </Fab>
            </NavLink>
          </div>
        </Grid>
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
