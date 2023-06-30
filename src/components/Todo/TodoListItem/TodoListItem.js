import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button.tsx";
import { ReactComponent as Edit } from "../../../img/edit_black_24dp.svg";
import { ReactComponent as Remove } from "../../../img/delete_black_24dp-2.svg";
import style from "./TodoListItem.module.css";

function TodoListItem({ todo, onEditTodo, onRemoveTodo }) {
  return (
    <li className={style.ListItem}>
      <span className={style.TodoTitle}>{todo.title}</span>
      <span className={style.TodoDate}>{todo.createdDate}</span>
      <span>
        <Button
          type="button"
          title="edit item"
          onClick={() => onEditTodo(todo.id)}
        >
          <Edit />
        </Button>
        <Button
          type="button"
          title="remove item"
          onClick={function () {
            onRemoveTodo(todo.id);
          }}
          className={style.RemoveButton}
        >
          <Remove />
        </Button>
      </span>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onEditTodo: PropTypes.func,
  onRemoveTodo: PropTypes.func,
};
export default TodoListItem;
