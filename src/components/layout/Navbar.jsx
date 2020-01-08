import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import "./nav.scss";

const Navbar = props => {
  const { auth, profile, listeners, notifications } = props;
  console.log(listeners);

  const links = auth.uid ? (
    <SignedInLinks
      profile={profile}
      listeners={listeners}
      notifications={notifications}
    />
  ) : (
    <SignedOutLinks />
  );
  return (
    <Grid containerd>
      <nav className="nav">
        <Grid item xs={12}>
          <h1 className="logo">
            <Link to="/">Family Board</Link>
          </h1>
        </Grid>
        {links}
      </nav>
    </Grid>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    listeners: state.firestore.listeners,
    notifications: state.firestore.ordered.notifications
  };
};

export default connect(mapStateToProps)(Navbar);
