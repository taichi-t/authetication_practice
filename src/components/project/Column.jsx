import React, { Component } from "react";
import Task from "../project/Task";

import { Droppable } from "react-beautiful-dnd";
import "./column.scss";

export default class Column extends Component {
  render() {
    return (
      <>
        <h2>{this.props.column.title}</h2>
        <Droppable
          droppableId={this.props.column.id}
          // type={this.props.column.id === "column-3" ? "done" : "active"}
          isDropDisabled={this.props.isDropDisabled}
        >
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.tasks &&
                this.props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </>
    );
  }
}
