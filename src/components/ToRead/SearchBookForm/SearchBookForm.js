import React from "react";
import PropTypes from "prop-types";
import InputWithLabel from "../../InputWithLabel";
import Button from "../../Button/Button.tsx";
import { ReactComponent as Search } from "../../../img/search_black_24dp.svg";
import { ReactComponent as EnterNewBook } from "../../../img/library_add_black_24dp.svg";
import { ReactComponent as Close } from "../../../img/close_black_24dp.svg";
import style from "./SearchBookForm.module.css";

function SearchBookForm({
  fetchBook,
  page,
  limit,
  search,
  setSearch,
  setIsAddingBook,
  setBooks,
  setIsManuallyAddingBook,
}) {
  function handleBookSearch(event) {
    event.preventDefault();
    if (search === "") {
      return;
    }
    fetchBook(search, page, limit);
  }
  function handleAddNewBook() {
    setIsManuallyAddingBook(true);
  }
  return (
    <div className={style.SearchBookForm}>
      <form onSubmit={handleBookSearch}>
        <InputWithLabel
          id="search"
          placeholder="Search Books..."
          name="searchBook"
          value={search}
          onInputChange={(event) => setSearch(event.target.value)}
        >
          <strong>Add book</strong>
        </InputWithLabel>
        <Button type="submit" title="search books">
          <Search />
        </Button>
        <Button type="button" title="enter new book" onClick={handleAddNewBook}>
          <EnterNewBook />
        </Button>
        <Button
          type="button"
          title="close search form"
          onClick={() => {
            setIsAddingBook(false);
            setSearch("");
            setBooks([]);
          }}
        >
          <Close />
        </Button>
      </form>
    </div>
  );
}

SearchBookForm.propTypes = {
  fetchBook: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  search: PropTypes.string,
  setSearch: PropTypes.func,
  setIsAddingBook: PropTypes.func,
  setBooks: PropTypes.func,
  setIsManuallyAddingBook: PropTypes.func,
};
export default SearchBookForm;
