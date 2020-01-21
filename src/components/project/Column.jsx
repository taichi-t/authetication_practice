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
          isDropDisabled={this.props.isDropDisabled}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="column_container"
            >
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
