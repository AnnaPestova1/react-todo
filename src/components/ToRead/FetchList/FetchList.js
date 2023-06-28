import React from "react";
import PropTypes from "prop-types";
import FetchListItem from "../FetchListItem/FetchListItem";
import Pagination from "../Pagination/Pagination";
import style from "./FetchList.module.css";

//Google search book results layout
function FetchList({ books, setBooks, addToRead, totalPages, setPage }) {
  return (
    <div>
      <ul className={style.FetchBookList}>
        {books.map((book) => (
          <FetchListItem
            key={book.id}
            book={book}
            setBooks={setBooks}
            addToRead={addToRead}
          />
        ))}
      </ul>
      <Pagination totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
FetchList.propTypes = {
  books: PropTypes.array,
  setBooks: PropTypes.func,
  addToRead: PropTypes.func,
  totalPages: PropTypes.number,
  setPage: PropTypes.func,
};

export default FetchList;
