import React, { useState } from "react";
import InputWithLabel from "../../InputWithLabel";
import Button from "../../Button";
import PropTypes from "prop-types";
import { ReactComponent as Add } from "../../../img/add_black_24dp.svg";

function SearchBookForm({ fetchBook, page, limit, search, setSearch }) {
  // const [search, setSearch] = useState("");

  function handleBookSearch(event) {
    console.log(event);
    event.preventDefault();
    if (search === "") {
      return;
    }
    console.log(page);
    console.log(limit);
    console.log(search);

    fetchBook(search, page, limit);
  }

  return (
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
        <Add />
      </Button>
    </form>
  );
}
SearchBookForm.propTypes = {
  fetchBook: PropTypes.func,
};
export default SearchBookForm;
