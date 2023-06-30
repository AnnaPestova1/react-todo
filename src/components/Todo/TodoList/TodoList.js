import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";

function TodoList({ todoList, onEditTodo, onRemoveTodo }) {
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
  onEditTodo: PropTypes.func,
  onRemoveTodo: PropTypes.func,
};
export default TodoList;
