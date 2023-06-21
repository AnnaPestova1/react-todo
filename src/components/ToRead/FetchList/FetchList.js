import React from "react";
import FetchListItem from "../FetchListItem/FetchListItem";
import Pagination from "../Pagination/Pagination";
import style from "./FetchList.module.css";
import PropTypes from "prop-types";

function FetchList({
  books,
  setBooks,
  addToRead,
  fetchBook,
  totalPages,
  setPage,
}) {
  return (
    <>
      <ul>
        {books.map((book) => (
          <FetchListItem
            key={book.id}
            book={book}
            setBooks={setBooks}
            addToRead={addToRead}
          />
        ))}
      </ul>
      <Pagination
        fetchBook={fetchBook}
        totalPages={totalPages}
        setPage={setPage}
      />
    </>
  );
}
FetchList.propTypes = {
  books: PropTypes.array,
  setBooks: PropTypes.func,
  addToRead: PropTypes.func,
};

export default FetchList;
