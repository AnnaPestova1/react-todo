import React from "react";
import Button from "../../Button/Button.tsx";
import style from "./SortTodo.module.css";

interface SortTodoProps {
    sortList: (value: string) => void;
    sortDirection: string;
}

function SortTodo({ sortList, sortDirection }: SortTodoProps) {
  return (
    <div className={style.SortTodo}>
      <span className={style.SortButton}>
        <Button
          active={sortDirection === "titleAsc"}
          type="button"
          title="sort by title ascending order"
          onClick={() => {
            sortList("titleAsc");
          }}
        >
          Sort by title (A-Z)
        </Button>
        <Button
          active={sortDirection === "dateAsc"}
          type="button"
          title="sort by date ascending order"
          onClick={() => {
            sortList("dateAsc");
          }}
        >
          Sort by date(asc)
        </Button>
      </span>
      <span className={style.SortButton}>
        <Button
          active={sortDirection === "titleDesc"}
          type="button"
          title="sort by title descending order"
          onClick={() => {
            sortList("titleDesc");
          }}
        >
          Sort by title (Z-A)
        </Button>
        <Button
          active={sortDirection === "dateDesc"}
          type="button"
          title="sort by date descending order"
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
