import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";
import PropTypes from "prop-types";

/*component that renders all todo items*/
function TodoList({ todoList, onSort, onRemoveTodo }) {
  return (
    <>
      <ul className={style.TodoListUl}>
        <span>
          <button
            type="button"
            onClick={() => {
              onSort("titleAsc");
            }}
          >
            Sort by title (A-Z)
          </button>
          <button
            type="button"
            onClick={() => {
              onSort("dateAsc");
            }}
          >
            Sort by date(asc)
          </button>
        </span>
        <span>
          <button
            type="button"
            onClick={() => {
              onSort("titleDesc");
            }}
          >
            Sort by title (Z-A)
          </button>
          <button
            type="button"
            onClick={() => {
              onSort("dateDesc");
            }}
          >
            Sort by date(desc)
          </button>
        </span>
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
TodoList.propTypes = {
  todoList: PropTypes.array,
  onSort: PropTypes.func,
  onRemoveTodo: PropTypes.func,
};
export default TodoList;
