import React from "react";
//list of added todos

// updated props to use destructuring
function TodoListItem({ todo }) {
  return (
    <div>
      <li>{todo.title}</li>
    </div>
  );
}

export default TodoListItem;
