import React, { Component } from "react";
import Task from "../project/Task";
import Grid from "@material-ui/core/Grid";

export default class Column extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <h2>{this.props.column.title}</h2>
        {this.props.tasks.map((task, index) => (
          <Task key={task.id} task={task} index={index} />
        ))}
      </Grid>
    );
  }
}
