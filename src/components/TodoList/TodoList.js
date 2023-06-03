import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";
import PropTypes from "prop-types";

/*component that renders all todo items*/
function TodoList({
  todoList,
  onSortByTitle,
  onSortByTitleDes,
  onSortByDate,
  onSortByDateDes,
  onRemoveTodo,
}) {
  return (
    <>
      <ul className={style.TodoListUl}>
        <span>
          <button type="button" value="titleAsc" onClick={onSortByTitle}>
            Sort by title (A-Z)
          </button>
          <button type="button" value="dateAsc" onClick={onSortByDate}>
            Sort by date(asc)
          </button>
        </span>
        <span>
          <button type="button" value="titleDesc" onClick={onSortByTitleDes}>
            Sort by title (Z-A)
          </button>
          <button type="button" value="dateDesc" onClick={onSortByDateDes}>
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
  onSortByTitle: PropTypes.func,
  onSortByTitleDes: PropTypes.func,
  onSortByDate: PropTypes.func,
  onSortByDateDes: PropTypes.func,
  onRemoveTodo: PropTypes.func,
};
export default TodoList;
