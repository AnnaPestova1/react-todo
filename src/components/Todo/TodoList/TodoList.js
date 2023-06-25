import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";

function TodoList({ todoList, onRemoveTodo, onEditTodo }) {
  return (
    <ul className={style.TodoListUl}>
      {todoList.map(function (todo) {
        return (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onEditTodo={onEditTodo}
            onRemoveTodo={onRemoveTodo}
          ></TodoListItem>
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
};
export default TodoList;
