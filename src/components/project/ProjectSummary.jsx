// import React, { Component } from "react";
// import { deleteProject } from "../../store/actions/projectActions";
// import { connect } from "react-redux";
// import moment from "moment";
// import DeleteIcon from "@material-ui/icons/Delete";
// import "./projectSummary.scss";

// class ProjectSummary extends Component {
//   handleRemove = e => {
//     e.preventDefault();
//     this.props.deleteProject(this.props.project.id);
//   };
//   render() {
//     const { project } = this.props;

//     return (
//       <div className="project_summary_css">
//         <div className="project_summary">
//           <div className="summary_header">
//             <h3 className="summary_title">{project.title}</h3>

//             <DeleteIcon onClick={this.handleRemove} className="detele_icon" />
//           </div>

//           <div className="content">
//             <p>{project.content}</p>
//           </div>

//           <p className="author">
//             Posted by {project.authorFirstName} {project.authorLastName}
//           </p>
//           <p className="post_time">
//             {moment(project.createdAt.toDate().toString()).calendar()}
//           </p>
//         </div>
//       </div>
//     );
//   }
// }
// const mapStateToProps = state => {
//   return {
//     projects: state.firestore
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     deleteProject: id => dispatch(deleteProject(id))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProjectSummary);
