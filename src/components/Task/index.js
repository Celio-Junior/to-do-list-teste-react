import React from "react";
import PropTypes from "prop-types";
import { FaEdit, FaWindowClose } from "react-icons/fa";

import "./Task.css";

export default function Task({ handleEdit, handleDelete, task }) {
  return (
    <ul className="task">
      {task.map((tarefa, index) => (
        <li key={tarefa}>
          <span>{tarefa}</span>
          <span>
            <FaEdit className="edit" onClick={(e) => handleEdit(e, index)} />
            <FaWindowClose className="delete" onClick={(e) => handleDelete(e, index)} />
          </span>
        </li>
      ))}
    </ul>
  );
}

Task.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  task: PropTypes.array.isRequired
};
