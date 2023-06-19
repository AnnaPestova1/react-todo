import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";
import PropTypes from "prop-types";

/*component that renders all todo items*/
function TodoList({ todoList, onRemoveTodo, onEditTodo }) {
  return (
    <>
      <ul className={style.TodoListUl}>
        {todoList.map(function (todo) {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onRemoveTodo={onRemoveTodo}
              onEditTodo={onEditTodo}
            ></TodoListItem>
          );
        })}
      </ul>
    </>
  );
}
TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
};
export default TodoList;
