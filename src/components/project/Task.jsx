import React, { Component } from "react";
import { deleteProject } from "../../store/actions/projectActions";
import { connect } from "react-redux";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import "./task.scss";
import { Draggable } from "react-beautiful-dnd";

class Task extends Component {
  handleRemove = e => {
    e.preventDefault();
    this.props.deleteProject(this.props);
  };
  render() {
    const { task } = this.props;

    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            className="project_summary_css"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            // isDragging={snapshot.isDragging}
          >
            <div className="project_summary">
              <div className="summary_header">
                <h1 className="summary_title">{task.title}</h1>

                <DeleteIcon
                  onClick={this.handleRemove}
                  className="detele_icon"
                />
              </div>

              <div className="content">
                <p>{task.content}</p>
              </div>

              <p className="author">
                Posted by {task.authorFirstName} {task.authorLastName}
              </p>
              <p className="post_time">
                {moment(task.createdAt.toDate().toString()).calendar()}
              </p>
            </div>
          </div>
        )}
      </Draggable>
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
    deleteProject: task => dispatch(deleteProject(task))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
