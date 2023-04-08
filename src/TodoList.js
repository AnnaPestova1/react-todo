import React from "react";
import TodoListItem from "./TodoListItem";

//function that maping over todoList array
//adding props as a parameter to the TodoList functional component
//change todoList to reference props instead of the hard-coded variable

// updated props to use destructuring
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
