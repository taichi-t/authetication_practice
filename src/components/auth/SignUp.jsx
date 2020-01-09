import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Grid from "@material-ui/core/Grid";
import "./signUp.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const classes = useStyles;
    const { authError, auth } = this.props;

    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="sighUp_container">
        <div className="navbar">
          <Navbar className="nav_bar" />
        </div>

        <Grid container>
          <Grid item xs={4}></Grid>

          <Grid item xs={4}>
            <div className="signUpLink_css">
              <div className="signUp_css">
                <h5>Sign Up</h5>

                <form
                  className={classes.root}
                  noValidate
                  autoComplete="on"
                  onSubmit={this.handleSubmit}
                >
                  <TextField
                    fullWidth={true}
                    id="email"
                    type="email"
                    label="email"
                    onChange={this.handleChange}
                  />
                  <TextField
                    fullWidth={true}
                    id="firstName"
                    label="firstName"
                    type="text"
                    onChange={this.handleChange}
                  />
                  <TextField
                    fullWidth={true}
                    id="lastName"
                    label="lastName"
                    type="text"
                    onChange={this.handleChange}
                  />
                  <TextField
                    fullWidth={true}
                    id="password"
                    label="password"
                    type="text"
                    onChange={this.handleChange}
                  />

                  <div className="button_container">
                    <button>Sign Up</button>
                    <div className="error_message">
                      {authError ? <p>{authError}</p> : null}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Grid>

          <Grid item xs={4}></Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
