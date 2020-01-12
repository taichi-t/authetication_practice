import React from "react";
import { NavLink } from "react-router-dom";
import "./signedOutLinks.scss";

const SignedOutLinks = () => {
  return (
    <div className="signedOutLinks_css">
      <ul className="signOutLinks">
        <NavLink to="/signup">
          <li className="signOutLinks_item">signup</li>
        </NavLink>
        <NavLink to="/signin">
          <li className="signOutLinks_item">Login</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default SignedOutLinks;
