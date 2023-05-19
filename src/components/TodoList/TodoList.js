import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";

/*component that renders all todo items*/
function TodoList({ todoList, onRemoveTodo }) {
  return (
    <>
      <ul className={style.TodoListUl}>
        {" "}
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
