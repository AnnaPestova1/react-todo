import React from "react";

const Pagination = ({ totalPages, setPage }) => {
  let pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }
  const changePage = (currentPage) => {
    setPage(currentPage);
  };
  console.log(setPage);
  return (
    <>
      {pages.map((p) => (
        <span key={p} onClick={() => changePage(p)}>
          {p}
        </span>
      ))}
    </>
  );
};

export default Pagination;
