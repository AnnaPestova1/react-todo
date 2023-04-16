import React from "react";
import TodoListItem from "./TodoListItem";

/*component that renders all todo items*/
function TodoList({ todoList, onRemoveTodo }) {
  return (
    <>
      <ul>
        {todoList.map(function (todo) {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onRemoveTodo={onRemoveTodo}
            ></TodoListItem>
          );
        })}
      </ul>
    </>
  );
}
export default TodoList;
