import React from "react";
import style from "./SortTodo.module.css";

function SortTodo({ sortList }) {
  return (
    <div className={style.SortTodo}>
      <span>
        <button
          type="button"
          onClick={() => {
            sortList("titleAsc");
          }}
        >
          Sort by title (A-Z)
        </button>
        <button
          type="button"
          onClick={() => {
            sortList("dateAsc");
          }}
        >
          Sort by date(asc)
        </button>
      </span>
      <span>
        <button
          type="button"
          onClick={() => {
            sortList("titleDesc");
          }}
        >
          Sort by title (Z-A)
        </button>
        <button
          type="button"
          onClick={() => {
            sortList("dateDesc");
          }}
        >
          Sort by date(desc)
        </button>
      </span>
    </div>
  );
}

export default SortTodo;
