import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
  {
    id: 1,
    title: "Plan learning schedule",
  },
  {
    id: 2,
    title: "Read 'The road of React'",
  },
  {
    id: 3,
    title: "Complete assignments",
  },
];

function TodoList() {
  return (
    <ul>
      {todoList.map(function (item) {
        return <TodoListItem key={item.id} item={item}></TodoListItem>;
      })}
    </ul>
  );
}
export default TodoList;
