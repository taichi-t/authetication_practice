import React, { Component } from "react";
import { deleteProject } from "../../store/actions/projectActions";
import { connect } from "react-redux";
import moment from "moment";

class ProjectSummary extends Component {
  handleRemove = e => {
    e.preventDefault();
    this.props.deleteProject(this.props.project.id);
  };
  render() {
    const { project } = this.props;

    return (
      <div className="card z-depth-0 project-summary">
        <div className="card-content grey-text text-darken-3">
          <i className="material-icons right" onClick={this.handleRemove}>
            clear
          </i>
          <span className="card-title">{project.title}</span>
          <p>
            Posted by the {project.authorFirstName} {project.authorLastName}
          </p>
          <p className="grey-text">
            {moment(project.createdAt.toDate().toString()).calendar()}
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    projects: state.firestore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: id => dispatch(deleteProject(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSummary);
