import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import Avatar from "@material-ui/core/Avatar";
import "./signedInLinks.scss";
import NotificationsIcon from "@material-ui/icons/Notifications";
import moment from "moment";

const SignedInLinks = props => {
  console.log(props);
  const { notifications } = props;

  return (
    <div className="signedInLinks_css">
      <ul className="signedInLinks">
        <Link to="/" onClick={props.signOut}>
          <li className="logout_link">Log Out</li>
        </Link>
        <li className="signedInLinks_items">
          <ul className="notification_container">
            <li>
              <NotificationsIcon
                fontSize="large"
                onClick={() => {
                  const target = document.querySelector(".notification_list");

                  if (
                    target.classList.contains("notification_list_is_active") ===
                    true
                  ) {
                    target.classList.remove("notification_list_is_active");
                  } else if (
                    target.classList.contains("notification_list_is_active") ===
                    false
                  ) {
                    target.classList.add("notification_list_is_active");
                  }
                }}
              />
            </li>
            <ul className="notification_list">
              <li>
                <h3>Notifications</h3>
              </li>
              <ul>
                {notifications &&
                  notifications.map(item => {
                    return (
                      <li key={item.id} className="notifications">
                        <span className="notifications_content">
                          {item.content}
                        </span>
                        <br />
                        <span className="notifications_name">{item.user}</span>
                        <br />

                        <div className="notifications_time">
                          {moment(item.time.toDate()).fromNow()}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </ul>
          </ul>
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
