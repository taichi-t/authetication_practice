import React, { Component } from "react";
import Task from "../project/Task";
import Grid from "@material-ui/core/Grid";
import { Droppable } from "react-beautiful-dnd";

export default class Column extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <h2>{this.props.column.title}</h2>
        <Droppable
          droppableId={this.props.column.id}
          // type={this.props.column.id === "column-3" ? "done" : "active"}
          isDropDisabled={this.props.isDropDisabled}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              // isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Grid>
    );
  }
}
