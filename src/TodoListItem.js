import React from "react";

function TodoListItem(props) {
  return (
    <li>
      <span>{props.item.title}</span>
    </li>
  );
}

export default TodoListItem;
