import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import "./nav.scss";

const Navbar = props => {
  const { auth, profile, listeners, notifications } = props;

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
    <nav className="nav">
      <div className="nav_mask">
        <Grid item xs={12}>
          <h1 className="logo">
            <Link to="/">Family Board</Link>
          </h1>
        </Grid>
        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    listeners: state.firestore.listeners,
    notifications: state.firestore.ordered.notifications
  };
};

export default connect(mapStateToProps)(Navbar);
