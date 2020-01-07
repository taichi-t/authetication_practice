import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import Avatar from "@material-ui/core/Avatar";
import "./signedInLinks.scss";
import NotificationsIcon from "@material-ui/icons/Notifications";

const SignedInLinks = props => {
  return (
    <div className="signedInLinks_css">
      <ul className="signedInLinks">
        <li className="logout_link">
          <Link to="/" onClick={props.signOut}>
            Log Out
          </Link>
        </li>
        <li className="signedInLinks_items">
          <NotificationsIcon fontSize="large" />
          <Avatar sizes="50">
            <NavLink to="/">{props.profile.initials}</NavLink>
          </Avatar>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: listeners => dispatch(signOut(listeners))
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
