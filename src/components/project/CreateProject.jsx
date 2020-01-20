import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";
import "./createProject.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 500
    }
  }
}));

class CreateProject extends Component {
  state = {
    title: "",
    content: ""
  };

  handleChange = e => {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleClose = e => {
    e.preventDefault();
    const target = document.querySelector(".create_container");
    const bgcMask = document.querySelector(".dashboard_mask");

    if (target.classList.contains("create_container_isActive")) {
      target.classList.remove("create_container_isActive");
      bgcMask.classList.remove("dashboard_mask_isActive");
    }
  };

  handleSubmit = e => {
    const target = document.querySelector(".create_container");
    const bgc = document.querySelector(".dashboard_mask");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const errorMessage = document.querySelector(".error_text");
    e.preventDefault();

    if (titleInput.value === "") {
      errorMessage.classList.add("error_text_isActive");
      return;
    } else {
      this.props.createProject(this.state);
      titleInput.value = "";
      contentInput.value = "";
      this.setState({ title: "", content: "" });
    }

    if (errorMessage.classList.contains("error_text_isActive")) {
      errorMessage.classList.remove("error_text_isActive");
    }

    if (target.classList.contains("create_container_isActive")) {
      target.classList.remove("create_container_isActive");
      bgc.classList.remove("dashboard_mask_isActive");
      titleInput.value = "";
      contentInput.value = "";
      this.setState({ title: "", content: "" });
    } else {
      return;
    }
  };
  render() {
    const { auth } = this.props;
    const classes = useStyles;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="createProject_css" id="createProject">
        <div className="close_button_container">
          <HighlightOffIcon fontSize="large" onClick={this.handleClose} />
        </div>

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <TextField
            fullWidth={false}
            id="title"
            type="text"
            label="title"
            required={true}
            onChange={this.handleChange}
          />
          <TextField
            fullWidth={true}
            id="content"
            label="content"
            type="text"
            onChange={this.handleChange}
          />

          <div className="button_container">
            <button>Create</button>
          </div>
          <div className="error_text">
            <p>Please enter the title</p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
