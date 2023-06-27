import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import style from "./SortToRead.module.css";

function SortTodo({ sortList, sortDirection }) {
  return (
    <div className={style.SortToRead}>
      <span className={style.SortButton}>
        <Button
          active={sortDirection === "NameAsc"}
          type="button"
          onClick={() => {
            sortList("NameAsc");
          }}
        >
          Sort by name (A-Z)
        </Button>
        <Button
          active={sortDirection === "AuthorAsc"}
          type="button"
          onClick={() => {
            sortList("AuthorAsc");
          }}
        >
          Sort by author (A-Z)
        </Button>
      </span>
      <span className={style.SortButton}>
        <Button
          active={sortDirection === "NameDesc"}
          type="button"
          onClick={() => {
            sortList("NameDesc");
          }}
        >
          Sort by name (Z-A)
        </Button>
        <Button
          active={sortDirection === "AuthorDesc"}
          type="button"
          onClick={() => {
            sortList("AuthorDesc");
          }}
        >
          Sort by author (Z-A)
        </Button>
      </span>
    </div>
  );
}

SortTodo.propTypes = {
  sortList: PropTypes.func,
  sortDirection: PropTypes.string,
};
export default SortTodo;
