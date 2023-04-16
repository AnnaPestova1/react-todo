import React from "react";

/*component that add the title from submitted todo value in the list and remove item button*/
function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <div>
      <li>
        <span>{todo.title}</span>
        <span>
          <button
            type="button"
            onClick={function () {
              return onRemoveTodo(todo.id);
            }}
          >
            Remove
          </button>
        </span>
      </li>
    </div>
  );
}

export default TodoListItem;
