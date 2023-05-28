import React from "react";
import { ReactComponent as Remove } from "../../img/delete_outline_black_24dp.svg";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

/*component that add the title from submitted todo value in the list and remove item button*/
function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <div>
      <li className={style.ListItem}>
        <span>{todo.title}</span>
        <span>
          <button
            type="button"
            title="remove item"
            onClick={function () {
              return onRemoveTodo(todo.id);
            }}
            className={style.RemoveButton}
          >
            <Remove />
          </button>
        </span>
      </li>
    </div>
  );
}
TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
};

export default TodoListItem;
