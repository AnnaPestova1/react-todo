import React from "react";

/*component that add the title from submitted tdo value in the list*/
function TodoListItem({ todo }) {
  return (
    <div>
      <li>{todo.title}</li>
    </div>
  );
}

export default TodoListItem;
