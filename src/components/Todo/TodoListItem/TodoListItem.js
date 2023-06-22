import React from "react";
import { ReactComponent as Remove } from "../../../img/delete_black_24dp-2.svg";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import Button from "../../Button";

/*component that add the title from submitted todo value in the list and remove item button*/
function TodoListItem({ todo, onRemoveTodo, onEditTodo }) {
  return (
    <li className={style.ListItem}>
      <span className={style.todoTitle}>{todo.title}</span>
      <span className={style.todoDate}>{todo.createdDate}</span>
      <span>
        <Button
          type="button"
          title="edit item"
          onClick={() => onEditTodo(todo.id)}
        >
          Edit
        </Button>
        <Button
          type="button"
          title="remove item"
          onClick={function () {
            return onRemoveTodo(todo.id);
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
  onRemoveTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
};

export default TodoListItem;
