import React, { Component } from "react";

import Form from "./Form";
import Task from "./Task";
import "./Main.css";


export default class Main extends Component {
  state = {
    taskNew: "",
    task: [],
    edit: -1
  };

  componentDidMount() {
    const task = JSON.parse(localStorage.getItem("task"));

    if (!task) return;

    this.setState({
      task
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { task } = this.state;

    if (task === prevState.task) return;
    localStorage.setItem("task", JSON.stringify(task));
  }

  handleEdit = (e, index) => {
    const { task } = this.state;

    this.setState({
      taskNew: task[index],
      edit: index
    });
  };

  handleDelete = (e, index) => {
    const { task } = this.state;

    const tasknovo = [...task];
    tasknovo.splice(index, 1);

    this.setState({
      task: [...tasknovo]
    });
  };

  handleChange = (e) => {
    const input = e.target.value;
    if (input.length > 25) return;
    this.setState({
      taskNew: input
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { task, edit } = this.state;
    let { taskNew } = this.state;
    taskNew = taskNew.trim();

    if (!taskNew) return;
    if (task.indexOf(taskNew) !== -1) return;

    const tasknova = [...task];

    if (edit === -1) {
      this.setState({
        task: [...tasknova, taskNew],
        taskNew: "",
      });
    } else {
      tasknova[edit] = taskNew;
      this.setState({
        task: [...tasknova],
        taskNew: "",
        edit: -1
      });
    }
  };

  render() {
    const { taskNew, task } = this.state;

    return (
      <div className="main">
        <h1>Task of List</h1>

        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          taskNew={taskNew}
        />

        <Task
          task={task}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
        />

      </div>
    );
  }
}
