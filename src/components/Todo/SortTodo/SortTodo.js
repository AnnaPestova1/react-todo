import React from "react";
import style from "./SortTodo.module.css";
import Button from "../../Button";

function SortTodo({ sortList }) {
  return (
    <div className={style.SortTodo}>
      <span>
        <Button
          type="button"
          onClick={() => {
            sortList("titleAsc");
          }}
        >
          Sort by title (A-Z)
        </Button>
        <Button
          type="button"
          onClick={() => {
            sortList("dateAsc");
          }}
        >
          Sort by date(asc)
        </Button>
      </span>
      <span>
        <Button
          type="button"
          onClick={() => {
            sortList("titleDesc");
          }}
        >
          Sort by title (Z-A)
        </Button>
        <Button
          type="button"
          onClick={() => {
            sortList("dateDesc");
          }}
        >
          Sort by date(desc)
        </Button>
      </span>
    </div>
  );
}

export default SortTodo;
