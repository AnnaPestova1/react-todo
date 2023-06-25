import React from "react";
import PropTypes from "prop-types";
import style from "./Pagination.module.css";

const Pagination = ({ totalPages, setPage }) => {
  let pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }
  const changePage = (currentPage) => {
    setPage(currentPage);
  };
  return (
    <div className={style.PaginationLink}>
      {pages.map((p) => (
        <span key={p} onClick={() => changePage(p)}>
          {p}
        </span>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number,
  setPage: PropTypes.func,
};
export default Pagination;
