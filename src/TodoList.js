import React from "react";
import TodoListItem from "./TodoListItem";

/*component that destructuring new tidi item that comes from input*/
function TodoList({ todoList }) {
  return (
    <>
      <ul>
        {todoList.map(function (todo) {
          return <TodoListItem key={todo.id} todo={todo}></TodoListItem>;
        })}
      </ul>
    </>
  );
}
export default TodoList;
