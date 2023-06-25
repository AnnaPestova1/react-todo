import React from "react";
import PropTypes from "prop-types";
import InputWithLabel from "../../InputWithLabel";
import Button from "../../Button/Button";
import { ReactComponent as Search } from "../../../img/search_black_24dp.svg";
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
  setTotalPages,
}) {
  function handleBookSearch(event) {
    event.preventDefault();
    if (search === "") {
      return;
    }
    fetchBook(search, page, limit);
  }

  return (
    <div className={style.SearchBookForm}>
      <form onSubmit={handleBookSearch}>
        <InputWithLabel
          id="search"
          placeholder="Search Books..."
          value={search}
          onInputChange={(event) => setSearch(event.target.value)}
        >
          <strong>Add book</strong>
        </InputWithLabel>
        <Button type="submit" title="add new book">
          <Search />
        </Button>
        <Button
          type="button"
          title="close search form"
          onClick={() => {
            setIsAddingBook(false);
            setSearch("");
            setBooks([]);
            setTotalPages(0);
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
  setTotalPages: PropTypes.func,
};
export default SearchBookForm;
